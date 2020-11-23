import { RouterPost, RouterRoot } from "../decorators/router-decorator";
import userSchema from "../schemas/user-schema";
import BaseRouter from "./base-router";
import faker from "faker";
import activitySchema from "../schemas/activity-schema";
import { Request, Response } from "express";

@RouterRoot("/seeds")
export default class SeedRouter extends BaseRouter {
    constructor(req: Request, res: Response) {
        super(req, res);
    }

    @RouterPost("/")
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
