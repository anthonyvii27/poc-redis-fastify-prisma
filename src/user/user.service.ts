import { UserRepository } from "@/user";
import { CreateUserRequest, UpdateUserRequest } from "@/user/user.requests";

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    public async getAllUsers() {
        return this.userRepository.getAllUsers();
    }

    public async getUserByID(id: number) {
        return this.userRepository.getUserByID(id);
    }

    public async createUser({ ...user }: CreateUserRequest) {
        return this.userRepository.createUser(user);
    }

    public async updateUser(id: number, { ...user }: UpdateUserRequest) {
        return this.userRepository.updateUser(id, user);
    }

    public async deleteUser(id: number) {
        return this.userRepository.deleteUser(id);
    }
}