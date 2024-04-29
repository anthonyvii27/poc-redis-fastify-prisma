import { UserService } from "@/user/user.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserRequest, CreateUserRequestSchema, UpdateUserRequest } from "@/user";

export class UserController {
    constructor(private readonly userService: UserService) {}

    public async getAllUsers(_: FastifyRequest, reply: FastifyReply) {
        const users = await this.userService.getAllUsers();
        reply.send(users);
    }

    public async getUserByID(request: FastifyRequest<{ Params: { id: string }}>, reply: FastifyReply) {
        const userId = parseInt(request.params.id);

        // TODO - Validate User ID

        const user = await this.userService.getUserByID(userId);

        return reply.send(user);
    }

    public async createUser(request: FastifyRequest<{ Body: CreateUserRequest }>, reply: FastifyReply) {
        const data = request.body;
        const { success: isValid } = CreateUserRequestSchema.safeParse(data);

        if (!isValid) {
            // TODO - Error Handler
        }

        const user = await this.userService.createUser(data);

        return reply.send(user);
    }

    public async updateUser(request: FastifyRequest<{ Params: { id: string }, Body: UpdateUserRequest }>, reply: FastifyReply) {
        const userId = parseInt(request.params.id);
        const data = request.body;

        // TODO - Validate User ID

        const user = await this.userService.updateUser(userId, data);

        return reply.send(user);
    }

    public async deleteUser(request: FastifyRequest<{ Params: { id: string }}>, reply: FastifyReply) {
        const userId = parseInt(request.params.id);

        // TODO - Validate User ID

        await this.userService.deleteUser(userId);

        return reply.code(204).send();
    }
}