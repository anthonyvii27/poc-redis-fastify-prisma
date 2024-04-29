import { UserService } from "@/user/user.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserRequest, CreateUserRequestSchema, UpdateUserRequest } from "@/user";
import {
    CreateUserResponse,
    GetAllUsersResponse,
    GetUserByIDResponse,
    UpdateUserResponse
} from "@/user/user.responses";

export class UserController {
    constructor(private readonly userService: UserService) {}

    public async getAllUsers(_: FastifyRequest, reply: FastifyReply): Promise<void> {
        const users: GetAllUsersResponse = await this.userService.getAllUsers();
        reply.send(users);
    }

    public async getUserByID(request: FastifyRequest<{ Params: { id: string }}>, reply: FastifyReply): Promise<void> {
        const userId = parseInt(request.params.id);

        // TODO - Validate User ID

        const user: GetUserByIDResponse = await this.userService.getUserByID(userId);

        return reply.send(user);
    }

    public async createUser(request: FastifyRequest<{ Body: CreateUserRequest }>, reply: FastifyReply): Promise<void> {
        const data = request.body;
        const { success: isValid } = CreateUserRequestSchema.safeParse(data);

        if (!isValid) {
            // TODO - Error Handler
        }

        const createdUser: CreateUserResponse = await this.userService.createUser(data);

        return reply.send(createdUser);
    }

    public async updateUser(request: FastifyRequest<{ Params: { id: string }, Body: UpdateUserRequest }>, reply: FastifyReply): Promise<void> {
        const userId = parseInt(request.params.id);
        const data = request.body;

        // TODO - Validate User ID

        const updatedUser: UpdateUserResponse = await this.userService.updateUser(userId, data);

        return reply.send(updatedUser);
    }

    public async deleteUser(request: FastifyRequest<{ Params: { id: string }}>, reply: FastifyReply): Promise<void> {
        const userId = parseInt(request.params.id);

        // TODO - Validate User ID

        await this.userService.deleteUser(userId);

        return reply.code(204).send();
    }
}