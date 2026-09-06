import prisma from "../../lib/prisma.js";
export const createSubscription = async (userId, param) => {
    return prisma.subscription.create({
        data: {
            userId,
            ...param,
        },
    });
};
export const getUserSubscriptions = async (userId) => {
    return prisma.subscription.findMany({
        where: {
            userId,
        },
        orderBy: {
            renewalDate: "asc",
        },
    });
};
export const getSubscriptionById = async (userId, subscriptionId) => {
    return prisma.subscription.findFirst({
        where: {
            id: subscriptionId,
            userId,
        },
    });
};
export const updateSubscription = async (userId, subscriptionId, param) => {
    const subscription = await prisma.subscription.findFirst({
        where: {
            id: subscriptionId,
            userId,
        },
    });
    if (!subscription) {
        throw new Error("Subscription not found");
    }
    return prisma.subscription.update({
        where: {
            id: subscriptionId,
        },
        data: {
            ...param,
        },
    });
};
export const deleteSubscription = async (userId, subscriptionId) => {
    const subscription = await prisma.subscription.findFirst({
        where: {
            id: subscriptionId,
            userId,
        },
    });
    if (!subscription) {
        throw new Error("Subscription not found");
    }
    return prisma.subscription.delete({
        where: {
            id: subscriptionId,
        },
    });
};
