import { z } from "zod";
import { UserSchema } from "@/user/user.model";

const CreateUserSchema = UserSchema.pick({
    name: true,
    email: true
});

export type CreateUser = z.infer<typeof CreateUserSchema>;

const UpdateUserSchema = UserSchema.pick({
    name: true,
    email: true
});

export type UpdateUser = z.infer<typeof UpdateUserSchema>;

export { CreateUserSchema, UpdateUserSchema };