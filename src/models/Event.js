import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  capacity: { type: Number, required: true }
});

export const eventModel = mongoose.model('events', eventSchema);