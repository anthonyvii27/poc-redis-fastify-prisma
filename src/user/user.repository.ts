import { PrismaClient } from "@prisma/client";
import { CreateUserRequest, UpdateUserRequest } from "@/user/user.requests";
import {
    CreateUserResponse,
    GetAllUsersResponse,
    GetUserByIDResponse,
    UpdateUserResponse
} from "@/user/user.responses";

export class UserRepository {
    constructor(private readonly prismaClient: PrismaClient) {}

    public async getAllUsers(): Promise<GetAllUsersResponse> {
        return this.prismaClient.user.findMany();
    }

    public async getUserByID(id: number): Promise<GetUserByIDResponse> {
        return this.prismaClient.user.findFirst({
            where: {
                id
            }
        })
    }

    public async createUser({ ...user }: CreateUserRequest): Promise<CreateUserResponse> {
        return this.prismaClient.user.create({
            data: user
        });
    }

    public async updateUser(id: number, { ...user }: UpdateUserRequest): Promise<UpdateUserResponse> {
        return this.prismaClient.user.update({
            where: {
                id
            },
            data: user
        });
    }

    public async deleteUser(id: number): Promise<void> {
        await this.prismaClient.user.delete({
            where: {
                id
            }
        });
    }
}