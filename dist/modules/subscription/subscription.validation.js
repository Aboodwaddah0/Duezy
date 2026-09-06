import { z } from "zod";
export const createSubscriptionSchema = z.object({
    name: z
        .string()
        .min(1, "Subscription name is required")
        .max(100, "Subscription name must be less than 100 characters"),
    provider: z
        .string()
        .max(100, "Provider name must be less than 100 characters")
        .optional(),
    price: z
        .number()
        .nonnegative("Price cannot be negative"),
    currency: z
        .string()
        .length(3, "Currency must be a 3-letter code")
        .default("USD"),
    billingCycle: z.enum(["MONTHLY", "YEARLY"]),
    renewalDate: z
        .coerce
        .date(),
    category: z
        .string()
        .max(100, "Category must be less than 100 characters")
        .optional(),
    status: z
        .enum(["ACTIVE", "CANCELLED", "PAUSED"])
        .default("ACTIVE"),
    source: z
        .enum(["MANUAL", "EMAIL"])
        .default("MANUAL"),
});
export const updateSubscriptionSchema = z.object({
    name: z
        .string()
        .min(1, "Subscription name is required")
        .max(100, "Subscription name must be less than 100 characters")
        .optional(),
    provider: z
        .string()
        .max(100, "Provider name must be less than 100 characters")
        .optional(),
    price: z
        .number()
        .nonnegative("Price cannot be negative")
        .optional(),
    currency: z
        .string()
        .length(3, "Currency must be a 3-letter code")
        .optional(),
    billingCycle: z
        .enum(["MONTHLY", "YEARLY"])
        .optional(),
    renewalDate: z
        .coerce
        .date()
        .optional(),
    category: z
        .string()
        .max(100, "Category must be less than 100 characters")
        .optional(),
    status: z
        .enum(["ACTIVE", "CANCELLED", "PAUSED"])
        .optional(),
    source: z
        .enum(["MANUAL", "EMAIL"])
        .optional(),
});
