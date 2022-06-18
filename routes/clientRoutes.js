import express from "express";
import expressAsyncHandler from "express-async-handler";
import Client from "../models/clientModel.js";

const clientRouter = express.Router();

clientRouter.post(
  "/new",
  expressAsyncHandler(async (req, res) => {
    const newClient = new Client({
      report_no: req.body.report_no,
      name: req.body.name,
      address: req.body.address,
      sample_name: req.body.sample_name,
      sample_batch_no: req.body.sample_batch_no,
      produced_date: req.body.produced_date,
      manufactured: req.body.manufactured,
      sgs_sample_no: req.body.sgs_sample_no,
      date_sample: req.body.date_sample,
      test_period: req.body.test_period,
    });
    const client = await newClient.save();
    res.send({
      _id: client._id,
      report_no: client.report_no,
      name: client.name,
      address: client.address,
      sample_name: client.sample_name,
      sample_batch_no: client.sample_batch_no,
      produced_date: client.produced_date,
      manufactured: client.manufactured,
      sgs_sample_no: client.sgs_sample_no,
      date_sample: client.date_sample,
      test_period: client.test_period,
    });
  })
);
clientRouter.get("/:report_no", async (req, res) => {
  const client = await Client.findOne({ report_no: req.params.report_no });
  if (client) {
    res.send(client);
  } else {
    res.status(404).send({ message: "report Not Found" });
  }
});

export default clientRouter;
