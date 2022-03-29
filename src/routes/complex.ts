import express from "express";
import complexController from "../controllers/complex.controller";


const complexRouter = express.Router();

complexRouter.post('/', complexController.postComplex);
export default complexRouter;