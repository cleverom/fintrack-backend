import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    request: {
      type: String,
      enum: ['Refund', 'Invoice', 'Loan', 'Upfront', 'Stipend', 'Others'],
    },
    image_url: {
      type: Array,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Needs Approval', 'Approved', 'Resolved', 'Canceled'],
    },
    approvers: {
      type: Array,
    }
  },
  { timestamps: true },
);

export default mongoose.model('UserRequest', requestSchema);
