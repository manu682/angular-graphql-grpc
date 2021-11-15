package main

import (
	"context"
	"flag"
	"fmt"
	"google.golang.org/grpc"
	students "grpc-server/pb/students.service"
	"time"
)

var (
	serverAddr = flag.String("server_addr", "127.0.0.1:5000", "The server address in the format of host:port")
)

func main() {
	fmt.Println("In.... client...")
	flag.Parse()
	var opts []grpc.DialOption
	opts = append(opts, grpc.WithInsecure())
	conn, err := grpc.Dial(*serverAddr, opts...)
	if err != nil {
		fmt.Println("fail to dial: ", err)
	}
	defer conn.Close()

	client := students.NewStudentsServiceClient(conn)
	getStudentsList(client, &students.ListStudentsRequest{})
}

func getStudentsList(client students.StudentsServiceClient, input *students.ListStudentsRequest) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	output, err := client.ListStudents(ctx, input)
	if err != nil {
		fmt.Println("Error : ", client, err)
	}
	fmt.Println(output)
}
