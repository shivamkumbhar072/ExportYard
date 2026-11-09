const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    enquiryType: {
      type: String,
      enum: ["Buyer", "Supplier"],
      default: "Buyer",
      required: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    companyName: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    whatsappCountryCode: {
      type: String,
      required: true,
      trim: true,
      maxlength: 6,
    },
    whatsappNumber: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    originCountry: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },
    destinationCountry: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },
    requestedQuantity: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },
    targetTimeline: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },
    destinationPort: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },
    requirements: {
      type: String,
      trim: true,
      maxlength: 3000,
      default: "",
    },
    whatsappConsent: {
      type: Boolean,
      default: false,
    },

    // Retained for enquiries submitted before the form became product-agnostic.
    bottleSize: {
      type: String,
      enum: ["250 ml", "330 ml", "500 ml", "1 L", "1.5 L", "5 L", "Other"],
    },
    quantity: {
      type: Number,
      min: 1,
    },
    quantityUnit: {
      type: String,
      enum: ["", "bottles", "cartons", "20ft container", "40ft container"],
      default: "",
    },
    packagingPreference: {
      type: String,
      enum: ["PET bottles", "Private label", "Custom packaging", "Other"],
    },
    additionalRequirements: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Quoted", "Negotiating", "Converted", "Closed"],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ email: 1 });
enquirySchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("Enquiry", enquirySchema);
