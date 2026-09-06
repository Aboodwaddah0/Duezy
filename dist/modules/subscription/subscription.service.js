import prisma from "../../lib/prisma.js";
export const createSubscription = async (param) => {
    return prisma.subscription.create({
        data: {
            ...param,
        },
    });
};
