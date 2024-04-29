import { FastifyInstance } from "fastify";
import { z } from "zod";

import { UserController } from "@/user/user.controller";
import { UserModel } from "@/user/user.model";
import { CreateUserRequestSchema, UpdateUserRequestSchema, RequiredUserIDSchema } from "@/user/user.requests";

const UserRoutes = async (client: FastifyInstance, userController: UserController) => {
    client.route({
        method: "GET",
        url: "/",
        schema: {
            response: {
                200: UserModel,
            }
        },
        handler: userController.getAllUsers.bind(userController),
    });

    client.route({
        method: "GET",
        url: "/:id",
        schema: {
            params: RequiredUserIDSchema,
            response: {
                200: UserModel,
            }
        },
        handler: userController.getUserByID.bind(userController),
    });

    client.route({
        method: "POST",
        url: "/",
        schema: {
            body: CreateUserRequestSchema,
            response: {
                200: UserModel,
            },
        },
        handler: userController.createUser.bind(userController),
    });

    client.route({
        method: "PUT",
        url: "/:id",
        schema: {
            params: RequiredUserIDSchema,
            body: UpdateUserRequestSchema,
            response: {
                200: UserModel,
            },
        },
        handler: userController.updateUser.bind(userController),
    });

    client.route({
        method: "DELETE",
        url: "/:id",
        schema: {
            params: RequiredUserIDSchema,
            response: {
                204: z.null().describe("No content"),
            }
        },
        handler: userController.deleteUser.bind(userController),
    });

    client.log.info("User routes registered");
}

export { UserRoutes };