import { z } from "zod";
import { UserModel } from "@/user/user.model";

const GetAllUsersResponseSchema = z.array(UserModel.omit({ password: true }));
export type GetAllUsersResponse = z.infer<typeof GetAllUsersResponseSchema>;

const GetUserByIDResponseSchema = UserModel.omit({ password: true });
export type GetUserByIDResponse = z.infer<typeof GetUserByIDResponseSchema> | null;

const CreateUserResponseSchema = UserModel.omit({ password: true });
export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>;

const UpdateUserResponseSchema = UserModel.omit({ password: true });
export type UpdateUserResponse = z.infer<typeof UpdateUserResponseSchema>;

export { GetAllUsersResponseSchema, GetUserByIDResponseSchema, CreateUserResponseSchema, UpdateUserResponseSchema };