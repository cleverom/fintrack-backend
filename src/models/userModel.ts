import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    uniqueId: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'agent'],
      default: 'user',
    },
  },
  { timestamps: true },
);
const Admin = mongoose.model('admin', userSchema);
const Agent = mongoose.model('agent', userSchema);
const User = mongoose.model('user', userSchema);
module.exports = { Admin, Agent, User };
