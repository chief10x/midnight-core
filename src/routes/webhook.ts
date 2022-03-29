import express from "express";
import webhookController from "../controllers/webhook.controller";
const webhookRouter = express.Router();

webhookRouter.post("/", webhookController.postWebhook)

export default webhookRouter;