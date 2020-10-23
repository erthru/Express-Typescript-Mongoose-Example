import { Request, Response } from "express";
import BaseService from "./base-service";
import activitySchema, { ActivityDocument } from "../schema/activity-schema";
import { UserDocument } from "../schema/user-schema";

export default class ActivityService extends BaseService {
    constructor(req: Request, res: Response) {
        super(req, res);
    }

    async get() {
        try {
            const filter = {
                ...this.filterQuery,
                ...this.searchQuery([ActivityDocument.name]),
            };

            const activities = await activitySchema
                .find(filter)
                .sort(this.sortQuery)
                .skip(this.skipNumber)
                .limit(this.limitQuery)
                .populate(UserDocument.schemaName);

            const activitiesTotal = await activitySchema.countDocuments(filter);

            this.jsonOK({ activities: activities, total: activitiesTotal });
        } catch (e: any) {
            this.jsonError(e);
        }
    }

    async getSingle() {
        try {
            const activity = await activitySchema.findById(this._idFromParams).populate(UserDocument.schemaName);
            this.jsonOK({ activity: activity });
        } catch (e: any) {
            this.jsonError(e);
        }
    }

    async add() {
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

    async remove() {
        try {
            const activity = await activitySchema.findByIdAndDelete(this._idFromParams);
            this.jsonOK({ activity: activity });
        } catch (e: any) {
            this.jsonError(e);
        }
    }
}
