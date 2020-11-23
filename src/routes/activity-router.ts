import { Request, Response } from "express";
import { RouterDelete, RouterGet, RouterPost, RouterRoot } from "../decorators/router-decorator";
import activitySchema, { ActivityDocument } from "../schemas/activity-schema";
import { UserDocument } from "../schemas/user-schema";
import BaseRouter from "./base-router";

@RouterRoot("/activities")
export default class ActivityRouter extends BaseRouter {
    constructor(req: Request, res: Response) {
        super(req, res);
    }

    @RouterGet("/")
    async getAll() {
        try {
            const filter = {
                ...this.filterQuery,
                ...this.searchQuery([ActivityDocument.name]),
            };

            const activities = await activitySchema
                .find(filter)
                .sort(this.sortQuery)
                .skip(this.skipNumber)
                .limit(this.limitNumber)
                .populate(UserDocument.schemaName);

            const activitiesTotal = await activitySchema.countDocuments(filter);

            this.jsonOK({ activities: activities, total: activitiesTotal });
        } catch (e: any) {
            this.jsonError(e);
        }
    }

    @RouterGet("/:id")
    async getSingle() {
        try {
            const activity = await activitySchema.findById(this.req.params.id).populate(UserDocument.schemaName);
            this.jsonOK({ activity: activity });
        } catch (e: any) {
            this.jsonError(e);
        }
    }

    @RouterPost("/")
    async create() {
        try {
            const activity = await activitySchema.create({
                name: this.req.body.name,
                userId: this.req.body.userId,
            });

            this.jsonCreated({ activity: activity });
        } catch (e: any) {
            this.jsonError(e);
        }
    }

    @RouterDelete("/:id")
    async delete() {
        try {
            const activity = await activitySchema.findByIdAndDelete(this.req.params.id);
            this.jsonOK({ activity: activity });
        } catch (e: any) {
            this.jsonError(e);
        }
    }
}
