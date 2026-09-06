import type { NextFunction, Request, Response } from "express";
import {
	createSubscription,
	deleteSubscription,
	getSubscriptionById,
	getUserSubscriptions,
	updateSubscription,
} from "./subscription.service.js";
import {
	createSubscriptionSchema,
	updateSubscriptionSchema,
} from "./subscription.validation.js";

const getParam = (req: Request, name: string): string => {
	const value = req.params[name];
	return Array.isArray(value) ? value[0] : value;
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
	const result = createSubscriptionSchema.safeParse(req.body);

	if (!result.success) {
		return res.status(400).json({
			message: "Invalid subscription data",
			errors: result.error.issues,
		});
	}

	try {
		const subscription = await createSubscription(getParam(req, "userId"), result.data);
		return res.status(201).json(subscription);
	} catch (error) {
		return next(error);
	}
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.json(await getUserSubscriptions(getParam(req, "userId")));
	} catch (error) {
		return next(error);
	}
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const subscription = await getSubscriptionById(
			getParam(req, "userId"),
			getParam(req, "subscriptionId")
		);

		if (!subscription) {
			return res.status(404).json({ message: "Subscription not found" });
		}

		return res.json(subscription);
	} catch (error) {
		return next(error);
	}
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
	const result = updateSubscriptionSchema.safeParse(req.body);

	if (!result.success) {
		return res.status(400).json({
			message: "Invalid subscription data",
			errors: result.error.issues,
		});
	}

	try {
		const subscription = await updateSubscription(
			getParam(req, "userId"),
			getParam(req, "subscriptionId"),
			result.data
		);
		return res.json(subscription);
	} catch (error) {
		return next(error);
	}
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await deleteSubscription(
			getParam(req, "userId"),
			getParam(req, "subscriptionId")
		);
		return res.status(204).send();
	} catch (error) {
		return next(error);
	}
};
