"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSdk = exports.studentsserviceStudentsServiceDeleteStudent_mutationDocument = exports.studentsserviceStudentsServiceUpdateStudent_mutationDocument = exports.studentsserviceStudentsServiceAddStudent_mutationDocument = exports.studentsserviceStudentsServiceConnectivityState_queryDocument = exports.studentsserviceStudentsServiceGetStudent_queryDocument = exports.studentsserviceStudentsServiceListStudents_queryDocument = exports.getMeshSDK = exports.getBuiltMesh = exports.documentsInSDL = exports.getMeshOptions = exports.rawConfig = exports.ConnectivityState = void 0;
const tslib_1 = require("tslib");
var ConnectivityState;
(function (ConnectivityState) {
    ConnectivityState[ConnectivityState["IDLE"] = 0] = "IDLE";
    ConnectivityState[ConnectivityState["CONNECTING"] = 1] = "CONNECTING";
    ConnectivityState[ConnectivityState["READY"] = 2] = "READY";
    ConnectivityState[ConnectivityState["TRANSIENT_FAILURE"] = 3] = "TRANSIENT_FAILURE";
    ConnectivityState[ConnectivityState["SHUTDOWN"] = 4] = "SHUTDOWN";
})(ConnectivityState = exports.ConnectivityState || (exports.ConnectivityState = {}));
const runtime_1 = require("@graphql-mesh/runtime");
const store_1 = require("@graphql-mesh/store");
const path_1 = require("path");
const cache_inmemory_lru_1 = (0, tslib_1.__importDefault)(require("@graphql-mesh/cache-inmemory-lru"));
const grpc_1 = (0, tslib_1.__importDefault)(require("@graphql-mesh/grpc"));
const merger_bare_1 = (0, tslib_1.__importDefault)(require("@graphql-mesh/merger-bare"));
const transform_naming_convention_1 = (0, tslib_1.__importDefault)(require("@graphql-mesh/transform-naming-convention"));
const descriptorSet_proto_cjs_1 = (0, tslib_1.__importDefault)(require("./sources/StudentsApi/descriptorSet.proto.cjs"));
const importedModules = {
    // @ts-ignore
    ["@graphql-mesh/cache-inmemory-lru"]: cache_inmemory_lru_1.default,
    // @ts-ignore
    ["@graphql-mesh/grpc"]: grpc_1.default,
    // @ts-ignore
    ["@graphql-mesh/merger-bare"]: merger_bare_1.default,
    // @ts-ignore
    ["@graphql-mesh/transform-naming-convention"]: transform_naming_convention_1.default,
    // @ts-ignore
    [".mesh/sources/StudentsApi/descriptorSet.proto.cjs"]: descriptorSet_proto_cjs_1.default
};
const baseDir = (0, path_1.join)(__dirname, '..');
const importFn = (moduleId) => {
    const relativeModuleId = ((0, path_1.isAbsolute)(moduleId) ? (0, path_1.relative)(baseDir, moduleId) : moduleId).split('\\').join('/');
    if (!(relativeModuleId in importedModules)) {
        throw new Error(`Cannot find module '${relativeModuleId}'.`);
    }
    return Promise.resolve(importedModules[relativeModuleId]);
};
const rootStore = new store_1.MeshStore('.mesh', new store_1.FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
}), {
    readonly: true,
    validate: false
});
const cache_inmemory_lru_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/cache-inmemory-lru"));
const graphql_subscriptions_1 = require("graphql-subscriptions");
const events_1 = require("events");
const utils_1 = require("@graphql-mesh/utils");
const grpc_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/grpc"));
const merger_bare_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/merger-bare"));
const transform_naming_convention_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/transform-naming-convention"));
const utils_2 = require("@graphql-mesh/utils");
exports.rawConfig = { "sdk": { "generateOperations": { "selectionSetDepth": 2 } }, "sources": [{ "name": "StudentsApi", "handler": { "grpc": { "endpoint": "localhost:5000", "protoFilePath": "internal_interfaces/students.proto", "requestTimeout": 60000 } }, "transforms": [{ "namingConvention": { "typeNames": "pascalCase", "enumValues": "upperCase", "fieldNames": "camelCase" } }] }] };
async function getMeshOptions() {
    const cache = new cache_inmemory_lru_2.default({
        ...(exports.rawConfig.cache || {}),
        store: rootStore.child('cache'),
    });
    const eventEmitter = new events_1.EventEmitter({ captureRejections: true });
    eventEmitter.setMaxListeners(Infinity);
    const pubsub = new graphql_subscriptions_1.PubSub({ eventEmitter });
    const sourcesStore = rootStore.child('sources');
    const logger = new utils_1.DefaultLogger('🕸️');
    const sources = [];
    const transforms = [];
    const studentsApiTransforms = [];
    const additionalTypeDefs = [];
    const studentsApiHandler = new grpc_2.default({
        name: exports.rawConfig.sources[0].name,
        config: exports.rawConfig.sources[0].handler["grpc"],
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(exports.rawConfig.sources[0].name),
        logger: logger.child(exports.rawConfig.sources[0].name),
        importFn
    });
    const merger = new merger_bare_2.default({
        cache,
        pubsub,
        logger: logger.child('BareMerger'),
        store: rootStore.child('bareMerger')
    });
    studentsApiTransforms.push(new transform_naming_convention_2.default({
        apiName: exports.rawConfig.sources[0].name,
        config: exports.rawConfig.sources[0].transforms[0]["namingConvention"],
        baseDir,
        cache,
        pubsub,
        importFn
    }));
    sources.push({
        name: 'StudentsApi',
        handler: studentsApiHandler,
        transforms: studentsApiTransforms
    });
    const additionalResolversRawConfig = [];
    const additionalResolvers = await (0, utils_2.resolveAdditionalResolvers)(baseDir, additionalResolversRawConfig, importFn, pubsub);
    const liveQueryInvalidations = exports.rawConfig.liveQueryInvalidations;
    return {
        sources,
        transforms,
        additionalTypeDefs,
        additionalResolvers,
        cache,
        pubsub,
        merger,
        logger,
        liveQueryInvalidations,
    };
}
exports.getMeshOptions = getMeshOptions;
exports.documentsInSDL = [];
async function getBuiltMesh() {
    const meshConfig = await getMeshOptions();
    return (0, runtime_1.getMesh)(meshConfig);
}
exports.getBuiltMesh = getBuiltMesh;
async function getMeshSDK() {
    const { sdkRequester } = await getBuiltMesh();
    return getSdk(sdkRequester);
}
exports.getMeshSDK = getMeshSDK;
exports.studentsserviceStudentsServiceListStudents_queryDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceListStudents_query" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "StudentsserviceListStudentsRequestInput" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceListStudents" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "students" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "studentName" } }, { "kind": "Field", "name": { "kind": "Name", "value": "studentAge" } }, { "kind": "Field", "name": { "kind": "Name", "value": "departmentId" } }] } }] } }] } }] };
exports.studentsserviceStudentsServiceGetStudent_queryDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceGetStudent_query" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "StudentsserviceGetStudentRequestInput" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceGetStudent" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "student" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "studentName" } }, { "kind": "Field", "name": { "kind": "Name", "value": "studentAge" } }, { "kind": "Field", "name": { "kind": "Name", "value": "departmentId" } }] } }] } }] } }] };
exports.studentsserviceStudentsServiceConnectivityState_queryDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceConnectivityState_query" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "tryToConnect" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Boolean" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceConnectivityState" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "tryToConnect" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "tryToConnect" } } }] }] } }] };
exports.studentsserviceStudentsServiceAddStudent_mutationDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceAddStudent_mutation" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "StudentsserviceAddStudentsRequestInput" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceAddStudent" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentId" } }] } }] } }] };
exports.studentsserviceStudentsServiceUpdateStudent_mutationDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceUpdateStudent_mutation" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "StudentsserviceUpdateStudentsRequestInput" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceUpdateStudent" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentId" } }] } }] } }] };
exports.studentsserviceStudentsServiceDeleteStudent_mutationDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceDeleteStudent_mutation" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "StudentsserviceDeleteStudentsRequestInput" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceDeleteStudent" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentId" } }] } }] } }] };
function getSdk(requester) {
    return {
        studentsserviceStudentsServiceListStudents_query(variables, options) {
            return requester(exports.studentsserviceStudentsServiceListStudents_queryDocument, variables, options);
        },
        studentsserviceStudentsServiceGetStudent_query(variables, options) {
            return requester(exports.studentsserviceStudentsServiceGetStudent_queryDocument, variables, options);
        },
        studentsserviceStudentsServiceConnectivityState_query(variables, options) {
            return requester(exports.studentsserviceStudentsServiceConnectivityState_queryDocument, variables, options);
        },
        studentsserviceStudentsServiceAddStudent_mutation(variables, options) {
            return requester(exports.studentsserviceStudentsServiceAddStudent_mutationDocument, variables, options);
        },
        studentsserviceStudentsServiceUpdateStudent_mutation(variables, options) {
            return requester(exports.studentsserviceStudentsServiceUpdateStudent_mutationDocument, variables, options);
        },
        studentsserviceStudentsServiceDeleteStudent_mutation(variables, options) {
            return requester(exports.studentsserviceStudentsServiceDeleteStudent_mutationDocument, variables, options);
        }
    };
}
exports.getSdk = getSdk;
