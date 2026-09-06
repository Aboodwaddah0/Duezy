import prisma from "../../lib/prisma.js";
import {
  CreateSubscriptionInput,
  UpdateSubscriptionInput,
} from "./subscription.validation.js";

export const createSubscription = async (
  userId: string,
  param: CreateSubscriptionInput
) => {
  return prisma.subscription.create({
    data: {
      userId,
      ...param,
    },
  });
};

export const getUserSubscriptions = async (userId: string) => {
  return prisma.subscription.findMany({
    where: {
      userId,
    },
    orderBy: {
      renewalDate: "asc",
    },
  });
};

export const getSubscriptionById = async (
  userId: string,
  subscriptionId: string
) => {
  return prisma.subscription.findFirst({
    where: {
      id: subscriptionId,
      userId,
    },
  });
};

export const updateSubscription = async (
  userId: string,
  subscriptionId: string,
  param: UpdateSubscriptionInput
) => {
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

export const deleteSubscription = async (
  userId: string,
  subscriptionId: string
) => {
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