import { FastifyInstance } from "fastify";
import { UserController } from "@/user/user.controller";

const UserRoutes = async (client: FastifyInstance, userController: UserController) => {
    client.get("/users", userController.getAllUsers.bind(userController));
    client.get("/users/:id", userController.getUserByID.bind(userController));
    client.post("/users", userController.createUser.bind(userController));
    client.put("/users/:id", userController.updateUser.bind(userController));
    client.delete("/users/:id", userController.deleteUser.bind(userController));
}

export { UserRoutes };