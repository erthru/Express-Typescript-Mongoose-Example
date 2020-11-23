import { Request, Response, Router } from "express";
import userSchema from "../schemas/user-schema";
import IRouter from "./router";
import faker from "faker";
import activitySchema from "../schemas/activity-schema";
import { error, ok } from "../helpers/json";

export default class SeedRouter implements IRouter {
    router = Router();
    basePath = "/seeds";

    initRouter() {
        this.router.post("/", this.perform);
    }

    private constructor() {
        this.initRouter();
    }

    private async perform(_: Request, res: Response) {
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

            ok(res, { seedsTotal: seedsTotal });
        } catch (e: any) {
            error(res, e);
        }
    }
}
