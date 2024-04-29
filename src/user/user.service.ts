import { UserRepository } from "@/user";
import { CreateUserRequest, UpdateUserRequest } from "@/user/user.requests";
import {
    CreateUserResponse,
    GetAllUsersResponse,
    GetUserByIDResponse,
    UpdateUserResponse
} from "@/user/user.responses";

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    public async getAllUsers(): Promise<GetAllUsersResponse> {
        return this.userRepository.getAllUsers();
    }

    public async getUserByID(id: number): Promise<GetUserByIDResponse> {
        return this.userRepository.getUserByID(id);
    }

    public async createUser({ ...user }: CreateUserRequest): Promise<CreateUserResponse> {
        return this.userRepository.createUser(user);
    }

    public async updateUser(id: number, { ...user }: UpdateUserRequest): Promise<UpdateUserResponse> {
        return this.userRepository.updateUser(id, user);
    }

    public async deleteUser(id: number): Promise<void> {
        return this.userRepository.deleteUser(id);
    }
}