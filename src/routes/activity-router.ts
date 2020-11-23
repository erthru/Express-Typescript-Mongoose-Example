import { Request, Response, Router } from "express";
import { created, error, ok } from "../helpers/json";
import queries, { searchQuery } from "../helpers/queries";
import activitySchema, { ActivityDocument } from "../schemas/activity-schema";
import { UserDocument } from "../schemas/user-schema";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const filter = {
            ...queries(req).filter,
            ...searchQuery(req, [ActivityDocument.name]),
        };

        const activities = await activitySchema
            .find(filter)
            .sort(queries(req).sort)
            .skip(queries(req).skip)
            .limit(queries(req).limit)
            .populate(UserDocument.schemaName);

        const activitiesTotal = await activitySchema.countDocuments(filter);

        ok(res, { activities: activities, total: activitiesTotal });
    } catch (e: any) {
        error(res, e);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const activity = await activitySchema.findById(req.params.id).populate(UserDocument.schemaName);
        ok(res, { activity: activity });
    } catch (e: any) {
        error(res, e);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const activity = await activitySchema.create({
            name: req.body.name,
            userId: req.body.userId,
        });

        created(res, { activity: activity });
    } catch (e: any) {
        error(res, e);
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const activity = await activitySchema.findByIdAndDelete(req.params.id);
        ok(res, { activity: activity });
    } catch (e: any) {
        error(res, e);
    }
});

export default {
    path: "/activities",
    router: router,
};
