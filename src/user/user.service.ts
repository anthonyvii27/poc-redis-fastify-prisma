import { UserRepository } from "@/user";
import { CreateUser, UpdateUser } from "@/user/user.requests";

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    public async getAllUsers() {
        return this.userRepository.getAllUsers();
    }

    public async getUserByID(id: number) {
        return this.userRepository.getUserByID(id);
    }

    public async createUser({ ...user }: CreateUser) {
        return this.userRepository.createUser(user);
    }

    public async updateUser(id: number, { ...user }: UpdateUser) {
        return this.userRepository.updateUser(id, user);
    }

    public async deleteUser(id: number) {
        return this.userRepository.deleteUser(id);
    }
}