import mongoose from 'mongoose';
import { GameModel } from './game.model';
import { ImageSchema } from './image.schema';

export type GameModelDocument = GameModel & Document;

export const GameSchema = new mongoose.Schema(
  {
    id: String,
    category: String,
    title: String,
    subtitle: String,
    description: String,
    type: String,
    tags: [String],
    author: String,
    replayBundleUrlJson: String,
    duration: Number,
    isDownloadable: Boolean,
    isStreamable: Boolean,
    version: String,
    images: [ImageSchema],
  },
  { collection: 'games' },
);

GameSchema.index({ id: 1 }, { unique: true });
