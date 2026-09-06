import prisma from "../../lib/prisma.js";
import {
  CreateProfileInput,
  UpdateProfileInput,
} from "./profile.validation.js";

export const createProfile = async (
  userId: string,
  param: CreateProfileInput
) => {
  return prisma.profile.create({
    data: {
      userId,
      ...param,
    },
  });
};

export const getProfileById = async (userId: string) => {
  return prisma.profile.findUnique({
    where: {
      userId,
    },
  });
};

export const updateProfile = async (
  userId: string,
  param: UpdateProfileInput
) => {
  return prisma.profile.update({
    where: {
      userId,
    },
    data: {
      ...param,
    },
  });
};

export const deleteProfile = async (userId: string) => {
  return prisma.profile.delete({
    where: {
      userId,
    },
  });
};

export const searchProfiles = async (search: string) => {
  return prisma.profile.findMany({
    where: {
      fullName: {
        contains: search,
        mode: "insensitive",
      },
    },
  });
};

export const listProfiles = async () => {
  return prisma.profile.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};