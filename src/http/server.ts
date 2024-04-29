import fastify, { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";

import { env } from "@/env";
import { UserController, UserRepository, UserRoutes, UserService } from "@/user";

const app: FastifyInstance = fastify({
    logger: true
});
const prismaClient = new PrismaClient();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

const userRepository = new UserRepository(prismaClient);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

app.get("/healthcheck", (_, reply) => reply.send({ message: "Success" }));
app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "POC Redis | Prisma | Fastify",
            description: "Sample backend service created with Fastify and Typescript, Prisma (with PostgreSQL) and Redis",
            version: "1.0.0",
        },
        servers: [],
    },
    transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUI, {
    routePrefix: '/documentation',
});

app.after(() => {
    app.withTypeProvider<ZodTypeProvider>().register(app =>
        UserRoutes(app, userController), { prefix: "/api/v1/users" }
    );
});

async function main(): Promise<void> {
    await app.ready();

    const listeners = ["SIGINT", "SIGTERM"];
    listeners.forEach(signal => {
        process.on(signal, async (): Promise<void> => {
            await app.close();
            process.exit(0);
        });
    });

    app.listen({
        port: env.PORT,
        host: "0.0.0.0"
    }, (err) => {
        if (err) {
            app.log.error(err);
            process.exit(1);
        }
    });
}

main();