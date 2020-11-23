import { Request, Response } from "express";
import { isEmpty, splice } from "../helpers/basic-tools";

export default class BaseRouter {
    protected req!: Request;
    protected res!: Response;
    protected pageNumber!: number;
    protected limitNumber!: number;
    protected skipNumber!: number;
    protected filterQuery!: any;
    protected sortQuery!: any;

    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
        this.pageNumber = parseInt(this.req.query.page as string);
        this.limitNumber = parseInt(this.req.query.limit as string);
        this.skipNumber = (parseInt(this.req.query.page as string) - 1) * parseInt(this.req.query.limit as string);
        this.filterQuery = this.queryToObject(this.req.query.filter as string);
        this.sortQuery = this.queryToObject(this.req.query.sort as string);
    }

    protected jsonOK(data: any) {
        this.res.status(200).json({
            error: 0,
            message: "ok",
            ...data,
        });
    }

    protected jsonCreated(data: any) {
        this.res.status(201).json({
            error: 0,
            message: "created",
            ...data,
        });
    }

    protected jsonError(error: any) {
        this.res.status(500).json({
            error: 0,
            message: error.message,
        });
    }

    protected jsonUnauthorized() {
        this.res.status(401).json({
            error: 0,
            message: "unauthorized",
        });
    }

    protected searchQuery(fields: Array<string>): any {
        const filter: any = {};

        if (fields.length > 0 && !isEmpty(this.req.query.search)) {
            filter.$or = [] as Array<any>;

            fields.map((field) => {
                filter.$or.push({
                    [field]: {
                        $regex: this.req.query.search,
                        $options: "i",
                    },
                });
            });
        }

        return filter;
    }

    private queryToObject(query: string): Object {
        try {
            let queryArr = query.split(",");
            let queryFix = "";

            queryArr.map((query) => {
                let queryX = '"' + query;
                let idx = 0;

                for (let i = 0; i < queryX.length; i++) {
                    if (queryX[i] === ":") {
                        idx = i;
                        break;
                    }
                }

                queryX = splice(queryX, idx, 0, '"');
                queryFix += queryX + ",";
            });

            queryFix = queryFix.slice(0, -1);
            queryFix = "{" + queryFix + "}";

            return JSON.parse(queryFix);
        } catch (err) {
            return JSON.parse("{}");
        }
    }
}
