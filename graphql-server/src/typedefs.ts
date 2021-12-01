import { gql } from 'apollo-server';

export const typeDefs = gql`
  # The student data
  type Student {
    student_id: String
    student_name: String
    student_age: Int
    department_id: String
  }

  # The student data
  type StudentUpdate {
    studentId: String
    studentName: String
    studentAge: Int
    departmentId: String
  }

  # The department data
  type Department {
    department_id: String
    department_name: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
    students: [Student],
    studentsFakeData: [Student],
    studentsRegularGrpc: [Student],
    studentsMeshGrpc: [StudentUpdate],
    departments: [Department]
  }
`;