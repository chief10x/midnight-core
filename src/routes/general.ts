import express from "express";

const generalRouter = express.Router();

generalRouter.get("/", (req, res)=>{
  res.send({
    status: `mj-core is listening on 3000 🔥`
  })
})

export default generalRouter;