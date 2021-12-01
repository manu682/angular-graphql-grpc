export var ConnectivityState;
(function (ConnectivityState) {
    ConnectivityState[ConnectivityState["IDLE"] = 0] = "IDLE";
    ConnectivityState[ConnectivityState["CONNECTING"] = 1] = "CONNECTING";
    ConnectivityState[ConnectivityState["READY"] = 2] = "READY";
    ConnectivityState[ConnectivityState["TRANSIENT_FAILURE"] = 3] = "TRANSIENT_FAILURE";
    ConnectivityState[ConnectivityState["SHUTDOWN"] = 4] = "SHUTDOWN";
})(ConnectivityState || (ConnectivityState = {}));
import { getMesh } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { join, relative, isAbsolute, dirname } from 'path';
import { fileURLToPath } from 'url';
import ExternalModule_0 from '@graphql-mesh/cache-inmemory-lru';
import ExternalModule_1 from '@graphql-mesh/grpc';
import ExternalModule_2 from '@graphql-mesh/merger-bare';
import ExternalModule_3 from '@graphql-mesh/transform-naming-convention';
import ExternalModule_4 from './sources/StudentsApi/descriptorSet.proto.cjs';
const importedModules = {
    // @ts-ignore
    ["@graphql-mesh/cache-inmemory-lru"]: ExternalModule_0,
    // @ts-ignore
    ["@graphql-mesh/grpc"]: ExternalModule_1,
    // @ts-ignore
    ["@graphql-mesh/merger-bare"]: ExternalModule_2,
    // @ts-ignore
    ["@graphql-mesh/transform-naming-convention"]: ExternalModule_3,
    // @ts-ignore
    [".mesh/sources/StudentsApi/descriptorSet.proto.cjs"]: ExternalModule_4
};
const baseDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const importFn = (moduleId) => {
    const relativeModuleId = (isAbsolute(moduleId) ? relative(baseDir, moduleId) : moduleId).split('\\').join('/');
    if (!(relativeModuleId in importedModules)) {
        throw new Error(`Cannot find module '${relativeModuleId}'.`);
    }
    return Promise.resolve(importedModules[relativeModuleId]);
};
const rootStore = new MeshStore('.mesh', new FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
}), {
    readonly: true,
    validate: false
});
import MeshCache from '@graphql-mesh/cache-inmemory-lru';
import { PubSub } from 'graphql-subscriptions';
import { EventEmitter } from 'events';
import { DefaultLogger } from '@graphql-mesh/utils';
import GrpcHandler from '@graphql-mesh/grpc';
import BareMerger from '@graphql-mesh/merger-bare';
import NamingConventionTransform from '@graphql-mesh/transform-naming-convention';
import { resolveAdditionalResolvers } from '@graphql-mesh/utils';
export const rawConfig = { "sdk": { "generateOperations": { "selectionSetDepth": 2 } }, "sources": [{ "name": "StudentsApi", "handler": { "grpc": { "endpoint": "localhost:5000", "protoFilePath": "internal_interfaces/students.proto", "requestTimeout": 60000 } }, "transforms": [{ "namingConvention": { "typeNames": "pascalCase", "enumValues": "upperCase", "fieldNames": "camelCase" } }] }] };
export async function getMeshOptions() {
    const cache = new MeshCache({
        ...(rawConfig.cache || {}),
        store: rootStore.child('cache'),
    });
    const eventEmitter = new EventEmitter({ captureRejections: true });
    eventEmitter.setMaxListeners(Infinity);
    const pubsub = new PubSub({ eventEmitter });
    const sourcesStore = rootStore.child('sources');
    const logger = new DefaultLogger('🕸️');
    const sources = [];
    const transforms = [];
    const studentsApiTransforms = [];
    const additionalTypeDefs = [];
    const studentsApiHandler = new GrpcHandler({
        name: rawConfig.sources[0].name,
        config: rawConfig.sources[0].handler["grpc"],
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(rawConfig.sources[0].name),
        logger: logger.child(rawConfig.sources[0].name),
        importFn
    });
    const merger = new BareMerger({
        cache,
        pubsub,
        logger: logger.child('BareMerger'),
        store: rootStore.child('bareMerger')
    });
    studentsApiTransforms.push(new NamingConventionTransform({
        apiName: rawConfig.sources[0].name,
        config: rawConfig.sources[0].transforms[0]["namingConvention"],
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
    const additionalResolvers = await resolveAdditionalResolvers(baseDir, additionalResolversRawConfig, importFn, pubsub);
    const liveQueryInvalidations = rawConfig.liveQueryInvalidations;
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
export const documentsInSDL = /*#__PURE__*/ [];
export async function getBuiltMesh() {
    const meshConfig = await getMeshOptions();
    return getMesh(meshConfig);
}
export async function getMeshSDK() {
    const { sdkRequester } = await getBuiltMesh();
    return getSdk(sdkRequester);
}
export const studentsserviceStudentsServiceListStudents_queryDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceListStudents_query" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "StudentsserviceListStudentsRequestInput" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceListStudents" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "students" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "studentName" } }, { "kind": "Field", "name": { "kind": "Name", "value": "studentAge" } }, { "kind": "Field", "name": { "kind": "Name", "value": "departmentId" } }] } }] } }] } }] };
export const studentsserviceStudentsServiceGetStudent_queryDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceGetStudent_query" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "StudentsserviceGetStudentRequestInput" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceGetStudent" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "student" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "studentName" } }, { "kind": "Field", "name": { "kind": "Name", "value": "studentAge" } }, { "kind": "Field", "name": { "kind": "Name", "value": "departmentId" } }] } }] } }] } }] };
export const studentsserviceStudentsServiceConnectivityState_queryDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceConnectivityState_query" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "tryToConnect" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Boolean" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceConnectivityState" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "tryToConnect" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "tryToConnect" } } }] }] } }] };
export const studentsserviceStudentsServiceAddStudent_mutationDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceAddStudent_mutation" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "StudentsserviceAddStudentsRequestInput" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceAddStudent" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentId" } }] } }] } }] };
export const studentsserviceStudentsServiceUpdateStudent_mutationDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceUpdateStudent_mutation" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "StudentsserviceUpdateStudentsRequestInput" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceUpdateStudent" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentId" } }] } }] } }] };
export const studentsserviceStudentsServiceDeleteStudent_mutationDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceDeleteStudent_mutation" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "StudentsserviceDeleteStudentsRequestInput" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentsserviceStudentsServiceDeleteStudent" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "studentId" } }] } }] } }] };
export function getSdk(requester) {
    return {
        studentsserviceStudentsServiceListStudents_query(variables, options) {
            return requester(studentsserviceStudentsServiceListStudents_queryDocument, variables, options);
        },
        studentsserviceStudentsServiceGetStudent_query(variables, options) {
            return requester(studentsserviceStudentsServiceGetStudent_queryDocument, variables, options);
        },
        studentsserviceStudentsServiceConnectivityState_query(variables, options) {
            return requester(studentsserviceStudentsServiceConnectivityState_queryDocument, variables, options);
        },
        studentsserviceStudentsServiceAddStudent_mutation(variables, options) {
            return requester(studentsserviceStudentsServiceAddStudent_mutationDocument, variables, options);
        },
        studentsserviceStudentsServiceUpdateStudent_mutation(variables, options) {
            return requester(studentsserviceStudentsServiceUpdateStudent_mutationDocument, variables, options);
        },
        studentsserviceStudentsServiceDeleteStudent_mutation(variables, options) {
            return requester(studentsserviceStudentsServiceDeleteStudent_mutationDocument, variables, options);
        }
    };
}
