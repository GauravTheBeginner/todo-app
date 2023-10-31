import { Request, Response } from "express";
import ToDoModel from "../models/ToDoModel";

export const getToDos = async (req: Request, res: Response): Promise<void> => {
  try {
    const toDos = await ToDoModel.find();
    res.send(toDos);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};

export const saveToDo = (req: Request, res: Response): void => {
    const { toDo } = req.body;
  
    if (!toDo) {
      return res.status(400).json({ error: "toDo field is required" });
    }
  
    ToDoModel.create({ toDo })
      .then((data) => {
        console.log("Saved Successfully...");
        res.status(201).send(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ error: err, msg: "Something went wrong!" });
      });
  };
  

export const updateToDo = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { toDo } = req.body;

  ToDoModel.findByIdAndUpdate(id, { toDo })
    .then(() => {
      res.send("Updated Successfully....");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

export const deleteToDo = (req: Request, res: Response): void => {
  const { id } = req.params;

  ToDoModel.findByIdAndDelete(id)
    .then(() => {
      res.send("Deleted Successfully....");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};
