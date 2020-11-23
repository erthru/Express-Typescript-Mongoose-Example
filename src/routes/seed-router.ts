import { Request, Response, Router } from "express";
import userSchema from "../schemas/user-schema";
import faker from "faker";
import activitySchema from "../schemas/activity-schema";
import { error, ok } from "../helpers/json";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
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
});

export default {
    path: "/seeds",
    router: router,
};
