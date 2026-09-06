import { z } from "zod";
export const createProfileSchema = z.object({
    fullName: z
        .string()
        .min(2, "Full name must be at least 2 characters")
        .max(100, "Full name must be less than 100 characters")
        .optional(),
    avatarUrl: z
        .string()
        .url("Invalid avatar URL")
        .optional(),
});
export const updateProfileSchema = z.object({
    fullName: z
        .string()
        .min(2, "Full name must be at least 2 characters")
        .max(100, "Full name must be less than 100 characters")
        .optional(),
    avatarUrl: z
        .string()
        .url("Invalid avatar URL")
        .optional(),
});
