import fastify from "fastify";
import { env } from "@/env";
import { UserController, UserRepository, UserRoutes, UserService } from "@/user";
import { PrismaClient } from "@prisma/client";

const app = fastify({
    logger: true
});
const prismaClient = new PrismaClient();

const userRepository = new UserRepository(prismaClient);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

app.register(app => UserRoutes(app, userController));

app.listen({ port: env.PORT, host: "0.0.0.0" }, (err) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
});