import { z } from "zod";

const LoginRequestSchema = z.object({
    email: z
        .string({
            required_error: "E-mail is required",
            invalid_type_error: "E-mail must be a string"
        })
        .email(),
    password: z.string().min(6),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;