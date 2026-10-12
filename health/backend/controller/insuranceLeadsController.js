import InsuranceLeads from "../models/insuranceLeads.js";
import mongoose from "mongoose";

export const createInsuranceLead = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      zipCode,
      countryCode,
      phoneNumber,
      dateOfBirth,
      state,
      consent,
      leadTrackingId,
      salary
    } = req.body;

    /* 1️⃣ Required field validation */
    if (
      !firstName ||
      !lastName ||
      !zipCode ||
      !countryCode ||
      !phoneNumber ||
      !dateOfBirth ||
      !state || 
      !leadTrackingId ||
      !salary
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided"
      });
    }

    /* 2️⃣ Consent validation (TCPA compliance) */
    if (!consent) {
      return res.status(400).json({
        success: false,
        message: "Consent is required to proceed"
      });
    }

    /* 3️⃣ Calculate age from DOB */
    const age = Math.floor(
      (Date.now() - new Date(dateOfBirth)) / (1000 * 60 * 60 * 24 * 365.25)
    );

    if (age < 18) {
      return res.status(400).json({
        success: false,
        message: "User must be at least 18 years old"
      });
    }

    /* 4️⃣ Create lead document (MATCHES SCHEMA) */
    const newLead = new InsuranceLeads({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      zipCode: zipCode.trim(),
      countryCode: countryCode.trim(),
      phoneNumber: phoneNumber.trim(), // ✅ schema field
      dateOfBirth,
      state: state.trim(),
      age,
      leadTrackingId,
      salary
    });

    /* 5️⃣ Save to DB */
    await newLead.save();

    return res.status(201).json({
      success: true,
      message: "Insurance lead saved successfully",
      data: newLead
    });

  } catch (error) {
    console.error("Create Insurance Lead Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

/* =========================
   READ ALL LEADS (LATEST → OLDEST)
========================= */
export const getInsuranceLeads = async (req, res) => {
  try {
    const leads = await InsuranceLeads.find()
      .sort({ createdAt: -1 });

    const formattedLeads = leads.map(lead => ({
      ...lead._doc,
      createdAtEST: new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(new Date(lead.createdAt))
    }));

    return res.status(200).json({
      success: true,
      data: formattedLeads
    });

  } catch (error) {
    console.error("Read Insurance Lead Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};




/* =========================
   READ SINGLE LEAD BY ID
========================= */
export const getInsuranceLeadById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead ID"
      });
    }

    const lead = await InsuranceLeads.findById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Insurance lead not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: lead
    });

  } catch (error) {
    console.error("Read Single Insurance Lead Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

/* =========================
   UPDATE LEAD
========================= */
export const updateInsuranceLead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead ID"
      });
    }

    const updatedLead = await InsuranceLeads.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true, strict: false }
    );

    if (!updatedLead) {
      return res.status(404).json({
        success: false,
        message: "Insurance lead not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Insurance lead updated successfully",
      data: updatedLead
    });

  } catch (error) {
    console.error("Update Insurance Lead Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

/* =========================
   DELETE LEAD
========================= */
export const deleteInsuranceLead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead ID"
      });
    }

    const deletedLead = await InsuranceLeads.findByIdAndDelete(id);

    if (!deletedLead) {
      return res.status(404).json({
        success: false,
        message: "Insurance lead not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Insurance lead deleted successfully"
    });

  } catch (error) {
    console.error("Delete Insurance Lead Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};