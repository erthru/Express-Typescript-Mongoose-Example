import { RouterDelete, RouterGet, RouterPost, RouterPut, RouterRoot } from "../decorators/router-decorator";
import userSchema, { UserDocument } from "../schemas/user-schema";
import BaseRouter from "./base-router";
import { Request, Response } from "express";

@RouterRoot("/users")
export default class UserRouter extends BaseRouter {
    constructor(req: Request, res: Response) {
        super(req, res);
    }

    @RouterGet("/")
    async getAll() {
        try {
            const filter = {
                ...this.filterQuery,
                ...this.searchQuery([UserDocument.firstName, UserDocument.lastName, UserDocument.email]),
            };

            const users = await userSchema.find(filter).sort(this.sortQuery).skip(this.skipNumber).limit(this.limitNumber);
            const usersTotal = await userSchema.countDocuments(filter);

            this.jsonOK({ users: users, total: usersTotal });
        } catch (e: any) {
            this.jsonError(e);
        }
    }

    @RouterGet("/:id")
    async getSingle() {
        try {
            const user = await userSchema.findById(this.req.params.id);
            this.jsonOK({ user: user });
        } catch (e: any) {
            this.jsonError(e);
        }
    }

    @RouterPost("/")
    async create() {
        try {
            const user = await userSchema.create({
                firstName: this.req.body.firstName,
                lastName: this.req.body.lastName,
                email: this.req.body.email,
            });

            this.jsonCreated({ user: user });
        } catch (e: any) {
            this.jsonError(e);
        }
    }

    @RouterPut("/:id")
    async update() {
        try {
            const user = await userSchema.findByIdAndUpdate(
                this.req.params.id,
                {
                    firstName: this.req.body.firstName,
                    lastName: this.req.body.lastName,
                    email: this.req.body.email,
                },
                { new: true }
            );

            this.jsonOK({ user: user });
        } catch (e: any) {
            this.jsonError(e);
        }
    }

    @RouterDelete("/:id")
    async delete() {
        try {
            const user = await userSchema.findByIdAndDelete(this.req.params.id);
            this.jsonOK({ user: user });
        } catch (e: any) {
            this.jsonError(e);
        }
    }
}
