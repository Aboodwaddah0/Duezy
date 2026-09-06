import prisma from "../../lib/prisma.js";
export const createProfile = async (userId, param) => {
    return prisma.profile.create({
        data: {
            userId,
            ...param,
        },
    });
};
export const getProfileById = async (userId) => {
    return prisma.profile.findUnique({
        where: {
            userId,
        },
    });
};
export const updateProfile = async (userId, param) => {
    return prisma.profile.update({
        where: {
            userId,
        },
        data: {
            ...param,
        },
    });
};
export const deleteProfile = async (userId) => {
    return prisma.profile.delete({
        where: {
            userId,
        },
    });
};
export const searchProfiles = async (search) => {
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
