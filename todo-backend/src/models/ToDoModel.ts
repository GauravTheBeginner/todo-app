import mongoose, { Document, Model, Schema } from "mongoose";

interface IToDo extends Document {
  toDo: string;
}

const toDoSchema: Schema = new Schema({
  toDo: {
    type: String,
    required: true,
  },
});

const ToDoModel: Model<IToDo> = mongoose.model<IToDo>("ToDo", toDoSchema);

export default ToDoModel;
