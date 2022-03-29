import express from "express";
import seriesController from "../controllers/series.controller";

const seriesRouter = express.Router();

seriesRouter.post('/', seriesController.postSeries);

export default seriesRouter;