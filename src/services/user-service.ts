import { Request, Response } from "express";
import userSchema, { UserDocument } from "../schemas/user-schema";
import BaseService from "./base-service";

export default class UserService extends BaseService {
    constructor(req: Request, res: Response) {
        super(req, res);
    }

    async get() {
        try {
            const filter = {
                ...this.filterQuery,
                ...this.searchQuery([UserDocument.firstName, UserDocument.lastName, UserDocument.email]),
            };

            const users = await userSchema.find(filter).sort(this.sortQuery).skip(this.skipNumber).limit(this.limitQuery);
            const usersTotal = await userSchema.countDocuments(filter);

            this.jsonOK({ users: users, total: usersTotal });
        } catch (e: any) {
            this.jsonError(e);
        }
    }

    async getSingle() {
        try {
            const user = await userSchema.findById(this._idFromParams);
            this.jsonOK({ user: user });
        } catch (e: any) {
            this.jsonError(e);
        }
    }

    async add() {
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

    async update() {
        try {
            const user = await userSchema.findByIdAndUpdate(
                this._idFromParams,
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

    async remove() {
        try {
            const user = await userSchema.findByIdAndDelete(this._idFromParams);
            this.jsonOK({ user: user });
        } catch (e: any) {
            this.jsonError(e);
        }
    }
}
