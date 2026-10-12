import mongoose from "mongoose";

const AcaSubsidySchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    // New field for Zip Code
    zipcode: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 5,
    },
    // New field for State (2-letter abbreviation)
    state: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      minlength: 2,
      maxlength: 2,
    },
    income: {
      type: Number,
      required: true,
      min: 0,
      max: 1000000,
    },
    dob: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
      max: 120,
    },
    consentMarketing: {
      type: Boolean,
      required: true,
      default: true,
    },
    consentPrivacy: {
      type: Boolean,
      required: true,
      default: true,
    },
    consentACA: {
      type: Boolean,
      required: true,
      default: true,
    },
    referenceId: {
      type: String,
      required: true,
      unique: true,
    },
    submissionDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    // optional lead status
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

const AcaSubsidy = mongoose.model("AcaSubsidy", AcaSubsidySchema);

export default AcaSubsidy;