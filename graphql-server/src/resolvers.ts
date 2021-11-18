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
        departments: () => departments
    },
};