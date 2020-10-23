import { Request, Response } from "express";
import userSchema from "../schema/user-schema";
import BaseService from "./base-service";
import faker from "faker";
import activitySchema from "../schema/activity-schema";

export default class SeedService extends BaseService {
    constructor(req: Request, res: Response) {
        super(req, res);
    }

    async perform() {
        try {
            const userToSeedsTotal = 150;
            const activityToSeedsTotal = 3454;
            const seedsTotal = userToSeedsTotal + activityToSeedsTotal;

            for (let i = 0; i < userToSeedsTotal; i++) {
                await userSchema.create({
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    email: i + "_" + faker.internet.email(),
                });
            }

            for (let i = 0; i < activityToSeedsTotal; i++) {
                const randUser = (await userSchema.find())[Math.floor(Math.random() * userToSeedsTotal)];

                await activitySchema.create({
                    name: faker.lorem.lines(),
                    userId: randUser._id,
                });
            }

            this.jsonCreated({ seedsTotal: seedsTotal });
        } catch (e: any) {
            this.jsonError(e);
        }
    }
}
