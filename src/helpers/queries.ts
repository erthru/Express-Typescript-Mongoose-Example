import { Request } from "express";
import { isEmpty, splice } from "./basic-tools";

type Queries = {
    page: number;
    limit: number;
    skip: number;
    filter: any;
    sort: any;
};

const queryToObject = (query: string): any => {
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
};

export const searchQuery = (req: Request, fields: Array<string>): any => {
    const filter: any = {};

    if (fields.length > 0 && !isEmpty(req.query.search)) {
        filter.$or = [] as Array<any>;

        fields.map((field) => {
            filter.$or.push({
                [field]: {
                    $regex: req.query.search,
                    $options: "i",
                },
            });
        });
    }

    return filter;
};

export default (req: Request): Queries => {
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    const skip = (parseInt(req.query.page as string) - 1) * parseInt(req.query.limit as string);
    const filter = queryToObject(req.query.filter as string);
    const sort = queryToObject(req.query.sort as string);

    return {
        page: page,
        limit: limit,
        skip: skip,
        filter: filter,
        sort: sort,
    };
};
