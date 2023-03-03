import fastify from "fastify";
import { knexConfig } from "./knexConfig";
import fastifyObjection from "fastify-objectionjs";
import mercurius from "mercurius";
import { schema } from "./src/schemas";

const server = fastify();

server.register(fastifyObjection, {
  knexConfig,
});
server.register(mercurius, {
  schema,
});

server.listen({ port: Number(process.env.PORT || 8080), host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
