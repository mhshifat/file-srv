import { Router } from "express";
import { MapperController } from "./controller";
import { catchAsyncHandler } from "../../../middlewares";

const controller = new MapperController();
export const MapperRouter = Router();

MapperRouter.route('/')
  .get(catchAsyncHandler(controller.getAll))
  .post(catchAsyncHandler(controller.create));

MapperRouter.route('/:mapperId/construct')
  .post(catchAsyncHandler(controller.construct));