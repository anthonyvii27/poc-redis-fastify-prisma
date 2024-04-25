import { z } from "zod";

const UserSchema = z.object({
    id: z.number(),
    name: z.string().max(100),
    email: z.string().max(50),
    created_at: z.date()
});

export type User = z.infer<typeof UserSchema>;

export { UserSchema };

