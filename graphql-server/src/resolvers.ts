const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = "students.proto"

import { getMeshSDK } from '../.mesh';

// Fake Data
const students = [
    {
        student_id: "123",
        student_name: "Richard",
        student_age: 23,
        department_id: "Dep123"
    },
    {
        student_id: "345",
        student_name: "Nathan",
        student_age: 28,
        department_id: "Dep345"
    },
];

const departments = [
    {
        department_id: "Dep123",
        department_name: "Department 1"
    },
    {
        department_id: "Dep345",
        department_name: "Department 2"
    }
];

export const resolvers = {
    Query: {
        students: () => students,

        //With Fake Data
        studentsFakeData: () => students,

        //With gRPC Data
        studentsRegularGrpc: async () => {
            const studentsApiPackageDefinition = protoLoader.loadSync(PROTO_PATH, {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true,
                arrays: true,
                objects: true,
                includeDirs: ["internal_interfaces"]
            });

            const studentsServiceProto = grpc.loadPackageDefinition(studentsApiPackageDefinition).studentsservice;

            // Instantiate the client with its server address and credentials
            const client = new studentsServiceProto.StudentsService('localhost:5000', grpc.credentials.createInsecure());

            let response = new Promise(function (myResolve, myReject) {
                client.listStudents({}, (err, response) => {
                    if (err) {
                        console.error(err);
                        myReject(err);
                    }
                    else {
                        myResolve(response.students);
                    }
                });
            });

            return response;
        },

        studentsMeshGrpc: async () => {
            // Load mesh config and get the sdkClient from it
            const sdk = await getMeshSDK();

            const response = await sdk.studentsserviceStudentsServiceListStudents_query({});
            console.log("Response : " + JSON.stringify(response));

            return response.studentsserviceStudentsServiceListStudents.students;
        },
        departments: () => departments
    },
};