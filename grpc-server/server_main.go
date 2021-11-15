package main

import (
	"flag"
	"fmt"
	"google.golang.org/grpc"
	departments "grpc-server/pb/departments.service"
	students "grpc-server/pb/students.service"
	"grpc-server/pkg/features/students/list_students"
	"net"
)

var (
	port = ":5000"
)

/*
type studentsServer struct {
	students.UnimplementedStudentsServiceServer
}
*/

type departmentsServer struct {
	departments.UnimplementedDepartmentsServiceServer
}

func main() {
	flag.Parse()
	fmt.Println("In... server...")
	myServer := grpc.NewServer()

	listen, err := net.Listen("tcp", port)
	if err != nil {
		fmt.Printf("failed to listen: %v\n", err)
		return
	}

	students.RegisterStudentsServiceServer(myServer, &list_students.StudentsServer{})
	departments.RegisterDepartmentsServiceServer(myServer, &departmentsServer{})

	fmt.Println("Running the server...")
	err1 := myServer.Serve(listen)
	if err1 != nil {
		fmt.Println("Starting the server has failed : ", err)
	}
}
