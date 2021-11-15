package students

import "context"
import students "grpc-server/pb/students.service"

type Server struct {
	students.UnimplementedStudentsServiceServer
}

func (s *Server) ListStudents(ctx context.Context, input *students.ListStudentsRequest) (*students.ListStudentsResponse, error) {
	student := students.Student{
		StudentId:   "1",
		StudentAge:  25,
		StudentName: "Richard",
	}

	studentsList := []*students.Student{&student}

	return &students.ListStudentsResponse{Students: studentsList}, nil
}
