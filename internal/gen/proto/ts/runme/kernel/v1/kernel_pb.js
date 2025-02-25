/* eslint-disable */
// @generated by protobuf-ts 2.8.2 with parameter output_javascript,optimize_code_size,long_type_string,add_pb_suffix,ts_nocheck,eslint_disable
// @generated from protobuf file "runme/kernel/v1/kernel.proto" (package "runme.kernel.v1", syntax proto3)
// tslint:disable
// @ts-nocheck
/* eslint-disable */
// @generated by protobuf-ts 2.8.2 with parameter output_javascript,optimize_code_size,long_type_string,add_pb_suffix,ts_nocheck,eslint_disable
// @generated from protobuf file "runme/kernel/v1/kernel.proto" (package "runme.kernel.v1", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
import { UInt32Value } from "../../../google/protobuf/wrappers_pb";
// @generated message type with reflection information, may provide speed optimized methods
class Session$Type extends MessageType {
    constructor() {
        super("runme.kernel.v1.Session", [
            { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message runme.kernel.v1.Session
 */
export const Session = new Session$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteSessionRequest$Type extends MessageType {
    constructor() {
        super("runme.kernel.v1.DeleteSessionRequest", [
            { no: 1, name: "session_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message runme.kernel.v1.DeleteSessionRequest
 */
export const DeleteSessionRequest = new DeleteSessionRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteSessionResponse$Type extends MessageType {
    constructor() {
        super("runme.kernel.v1.DeleteSessionResponse", []);
    }
}
/**
 * @generated MessageType for protobuf message runme.kernel.v1.DeleteSessionResponse
 */
export const DeleteSessionResponse = new DeleteSessionResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListSessionsRequest$Type extends MessageType {
    constructor() {
        super("runme.kernel.v1.ListSessionsRequest", []);
    }
}
/**
 * @generated MessageType for protobuf message runme.kernel.v1.ListSessionsRequest
 */
export const ListSessionsRequest = new ListSessionsRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListSessionsResponse$Type extends MessageType {
    constructor() {
        super("runme.kernel.v1.ListSessionsResponse", [
            { no: 1, name: "sessions", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Session }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message runme.kernel.v1.ListSessionsResponse
 */
export const ListSessionsResponse = new ListSessionsResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PostSessionRequest$Type extends MessageType {
    constructor() {
        super("runme.kernel.v1.PostSessionRequest", [
            { no: 1, name: "command", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "prompt", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message runme.kernel.v1.PostSessionRequest
 */
export const PostSessionRequest = new PostSessionRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PostSessionResponse$Type extends MessageType {
    constructor() {
        super("runme.kernel.v1.PostSessionResponse", [
            { no: 1, name: "session", kind: "message", T: () => Session },
            { no: 2, name: "intro_data", kind: "scalar", T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message runme.kernel.v1.PostSessionResponse
 */
export const PostSessionResponse = new PostSessionResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ExecuteRequest$Type extends MessageType {
    constructor() {
        super("runme.kernel.v1.ExecuteRequest", [
            { no: 1, name: "session_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "command", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message runme.kernel.v1.ExecuteRequest
 */
export const ExecuteRequest = new ExecuteRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ExecuteResponse$Type extends MessageType {
    constructor() {
        super("runme.kernel.v1.ExecuteResponse", [
            { no: 1, name: "exit_code", kind: "message", T: () => UInt32Value },
            { no: 2, name: "data", kind: "scalar", T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message runme.kernel.v1.ExecuteResponse
 */
export const ExecuteResponse = new ExecuteResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class InputRequest$Type extends MessageType {
    constructor() {
        super("runme.kernel.v1.InputRequest", [
            { no: 1, name: "session_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "data", kind: "scalar", T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message runme.kernel.v1.InputRequest
 */
export const InputRequest = new InputRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class InputResponse$Type extends MessageType {
    constructor() {
        super("runme.kernel.v1.InputResponse", []);
    }
}
/**
 * @generated MessageType for protobuf message runme.kernel.v1.InputResponse
 */
export const InputResponse = new InputResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class OutputRequest$Type extends MessageType {
    constructor() {
        super("runme.kernel.v1.OutputRequest", [
            { no: 1, name: "session_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message runme.kernel.v1.OutputRequest
 */
export const OutputRequest = new OutputRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class OutputResponse$Type extends MessageType {
    constructor() {
        super("runme.kernel.v1.OutputResponse", [
            { no: 1, name: "data", kind: "scalar", T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message runme.kernel.v1.OutputResponse
 */
export const OutputResponse = new OutputResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class IORequest$Type extends MessageType {
    constructor() {
        super("runme.kernel.v1.IORequest", [
            { no: 1, name: "session_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "data", kind: "scalar", T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message runme.kernel.v1.IORequest
 */
export const IORequest = new IORequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class IOResponse$Type extends MessageType {
    constructor() {
        super("runme.kernel.v1.IOResponse", [
            { no: 1, name: "data", kind: "scalar", T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message runme.kernel.v1.IOResponse
 */
export const IOResponse = new IOResponse$Type();
/**
 * @generated ServiceType for protobuf service runme.kernel.v1.KernelService
 */
export const KernelService = new ServiceType("runme.kernel.v1.KernelService", [
    { name: "PostSession", options: {}, I: PostSessionRequest, O: PostSessionResponse },
    { name: "DeleteSession", options: {}, I: DeleteSessionRequest, O: DeleteSessionResponse },
    { name: "ListSessions", options: {}, I: ListSessionsRequest, O: ListSessionsResponse },
    { name: "Execute", options: {}, I: ExecuteRequest, O: ExecuteResponse },
    { name: "ExecuteStream", serverStreaming: true, options: {}, I: ExecuteRequest, O: ExecuteResponse },
    { name: "Input", options: {}, I: InputRequest, O: InputResponse },
    { name: "Output", serverStreaming: true, options: {}, I: OutputRequest, O: OutputResponse },
    { name: "IO", serverStreaming: true, clientStreaming: true, options: {}, I: IORequest, O: IOResponse }
]);
