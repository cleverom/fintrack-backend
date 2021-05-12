import express from "express";
import Data from "../models/fintrackModels";

export async function createData(req: express.Request, res: express.Response) {
  try {
    const { title, description, typeOfFunds, amount } = req.body;
    const newRequest = new Data({
      title,
      description,
      typeOfFunds,
      amount,
    });
    newRequest.save();

    return res.status(201).json({
      status: true,
      message: "Request successfully created",
      data: newRequest,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}

export async function getData(req: express.Request, res: express.Response) {
  try {
    const requests = await Data.find();

    if (!requests) {
      res.status(404).json({ success: false });
      return;
    }

    res.status(200).json(requests);
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}
