import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  mission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mission',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  freelance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Freelance',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  platformFee: {
    type: Number,
    required: true
  },
  freelanceAmount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'paypal', 'wise', 'cashapp', 'moncash', 'natcash'],
    required: true
  },
  paymentIntentId: String, // Stripe
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  withdrawal: {
    method: {
      type: String,
      enum: ['paypal', 'wise', 'bank-transfer', 'moncash', 'natcash', 'cashapp']
    },
    status: {
      type: String,
      enum: ['pending', 'processed', 'failed'],
      default: 'pending'
    },
    processedAt: Date
  }
}, {
  timestamps: true
});

export default mongoose.model('Payment', paymentSchema);