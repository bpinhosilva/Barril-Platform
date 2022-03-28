import mongoose from 'mongoose';

export const ImageSchema = new mongoose.Schema(
  {
    id: String,
    filename: String,
    type: Number,
  },
  { _id: false },
);
