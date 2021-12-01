import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { DocumentNode } from 'graphql';
export declare type Maybe<T> = T | null;
export declare type InputMaybe<T> = Maybe<T>;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export declare type RequireFields<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X];
} & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
    String: string;
    /** The `Boolean` scalar type represents `true` or `false`. */
    Boolean: boolean;
    /** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
    Int: number;
    Float: number;
    StudentsserviceListStudentsRequestInput: any;
};
export declare type Query = {
    studentsserviceStudentsServiceListStudents?: Maybe<StudentsserviceListStudentsResponse>;
    studentsserviceStudentsServiceGetStudent?: Maybe<StudentsserviceGetStudentResponse>;
    studentsserviceStudentsServiceConnectivityState?: Maybe<ConnectivityState>;
};
export declare type QuerystudentsserviceStudentsServiceListStudentsArgs = {
    input?: InputMaybe<Scalars['StudentsserviceListStudentsRequestInput']>;
};
export declare type QuerystudentsserviceStudentsServiceGetStudentArgs = {
    input?: InputMaybe<StudentsserviceGetStudentRequestInput>;
};
export declare type QuerystudentsserviceStudentsServiceConnectivityStateArgs = {
    tryToConnect?: InputMaybe<Scalars['Boolean']>;
};
export declare type StudentsserviceListStudentsResponse = {
    students?: Maybe<Array<Maybe<StudentsserviceStudent>>>;
};
export declare type StudentsserviceStudent = {
    studentId?: Maybe<Scalars['String']>;
    studentName?: Maybe<Scalars['String']>;
    studentAge?: Maybe<Scalars['Int']>;
    departmentId?: Maybe<Scalars['String']>;
};
export declare type StudentsserviceGetStudentResponse = {
    student?: Maybe<StudentsserviceStudent>;
};
export declare type StudentsserviceGetStudentRequestInput = {
    studentId?: InputMaybe<Scalars['String']>;
};
export declare enum ConnectivityState {
    IDLE = 0,
    CONNECTING = 1,
    READY = 2,
    TRANSIENT_FAILURE = 3,
    SHUTDOWN = 4
}
export declare type Mutation = {
    studentsserviceStudentsServiceAddStudent?: Maybe<StudentsserviceAddStudentsResponse>;
    studentsserviceStudentsServiceUpdateStudent?: Maybe<StudentsserviceUpdateStudentsResponse>;
    studentsserviceStudentsServiceDeleteStudent?: Maybe<StudentsserviceDeleteStudentsResponse>;
};
export declare type MutationstudentsserviceStudentsServiceAddStudentArgs = {
    input?: InputMaybe<StudentsserviceAddStudentsRequestInput>;
};
export declare type MutationstudentsserviceStudentsServiceUpdateStudentArgs = {
    input?: InputMaybe<StudentsserviceUpdateStudentsRequestInput>;
};
export declare type MutationstudentsserviceStudentsServiceDeleteStudentArgs = {
    input?: InputMaybe<StudentsserviceDeleteStudentsRequestInput>;
};
export declare type StudentsserviceAddStudentsResponse = {
    studentId?: Maybe<Scalars['String']>;
};
export declare type StudentsserviceAddStudentsRequestInput = {
    student?: InputMaybe<StudentsserviceStudentInput>;
};
export declare type StudentsserviceStudentInput = {
    studentId?: InputMaybe<Scalars['String']>;
    studentName?: InputMaybe<Scalars['String']>;
    studentAge?: InputMaybe<Scalars['Int']>;
    departmentId?: InputMaybe<Scalars['String']>;
};
export declare type StudentsserviceUpdateStudentsResponse = {
    studentId?: Maybe<Scalars['String']>;
};
export declare type StudentsserviceUpdateStudentsRequestInput = {
    student?: InputMaybe<StudentsserviceStudentInput>;
};
export declare type StudentsserviceDeleteStudentsResponse = {
    studentId?: Maybe<Scalars['String']>;
};
export declare type StudentsserviceDeleteStudentsRequestInput = {
    studentId?: InputMaybe<Scalars['String']>;
};
export declare type WithIndex<TObject> = TObject & Record<string, any>;
export declare type ResolversObject<TObject> = WithIndex<TObject>;
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export declare type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;
export declare type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export declare type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export declare type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export declare type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export declare type ResolversTypes = ResolversObject<{
    Query: ResolverTypeWrapper<{}>;
    StudentsserviceListStudentsResponse: ResolverTypeWrapper<StudentsserviceListStudentsResponse>;
    StudentsserviceStudent: ResolverTypeWrapper<StudentsserviceStudent>;
    String: ResolverTypeWrapper<Scalars['String']>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    StudentsserviceListStudentsRequestInput: ResolverTypeWrapper<Scalars['StudentsserviceListStudentsRequestInput']>;
    StudentsserviceGetStudentResponse: ResolverTypeWrapper<StudentsserviceGetStudentResponse>;
    StudentsserviceGetStudentRequestInput: StudentsserviceGetStudentRequestInput;
    ConnectivityState: ConnectivityState;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    Mutation: ResolverTypeWrapper<{}>;
    StudentsserviceAddStudentsResponse: ResolverTypeWrapper<StudentsserviceAddStudentsResponse>;
    StudentsserviceAddStudentsRequestInput: StudentsserviceAddStudentsRequestInput;
    StudentsserviceStudentInput: StudentsserviceStudentInput;
    StudentsserviceUpdateStudentsResponse: ResolverTypeWrapper<StudentsserviceUpdateStudentsResponse>;
    StudentsserviceUpdateStudentsRequestInput: StudentsserviceUpdateStudentsRequestInput;
    StudentsserviceDeleteStudentsResponse: ResolverTypeWrapper<StudentsserviceDeleteStudentsResponse>;
    StudentsserviceDeleteStudentsRequestInput: StudentsserviceDeleteStudentsRequestInput;
}>;
/** Mapping between all available schema types and the resolvers parents */
export declare type ResolversParentTypes = ResolversObject<{
    Query: {};
    StudentsserviceListStudentsResponse: StudentsserviceListStudentsResponse;
    StudentsserviceStudent: StudentsserviceStudent;
    String: Scalars['String'];
    Int: Scalars['Int'];
    StudentsserviceListStudentsRequestInput: Scalars['StudentsserviceListStudentsRequestInput'];
    StudentsserviceGetStudentResponse: StudentsserviceGetStudentResponse;
    StudentsserviceGetStudentRequestInput: StudentsserviceGetStudentRequestInput;
    Boolean: Scalars['Boolean'];
    Mutation: {};
    StudentsserviceAddStudentsResponse: StudentsserviceAddStudentsResponse;
    StudentsserviceAddStudentsRequestInput: StudentsserviceAddStudentsRequestInput;
    StudentsserviceStudentInput: StudentsserviceStudentInput;
    StudentsserviceUpdateStudentsResponse: StudentsserviceUpdateStudentsResponse;
    StudentsserviceUpdateStudentsRequestInput: StudentsserviceUpdateStudentsRequestInput;
    StudentsserviceDeleteStudentsResponse: StudentsserviceDeleteStudentsResponse;
    StudentsserviceDeleteStudentsRequestInput: StudentsserviceDeleteStudentsRequestInput;
}>;
export declare type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
    studentsserviceStudentsServiceListStudents?: Resolver<Maybe<ResolversTypes['StudentsserviceListStudentsResponse']>, ParentType, ContextType, RequireFields<QuerystudentsserviceStudentsServiceListStudentsArgs, never>>;
    studentsserviceStudentsServiceGetStudent?: Resolver<Maybe<ResolversTypes['StudentsserviceGetStudentResponse']>, ParentType, ContextType, RequireFields<QuerystudentsserviceStudentsServiceGetStudentArgs, never>>;
    studentsserviceStudentsServiceConnectivityState?: Resolver<Maybe<ResolversTypes['ConnectivityState']>, ParentType, ContextType, RequireFields<QuerystudentsserviceStudentsServiceConnectivityStateArgs, never>>;
}>;
export declare type StudentsserviceListStudentsResponseResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['StudentsserviceListStudentsResponse'] = ResolversParentTypes['StudentsserviceListStudentsResponse']> = ResolversObject<{
    students?: Resolver<Maybe<Array<Maybe<ResolversTypes['StudentsserviceStudent']>>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type StudentsserviceStudentResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['StudentsserviceStudent'] = ResolversParentTypes['StudentsserviceStudent']> = ResolversObject<{
    studentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    studentName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    studentAge?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    departmentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export interface StudentsserviceListStudentsRequestInputScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['StudentsserviceListStudentsRequestInput'], any> {
    name: 'StudentsserviceListStudentsRequestInput';
}
export declare type StudentsserviceGetStudentResponseResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['StudentsserviceGetStudentResponse'] = ResolversParentTypes['StudentsserviceGetStudentResponse']> = ResolversObject<{
    student?: Resolver<Maybe<ResolversTypes['StudentsserviceStudent']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type ConnectivityStateResolvers = {
    IDLE: 'undefined';
    CONNECTING: 1;
    READY: 2;
    TRANSIENT_FAILURE: 3;
    SHUTDOWN: 4;
};
export declare type MutationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
    studentsserviceStudentsServiceAddStudent?: Resolver<Maybe<ResolversTypes['StudentsserviceAddStudentsResponse']>, ParentType, ContextType, RequireFields<MutationstudentsserviceStudentsServiceAddStudentArgs, never>>;
    studentsserviceStudentsServiceUpdateStudent?: Resolver<Maybe<ResolversTypes['StudentsserviceUpdateStudentsResponse']>, ParentType, ContextType, RequireFields<MutationstudentsserviceStudentsServiceUpdateStudentArgs, never>>;
    studentsserviceStudentsServiceDeleteStudent?: Resolver<Maybe<ResolversTypes['StudentsserviceDeleteStudentsResponse']>, ParentType, ContextType, RequireFields<MutationstudentsserviceStudentsServiceDeleteStudentArgs, never>>;
}>;
export declare type StudentsserviceAddStudentsResponseResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['StudentsserviceAddStudentsResponse'] = ResolversParentTypes['StudentsserviceAddStudentsResponse']> = ResolversObject<{
    studentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type StudentsserviceUpdateStudentsResponseResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['StudentsserviceUpdateStudentsResponse'] = ResolversParentTypes['StudentsserviceUpdateStudentsResponse']> = ResolversObject<{
    studentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type StudentsserviceDeleteStudentsResponseResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['StudentsserviceDeleteStudentsResponse'] = ResolversParentTypes['StudentsserviceDeleteStudentsResponse']> = ResolversObject<{
    studentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type Resolvers<ContextType = MeshContext> = ResolversObject<{
    Query?: QueryResolvers<ContextType>;
    StudentsserviceListStudentsResponse?: StudentsserviceListStudentsResponseResolvers<ContextType>;
    StudentsserviceStudent?: StudentsserviceStudentResolvers<ContextType>;
    StudentsserviceListStudentsRequestInput?: GraphQLScalarType;
    StudentsserviceGetStudentResponse?: StudentsserviceGetStudentResponseResolvers<ContextType>;
    ConnectivityState?: ConnectivityStateResolvers;
    Mutation?: MutationResolvers<ContextType>;
    StudentsserviceAddStudentsResponse?: StudentsserviceAddStudentsResponseResolvers<ContextType>;
    StudentsserviceUpdateStudentsResponse?: StudentsserviceUpdateStudentsResponseResolvers<ContextType>;
    StudentsserviceDeleteStudentsResponse?: StudentsserviceDeleteStudentsResponseResolvers<ContextType>;
}>;
import { MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { InContextSdkMethod } from '@graphql-mesh/types';
export declare type QueryStudentsApiSdk = {
    studentsserviceStudentsServiceListStudents: InContextSdkMethod<Query['studentsserviceStudentsServiceListStudents'], QuerystudentsserviceStudentsServiceListStudentsArgs, MeshContext>;
    studentsserviceStudentsServiceGetStudent: InContextSdkMethod<Query['studentsserviceStudentsServiceGetStudent'], QuerystudentsserviceStudentsServiceGetStudentArgs, MeshContext>;
    studentsserviceStudentsServiceConnectivityState: InContextSdkMethod<Query['studentsserviceStudentsServiceConnectivityState'], QuerystudentsserviceStudentsServiceConnectivityStateArgs, MeshContext>;
};
export declare type MutationStudentsApiSdk = {
    studentsserviceStudentsServiceAddStudent: InContextSdkMethod<Mutation['studentsserviceStudentsServiceAddStudent'], MutationstudentsserviceStudentsServiceAddStudentArgs, MeshContext>;
    studentsserviceStudentsServiceUpdateStudent: InContextSdkMethod<Mutation['studentsserviceStudentsServiceUpdateStudent'], MutationstudentsserviceStudentsServiceUpdateStudentArgs, MeshContext>;
    studentsserviceStudentsServiceDeleteStudent: InContextSdkMethod<Mutation['studentsserviceStudentsServiceDeleteStudent'], MutationstudentsserviceStudentsServiceDeleteStudentArgs, MeshContext>;
};
export declare type SubscriptionStudentsApiSdk = {};
export declare type StudentsApiContext = {
    ["StudentsApi"]: {
        Query: QueryStudentsApiSdk;
        Mutation: MutationStudentsApiSdk;
        Subscription: SubscriptionStudentsApiSdk;
    };
};
export declare type MeshContext = StudentsApiContext & BaseMeshContext;
import { GetMeshOptions } from '@graphql-mesh/runtime';
import { YamlConfig } from '@graphql-mesh/types';
export declare const rawConfig: YamlConfig.Config;
export declare function getMeshOptions(): GetMeshOptions;
export declare const documentsInSDL: any[];
export declare function getBuiltMesh(): Promise<MeshInstance>;
export declare function getMeshSDK(): Promise<{
    studentsserviceStudentsServiceListStudents_query(variables?: Exact<{
        input?: any;
    }>, options?: unknown): Promise<studentsserviceStudentsServiceListStudents_queryQuery>;
    studentsserviceStudentsServiceGetStudent_query(variables?: Exact<{
        input?: StudentsserviceGetStudentRequestInput;
    }>, options?: unknown): Promise<studentsserviceStudentsServiceGetStudent_queryQuery>;
    studentsserviceStudentsServiceConnectivityState_query(variables?: Exact<{
        tryToConnect?: boolean;
    }>, options?: unknown): Promise<studentsserviceStudentsServiceConnectivityState_queryQuery>;
    studentsserviceStudentsServiceAddStudent_mutation(variables?: Exact<{
        input?: StudentsserviceAddStudentsRequestInput;
    }>, options?: unknown): Promise<studentsserviceStudentsServiceAddStudent_mutationMutation>;
    studentsserviceStudentsServiceUpdateStudent_mutation(variables?: Exact<{
        input?: StudentsserviceUpdateStudentsRequestInput;
    }>, options?: unknown): Promise<studentsserviceStudentsServiceUpdateStudent_mutationMutation>;
    studentsserviceStudentsServiceDeleteStudent_mutation(variables?: Exact<{
        input?: StudentsserviceDeleteStudentsRequestInput;
    }>, options?: unknown): Promise<studentsserviceStudentsServiceDeleteStudent_mutationMutation>;
}>;
export declare type studentsserviceStudentsServiceListStudents_queryQueryVariables = Exact<{
    input?: Maybe<Scalars['StudentsserviceListStudentsRequestInput']>;
}>;
export declare type studentsserviceStudentsServiceListStudents_queryQuery = {
    studentsserviceStudentsServiceListStudents?: Maybe<{
        students?: Maybe<Array<Maybe<Pick<StudentsserviceStudent, 'studentId' | 'studentName' | 'studentAge' | 'departmentId'>>>>;
    }>;
};
export declare type studentsserviceStudentsServiceGetStudent_queryQueryVariables = Exact<{
    input?: Maybe<StudentsserviceGetStudentRequestInput>;
}>;
export declare type studentsserviceStudentsServiceGetStudent_queryQuery = {
    studentsserviceStudentsServiceGetStudent?: Maybe<{
        student?: Maybe<Pick<StudentsserviceStudent, 'studentId' | 'studentName' | 'studentAge' | 'departmentId'>>;
    }>;
};
export declare type studentsserviceStudentsServiceConnectivityState_queryQueryVariables = Exact<{
    tryToConnect?: Maybe<Scalars['Boolean']>;
}>;
export declare type studentsserviceStudentsServiceConnectivityState_queryQuery = Pick<Query, 'studentsserviceStudentsServiceConnectivityState'>;
export declare type studentsserviceStudentsServiceAddStudent_mutationMutationVariables = Exact<{
    input?: Maybe<StudentsserviceAddStudentsRequestInput>;
}>;
export declare type studentsserviceStudentsServiceAddStudent_mutationMutation = {
    studentsserviceStudentsServiceAddStudent?: Maybe<Pick<StudentsserviceAddStudentsResponse, 'studentId'>>;
};
export declare type studentsserviceStudentsServiceUpdateStudent_mutationMutationVariables = Exact<{
    input?: Maybe<StudentsserviceUpdateStudentsRequestInput>;
}>;
export declare type studentsserviceStudentsServiceUpdateStudent_mutationMutation = {
    studentsserviceStudentsServiceUpdateStudent?: Maybe<Pick<StudentsserviceUpdateStudentsResponse, 'studentId'>>;
};
export declare type studentsserviceStudentsServiceDeleteStudent_mutationMutationVariables = Exact<{
    input?: Maybe<StudentsserviceDeleteStudentsRequestInput>;
}>;
export declare type studentsserviceStudentsServiceDeleteStudent_mutationMutation = {
    studentsserviceStudentsServiceDeleteStudent?: Maybe<Pick<StudentsserviceDeleteStudentsResponse, 'studentId'>>;
};
export declare const studentsserviceStudentsServiceListStudents_queryDocument: DocumentNode;
export declare const studentsserviceStudentsServiceGetStudent_queryDocument: DocumentNode;
export declare const studentsserviceStudentsServiceConnectivityState_queryDocument: DocumentNode;
export declare const studentsserviceStudentsServiceAddStudent_mutationDocument: DocumentNode;
export declare const studentsserviceStudentsServiceUpdateStudent_mutationDocument: DocumentNode;
export declare const studentsserviceStudentsServiceDeleteStudent_mutationDocument: DocumentNode;
export declare type Requester<C = {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R>;
export declare function getSdk<C>(requester: Requester<C>): {
    studentsserviceStudentsServiceListStudents_query(variables?: studentsserviceStudentsServiceListStudents_queryQueryVariables, options?: C): Promise<studentsserviceStudentsServiceListStudents_queryQuery>;
    studentsserviceStudentsServiceGetStudent_query(variables?: studentsserviceStudentsServiceGetStudent_queryQueryVariables, options?: C): Promise<studentsserviceStudentsServiceGetStudent_queryQuery>;
    studentsserviceStudentsServiceConnectivityState_query(variables?: studentsserviceStudentsServiceConnectivityState_queryQueryVariables, options?: C): Promise<studentsserviceStudentsServiceConnectivityState_queryQuery>;
    studentsserviceStudentsServiceAddStudent_mutation(variables?: studentsserviceStudentsServiceAddStudent_mutationMutationVariables, options?: C): Promise<studentsserviceStudentsServiceAddStudent_mutationMutation>;
    studentsserviceStudentsServiceUpdateStudent_mutation(variables?: studentsserviceStudentsServiceUpdateStudent_mutationMutationVariables, options?: C): Promise<studentsserviceStudentsServiceUpdateStudent_mutationMutation>;
    studentsserviceStudentsServiceDeleteStudent_mutation(variables?: studentsserviceStudentsServiceDeleteStudent_mutationMutationVariables, options?: C): Promise<studentsserviceStudentsServiceDeleteStudent_mutationMutation>;
};
export declare type Sdk = ReturnType<typeof getSdk>;
