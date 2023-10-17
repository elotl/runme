package client

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"github.com/stateful/runme/internal/document"
	"github.com/stateful/runme/internal/runner"
	"github.com/stateful/runme/pkg/project"
	"io"
	"regexp"
	"sync"
	"time"
)

const stripAnsi = "[\u001B\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))"

var stripAnsiRegexp = regexp.MustCompile(stripAnsi)

type MultiRunner struct {
	Runner Runner

	StdoutPrefix string

	PreRunMsg  func(blocks []project.FileCodeBlock, parallel bool) string
	PostRunMsg func(block *document.CodeBlock, exitCode uint) string

	PreRunOpts []RunnerOption
}

type prefixWriter struct {
	w      io.Writer
	prefix []byte

	hasWritten bool
}

func NewPrefixWriter(w io.Writer, prefix string) io.Writer {
	return &prefixWriter{
		w:          w,
		prefix:     []byte(prefix),
		hasWritten: false,
	}
}

func (w *prefixWriter) Write(p []byte) (int, error) {
	data := make([]byte, 0)
	extraBytes := 0

	isFirst := true

	for _, line := range bytes.SplitAfter(p, []byte{'\n'}) {
		if len(line) == 0 {
			continue
		}

		if len(stripAnsiRegexp.ReplaceAll(line, []byte{})) > 0 && (!isFirst || !w.hasWritten) {
			data = append(data, w.prefix...)
			extraBytes += len(w.prefix)
		}

		isFirst = false

		data = append(data, line...)
	}

	w.hasWritten = true

	n, err := w.w.Write(data)
	return n - extraBytes, err
}

func (m MultiRunner) RunBlocks(ctx context.Context, blocks []project.FileCodeBlock, parallel bool) error {
	if m.PreRunMsg != nil && parallel {
		_, _ = m.Runner.getSettings().stdout.Write([]byte(
			m.PreRunMsg(blocks, parallel),
		))
	}

	errChan := make(chan error, len(blocks))
	var wg sync.WaitGroup

	for _, fileBlock := range blocks {
		block := fileBlock.GetBlock()

		runnerClient := m.Runner.Clone()

		err := ApplyOptions(runnerClient, m.PreRunOpts...)
		if err != nil {
			return err
		}

		if m.PreRunMsg != nil && !parallel {
			_, _ = m.Runner.getSettings().stdout.Write([]byte(
				m.PreRunMsg([]project.FileCodeBlock{block}, parallel),
			))
		}

		if err := ApplyOptions(
			runnerClient,
			WithStdinTransform(func(r io.Reader) (io.Reader, error) {
				if parallel {
					// TODO: support stdin
					return bytes.NewReader(nil), nil
				}

				return r, nil
			}),
			WithStdoutTransform(func(w io.Writer) io.Writer {
				if m.StdoutPrefix == "" {
					return w
				}

				prefix := fmt.Sprintf(
					m.StdoutPrefix,
					block.Name(),
				)

				return NewPrefixWriter(w, prefix)
			}),
		); err != nil {
			return err
		}

		run := func(block project.FileCodeBlock) error {
			err := runnerClient.RunBlock(ctx, block)

			code := uint(0)

			if exitErr := (*runner.ExitError)(nil); errors.As(err, &exitErr) {
				code = exitErr.Code
			}

			if m.PostRunMsg != nil {
				_, _ = m.Runner.getSettings().stdout.Write([]byte(
					m.PostRunMsg(block.GetBlock(), code),
				))
			}

			return err
		}

		if !parallel {
			err := run(fileBlock)
			sleepDuration := fileBlock.GetBlock().Attributes()["waitAfter"]
			if sleepDuration != "" {
				d, _ := time.ParseDuration(sleepDuration)
				_, _ = m.Runner.getSettings().stdout.Write([]byte(fmt.Sprintf("sleeping for %s\n", d.String())))
				time.Sleep(d)
			}
			if err != nil {
				return err
			}
		} else {
			wg.Add(1)
			go func(fileBlock project.FileCodeBlock) {
				defer wg.Done()
				err := run(fileBlock)
				errChan <- err
			}(fileBlock)
		}
	}

	wg.Wait()

	var errors []error

outer:
	for {
		select {
		case err := <-errChan:
			if err != nil {
				errors = append(errors, err)
			}
		default:
			break outer
		}
	}

	if len(errors) > 0 {
		return errors[0]
	}

	return nil
}

func (m MultiRunner) Cleanup(ctx context.Context) error {
	return m.Runner.Cleanup(ctx)
}
