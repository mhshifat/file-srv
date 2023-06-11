import { Router } from "express";
import { FileController } from "./controller";
import { catchAsyncHandler } from "../../../middlewares";

const controller = new FileController();
export const FileRouter = Router();

FileRouter.route('/upload').post(catchAsyncHandler(controller.upload));