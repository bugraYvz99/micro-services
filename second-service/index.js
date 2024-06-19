const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync("./proto/service.proto", {});
const helloProto = grpc.loadPackageDefinition(packageDefinition).service;

const client = new helloProto.HelloService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.sayHello({ name: "World" }, (error, response) => {
  if (error) console.error(error);
  console.log(response.message);
});
