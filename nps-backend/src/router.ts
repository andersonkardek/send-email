import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { SurveysController } from "./controllers/SurveysController";

export const router = Router();

router.post("/users", new UserController().create);
router.post("/surveys", new SurveysController().create);
