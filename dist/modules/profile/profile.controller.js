import { createProfile, deleteProfile, getProfileById, listProfiles, searchProfiles, updateProfile, } from "./profile.service.js";
import { createProfileSchema, updateProfileSchema, } from "./profile.validation.js";
const getUserId = (req) => {
    const userId = req.params.userId;
    return Array.isArray(userId) ? userId[0] : userId;
};
export const create = async (req, res, next) => {
    const result = createProfileSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: "Invalid profile data",
            errors: result.error.issues,
        });
    }
    try {
        const profile = await createProfile(getUserId(req), result.data);
        return res.status(201).json(profile);
    }
    catch (error) {
        return next(error);
    }
};
export const getById = async (req, res, next) => {
    try {
        const profile = await getProfileById(getUserId(req));
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        return res.json(profile);
    }
    catch (error) {
        return next(error);
    }
};
export const list = async (req, res, next) => {
    try {
        const search = typeof req.query.search === "string"
            ? req.query.search.trim()
            : "";
        const profiles = search
            ? await searchProfiles(search)
            : await listProfiles();
        return res.json(profiles);
    }
    catch (error) {
        return next(error);
    }
};
export const update = async (req, res, next) => {
    const result = updateProfileSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: "Invalid profile data",
            errors: result.error.issues,
        });
    }
    try {
        const profile = await updateProfile(getUserId(req), result.data);
        return res.json(profile);
    }
    catch (error) {
        return next(error);
    }
};
export const remove = async (req, res, next) => {
    try {
        await deleteProfile(getUserId(req));
        return res.status(204).send();
    }
    catch (error) {
        return next(error);
    }
};
