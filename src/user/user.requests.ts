import { z } from "zod";
import { UserModel } from "@/user/user.model";

const CreateUserRequestSchema = UserModel.pick({
    name: true,
    email: true,
    password: true,
});

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;

const UpdateUserRequestSchema = UserModel.pick({
    name: true,
    email: true
});

export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>;

const RequiredUserIDSchema = z.object({
    id: z.string(),
});

export { CreateUserRequestSchema, UpdateUserRequestSchema, RequiredUserIDSchema };