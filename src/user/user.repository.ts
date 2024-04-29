import { PrismaClient } from "@prisma/client";
import { CreateUserRequest, UpdateUserRequest } from "@/user/user.requests";

export class UserRepository {
    constructor(private readonly prismaClient: PrismaClient) {}

    public async getAllUsers() {
        return this.prismaClient.user.findMany();
    }

    public async getUserByID(id: number) {
        return this.prismaClient.user.findFirst({
            where: {
                id
            }
        })
    }

    public async createUser({ ...user }: CreateUserRequest) {
        return this.prismaClient.user.create({
            data: user
        });
    }

    public async updateUser(id: number, { ...user }: UpdateUserRequest) {
        return this.prismaClient.user.update({
            where: {
                id
            },
            data: user
        });
    }

    public async deleteUser(id: number) {
        await this.prismaClient.user.delete({
            where: {
                id
            }
        });
    }
}