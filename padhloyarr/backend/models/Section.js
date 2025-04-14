// Section Model
const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    contentType: {
      type: String,
      enum: ['video', 'text', 'quiz', 'pdf', 'assignment'],
      default: 'text'
    },
    duration: {
      type: Number, // in minutes, for videos
      default: 0
    },
    order: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const Section = mongoose.model('Section', sectionSchema);
  
  module.exports = { Section };