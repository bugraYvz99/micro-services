const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync("./proto/service.proto", {});
const helloProto = grpc.loadPackageDefinition(packageDefinition).service;

const server = new grpc.Server();

server.addService(helloProto.HelloService.service, {
  sayHello: (call, callback) => {
    const response = {
      message: `hello from first service to, ${call.request.name}!`,
    };
    callback(null, response);
  },
});

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("First microservice running on port 50051");
    server.start();
  }
);
