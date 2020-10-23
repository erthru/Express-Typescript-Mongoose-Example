import { Response, Request, Router } from "express";
import SeedService from "./services/seed-service";
import UserService from "./services/user-service";
import ActivityService from "./services/activity-service";

const router = Router();

router.post("/seeds", (req: Request, res: Response) => new SeedService(req, res).perform());

router.get("/users", (req: Request, res: Response) => new UserService(req, res).get());
router.get("/user/:id", (req: Request, res: Response) => new UserService(req, res).getSingle());
router.post("/user", (req: Request, res: Response) => new UserService(req, res).add());
router.put("/user/:id", (req: Request, res: Response) => new UserService(req, res).update());
router.delete("/user/:id", (req: Request, res: Response) => new UserService(req, res).remove());

router.get("/activities", (req: Request, res: Response) => new ActivityService(req, res).get());
router.get("/activity/:id", (req: Request, res: Response) => new ActivityService(req, res).getSingle());
router.post("/activity", (req: Request, res: Response) => new ActivityService(req, res).add());
router.delete("/activity/:id", (req: Request, res: Response) => new ActivityService(req, res).remove());

export default router;
