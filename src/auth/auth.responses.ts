import { z } from "zod";

const LoginResponseSchema = z.object({
    accessToken: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;