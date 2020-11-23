import { Request, Response, Router } from "express";
import { created, error, ok } from "../helpers/json";
import queries, { searchQuery } from "../helpers/queries";
import userSchema, { UserDocument } from "../schemas/user-schema";
import IRouter from "./router";

export default class UserRouter implements IRouter {
    router = Router();
    basePath = "/users";

    initRouter() {
        this.router.get("/", this.getAll);
        this.router.get("/:id", this.getSingle);
        this.router.post("/", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }

    private constructor() {
        this.initRouter();
    }

    private async getAll(req: Request, res: Response) {
        try {
            const filter = {
                ...queries(req).filter,
                ...searchQuery(req, [UserDocument.firstName, UserDocument.lastName, UserDocument.email]),
            };

            const users = await userSchema
                .find(filter)
                .sort(queries(req).sort)
                .skip(queries(req).skip)
                .limit(queries(req).limit);

            const usersTotal = await userSchema.countDocuments(filter);

            ok(res, { users: users, total: usersTotal });
        } catch (e: any) {
            error(res, e);
        }
    }

    private async getSingle(req: Request, res: Response) {
        try {
            const user = await userSchema.findById(req.params.id);
            ok(res, { user: user });
        } catch (e: any) {
            error(res, e);
        }
    }

    private async create(req: Request, res: Response) {
        try {
            const user = await userSchema.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
            });

            created(res, { user: user });
        } catch (e: any) {
            error(res, e);
        }
    }

    private async update(req: Request, res: Response) {
        try {
            const user = await userSchema.findByIdAndUpdate(
                req.params.id,
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                },
                { new: true }
            );

            ok(res, { user: user });
        } catch (e: any) {
            error(res, e);
        }
    }

    private async delete(req: Request, res: Response) {
        try {
            const user = await userSchema.findByIdAndDelete(req.params.id);
            ok(res, { user: user });
        } catch (e: any) {
            error(res, e);
        }
    }
}
