import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      default: null,
    },

    preferredContact: {
      type: String,
      default: null,
    },

    serviceType: {
      type: String,
      required: true,
      enum: ["ACA", "FE", "SSDI", "MEDICARE", "AUTO_INSURANCE", "OTHER"],
    },

    otherService: {
      type: String,
      default: null,
    },

    description: {
      type: String,
      default: null,
    },

    assignedTo: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      default: "New",
    },
  },
  {
    timestamps: true, // automatically creates createdAt & updatedAt
  }
);

const Lead = mongoose.model("Lead", LeadSchema);
export default Lead;
