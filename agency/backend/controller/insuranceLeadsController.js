import InsuranceLeads from "../models/insuranceLeads.js";

export const createInsuranceLead = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      zipCode,
      countryCode,
      phoneNumber,
      dateOfBirth,
      consent
    } = req.body;

    /* 1️⃣ Required field validation */
    if (
      !firstName ||
      !lastName ||
      !zipCode ||
      !countryCode ||
      !phoneNumber ||
      !dateOfBirth
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
      age
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
