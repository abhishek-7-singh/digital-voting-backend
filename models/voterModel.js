import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const voterModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    citizenship_no: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    documents: {
      type: [
        {
          secure_url: {
            type: String,
          },
          public_id: {
            type: String,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

voterModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

voterModel.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Voter = mongoose.model('Voter', voterModel);

export default Voter;
