const { FileDescriptorSet } = require('protobufjs/ext/descriptor/index.js');

module.exports = {
  decodedDescriptorSet: FileDescriptorSet.fromObject({
  "file": [
    {
      "name": "studentsservice.proto",
      "package": "studentsservice",
      "messageType": [
        {
          "name": "GetStudentRequest",
          "field": [
            {
              "name": "studentId",
              "number": 1,
              "label": "LABEL_OPTIONAL",
              "type": "TYPE_STRING"
            }
          ]
        },
        {
          "name": "GetStudentResponse",
          "field": [
            {
              "name": "student",
              "number": 1,
              "label": "LABEL_OPTIONAL",
              "type": "TYPE_MESSAGE",
              "typeName": "Student"
            }
          ]
        },
        {
          "name": "ListStudentsRequest"
        },
        {
          "name": "ListStudentsResponse",
          "field": [
            {
              "name": "students",
              "number": 1,
              "label": "LABEL_REPEATED",
              "type": "TYPE_MESSAGE",
              "typeName": "Student"
            }
          ]
        },
        {
          "name": "AddStudentsRequest",
          "field": [
            {
              "name": "student",
              "number": 1,
              "label": "LABEL_OPTIONAL",
              "type": "TYPE_MESSAGE",
              "typeName": "Student"
            }
          ]
        },
        {
          "name": "AddStudentsResponse",
          "field": [
            {
              "name": "studentId",
              "number": 1,
              "label": "LABEL_OPTIONAL",
              "type": "TYPE_STRING"
            }
          ]
        },
        {
          "name": "UpdateStudentsRequest",
          "field": [
            {
              "name": "student",
              "number": 1,
              "label": "LABEL_OPTIONAL",
              "type": "TYPE_MESSAGE",
              "typeName": "Student"
            }
          ]
        },
        {
          "name": "UpdateStudentsResponse",
          "field": [
            {
              "name": "studentId",
              "number": 1,
              "label": "LABEL_OPTIONAL",
              "type": "TYPE_STRING"
            }
          ]
        },
        {
          "name": "DeleteStudentsRequest",
          "field": [
            {
              "name": "studentId",
              "number": 1,
              "label": "LABEL_OPTIONAL",
              "type": "TYPE_STRING"
            }
          ]
        },
        {
          "name": "DeleteStudentsResponse",
          "field": [
            {
              "name": "studentId",
              "number": 1,
              "label": "LABEL_OPTIONAL",
              "type": "TYPE_STRING"
            }
          ]
        },
        {
          "name": "Student",
          "field": [
            {
              "name": "studentId",
              "number": 1,
              "label": "LABEL_OPTIONAL",
              "type": "TYPE_STRING"
            },
            {
              "name": "studentName",
              "number": 2,
              "label": "LABEL_OPTIONAL",
              "type": "TYPE_STRING"
            },
            {
              "name": "studentAge",
              "number": 3,
              "label": "LABEL_OPTIONAL",
              "type": "TYPE_INT32"
            },
            {
              "name": "departmentId",
              "number": 4,
              "label": "LABEL_OPTIONAL",
              "type": "TYPE_STRING"
            }
          ]
        }
      ],
      "service": [
        {
          "name": "StudentsService",
          "method": [
            {
              "name": "listStudents",
              "inputType": ".studentsservice.ListStudentsRequest",
              "outputType": ".studentsservice.ListStudentsResponse"
            },
            {
              "name": "addStudent",
              "inputType": ".studentsservice.AddStudentsRequest",
              "outputType": ".studentsservice.AddStudentsResponse"
            },
            {
              "name": "updateStudent",
              "inputType": ".studentsservice.UpdateStudentsRequest",
              "outputType": ".studentsservice.UpdateStudentsResponse"
            },
            {
              "name": "deleteStudent",
              "inputType": ".studentsservice.DeleteStudentsRequest",
              "outputType": ".studentsservice.DeleteStudentsResponse"
            },
            {
              "name": "getStudent",
              "inputType": ".studentsservice.GetStudentRequest",
              "outputType": ".studentsservice.GetStudentResponse"
            }
          ]
        }
      ],
      "options": {
        "goPackage": "students.service"
      },
      "syntax": "proto3"
    }
  ]
}),
  rootJson: {
  "nested": {
    "studentsservice": {
      "options": {
        "go_package": "students.service"
      },
      "nested": {
        "StudentsService": {
          "methods": {
            "listStudents": {
              "requestType": "ListStudentsRequest",
              "responseType": "ListStudentsResponse",
              "comment": null
            },
            "addStudent": {
              "requestType": "AddStudentsRequest",
              "responseType": "AddStudentsResponse",
              "comment": null
            },
            "updateStudent": {
              "requestType": "UpdateStudentsRequest",
              "responseType": "UpdateStudentsResponse",
              "comment": null
            },
            "deleteStudent": {
              "requestType": "DeleteStudentsRequest",
              "responseType": "DeleteStudentsResponse",
              "comment": null
            },
            "getStudent": {
              "requestType": "GetStudentRequest",
              "responseType": "GetStudentResponse",
              "comment": null
            }
          },
          "comment": null
        },
        "GetStudentRequest": {
          "fields": {
            "studentId": {
              "type": "string",
              "id": 1,
              "comment": null
            }
          },
          "comment": null
        },
        "GetStudentResponse": {
          "fields": {
            "student": {
              "type": "Student",
              "id": 1,
              "comment": null
            }
          },
          "comment": null
        },
        "ListStudentsRequest": {
          "fields": {},
          "comment": null
        },
        "ListStudentsResponse": {
          "fields": {
            "students": {
              "rule": "repeated",
              "type": "Student",
              "id": 1,
              "comment": null
            }
          },
          "comment": null
        },
        "AddStudentsRequest": {
          "fields": {
            "student": {
              "type": "Student",
              "id": 1,
              "comment": null
            }
          },
          "comment": null
        },
        "AddStudentsResponse": {
          "fields": {
            "studentId": {
              "type": "string",
              "id": 1,
              "comment": null
            }
          },
          "comment": null
        },
        "UpdateStudentsRequest": {
          "fields": {
            "student": {
              "type": "Student",
              "id": 1,
              "comment": null
            }
          },
          "comment": null
        },
        "UpdateStudentsResponse": {
          "fields": {
            "studentId": {
              "type": "string",
              "id": 1,
              "comment": null
            }
          },
          "comment": null
        },
        "DeleteStudentsRequest": {
          "fields": {
            "studentId": {
              "type": "string",
              "id": 1,
              "comment": null
            }
          },
          "comment": null
        },
        "DeleteStudentsResponse": {
          "fields": {
            "studentId": {
              "type": "string",
              "id": 1,
              "comment": null
            }
          },
          "comment": null
        },
        "Student": {
          "fields": {
            "studentId": {
              "type": "string",
              "id": 1,
              "comment": null
            },
            "studentName": {
              "type": "string",
              "id": 2,
              "comment": null
            },
            "studentAge": {
              "type": "int32",
              "id": 3,
              "comment": null
            },
            "departmentId": {
              "type": "string",
              "id": 4,
              "comment": null
            }
          },
          "comment": null
        }
      }
    }
  }
},
};