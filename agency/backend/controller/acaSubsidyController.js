// Import AcaSubmission model (assuming correct file path)
import AcaSubsidy from "../models/acasubsidy.js";
// No need to import nanoid or the age calculation helper since they are handled client-side.

export const generateAcaSubsidy = async (req, res) => {
  // Destructure ALL fields expected from the request body, including the new ones
  const {
    firstName,
    lastName,
    phone,
    income,
    dob,
    zipcode, // <-- New Field
    state,   // <-- New Field
    consentMarketing,
    consentPrivacy,
    consentACA,
    age, 			// <-- Now from frontend
    referenceId, 	// <-- Now from frontend
    submissionDate 	// <-- Now from frontend
  } = req.body;

  console.log(firstName,
    lastName,
    phone,
    income,
    dob,
    zipcode,
    state,
    consentMarketing,
    consentPrivacy,
    consentACA,
    age,
    referenceId,
    submissionDate)

  console.log("k")

  // --- 1. Initial Validation Check (400 Bad Request) ---
  // Check for all essential fields, including the client-generated ones AND new fields
  if (!firstName || !lastName || !phone || income === undefined || !dob ||
    !zipcode || !state || // <-- Check for new fields
    consentPrivacy == undefined || consentACA == undefined ||
    age == undefined || !referenceId || !submissionDate) {

    return res.status(400).json({
      message: "Missing required submission data. Ensure all fields (including zipcode, state, referenceId, age, and submissionDate) are present."
    });
  }


  // --- 2. Advanced Data Validation and Preparation ---

  // Validate DOB (must be a valid date)
  const parsedDob = new Date(dob);
  if (isNaN(parsedDob.getTime())) {
    return res.status(400).json({ message: "Invalid Date of Birth format." });
  }

  // Validate Age (must be a number, meet minimum requirement, and be plausible)
  const numericAge = Number(age);
  if (isNaN(numericAge) || numericAge < 18 || numericAge > 120) {
    return res.status(400).json({ message: "Invalid age provided. Must be a number between 18 and 120." });
  }

  // Validate Submission Date (must be a valid date)
  const parsedSubmissionDate = new Date(submissionDate);
  if (isNaN(parsedSubmissionDate.getTime())) {
    return res.status(400).json({ message: "Invalid submissionDate format." });
  }

  // Income Type and Range Check 
  // NOTE: Relying on the Mongoose model to enforce the 0 to 1,000,000 range.
  if (typeof income !== 'number' || income < 0) {
    return res.status(400).json({ message: "Income must be a non-negative number." });
  }

  // Validation for new fields
  const trimmedZipcode = zipcode.trim();
  if (trimmedZipcode.length !== 5 || !/^\d{5}$/.test(trimmedZipcode)) {
    return res.status(400).json({ message: "Zip Code must be a 5-digit number." });
  }

  const trimmedState = state.trim().toUpperCase();
  if (trimmedState.length !== 2 || !/^[A-Z]{2}$/.test(trimmedState)) {
    return res.status(400).json({ message: "State must be a 2-letter uppercase abbreviation." });
  }

  // Phone Number Check (Basic 10-digit validation)
  const numericPhone = phone.replace(/[^0-9]/g, '');
  if (numericPhone.length < 10 || numericPhone.length > 15) {
    return res.status(400).json({ message: "Invalid phone number format." });
  }

  // Reference ID Check (Basic format/length validation)
  if (typeof referenceId !== 'string' || referenceId.length < 4 || !referenceId.startsWith('ACA-')) {
    return res.status(400).json({ message: "Invalid referenceId format or length." });
  }


  // Mandatory Consent Check
  if (consentPrivacy !== true || consentACA !== true) {
    return res.status(400).json({ message: "Privacy and ACA consents are mandatory." });
  }


  // --- 3. Create Submission Document ---
  const newSubmission = new AcaSubsidy({
    firstName,
    lastName,
    phone: numericPhone, // Save sanitized phone number
    zipcode: trimmedZipcode, // Save validated zip code
    state: trimmedState,     // Save validated state
    income,
    dob: parsedDob,
    age: numericAge,
    consentMarketing: consentMarketing === true,
    consentPrivacy: true,
    consentACA: true,
    referenceId: referenceId.trim(), // Save the client-provided, validated ID
    submissionDate: parsedSubmissionDate, // Save the client-provided date
  });

  // --- 4. Save to Database and Respond (Error Handling) ---
  try {
    const savedSubmission = await newSubmission.save();

    // Success response
    return res.status(201).json({
      message: "ACA Submission successfully recorded.",
      submission: savedSubmission,
      referenceId: savedSubmission.referenceId
    });

  } catch (error) {
    console.error("Database Error during ACA Submission:", error);

    // Handle MongoDB unique key constraint violation for referenceId
    if (error.code === 11000) {
      // This is crucial: the client sent a duplicate referenceId
      return res.status(409).json({ message: "Conflict: The generated reference ID already exists. Please re-submit the form." });
    }

    // Catch all other database or internal server errors
    return res.status(500).json({ message: "An unexpected error occurred while processing the submission." });
  }
};


// NOTE: This function assumes AcaSubsidy model is imported/available and the formatCurrency helper is defined.
// Defining a placeholder formatCurrency function for completeness.
const formatCurrency = (amount) => {
  // Assuming the currency is Indian Rupees (INR) as per the frontend context (Rs)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getAcaSubsidy = async (req, res) => {
  try {
    // Assume AcaSubsidy model is accessible here (e.g., imported globally)
    // const AcaSubsidy = require('../models/AcaSubmission'); 

    // Get page number from query, default: 1
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // Count total records for pagination
    const totalRecords = await AcaSubsidy.countDocuments();

    // Fetch records for current page
    const records = await AcaSubsidy.find()
      .sort({ submissionDate: -1 }) // newest first
      .skip(skip)
      .limit(pageSize)
      .exec();

    // Generate table rows
    const rows = records
      .map((record) => {
        const fullName = `${record.firstName} ${record.lastName}`;
        const formattedIncome = formatCurrency(record.income);
        const submissionTime = new Date(record.submissionDate).toLocaleString('en-US', {
          dateStyle: 'short',
          timeStyle: 'short',
        });

        // Helper to render boolean status as a checkmark/cross
        const renderBoolean = (val) => val ? '✅ Yes' : '❌ No';

        // Helper to render status badge with color
        const statusBadge = (status) => {
          let color = 'gray';
          if (status === 'pending') color = '#fbbf24'; // amber-400
          if (status === 'in_progress') color = '#3b82f6'; // blue-500
          if (status === 'completed') color = '#10b981'; // emerald-500

          return `<span class="status-badge" style="background-color: ${color}20; color: ${color}; border: 1px solid ${color}80;">${status.replace('_', ' ')}</span>`;
        };


        return `
                    <tr>
                        <td>${fullName}</td>
                        <td>${record.referenceId}</td>
                        <td>${record.zipcode}</td> <!-- ADDED ZIP CODE -->
                        <td>${record.state}</td>   <!-- ADDED STATE -->
                        <td>${record.age}</td>
                        <td>${formattedIncome}</td>
                        <td>${record.phone}</td>
                        <td>${renderBoolean(record.consentPrivacy)}</td>
                        <td>${renderBoolean(record.consentACA)}</td>
                        <td>${record.dob.toISOString().split('T')[0]}</td>
                        <td>${statusBadge(record.status)}</td>
                        <td>${submissionTime}</td>
                    </tr>
                `;
      })
      .join("");

    const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
    // Total columns increased from 10 to 12

    const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <title>ACA Submissions • TruLeads</title>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <style>
                :root {
                  --primary-blue: #124D95;
                  --cyan-200: #A5F3FC;
                  --cyan-300: #67E8F9;
                  --cyan-500: #06B6D4;
                  --gray-50: #F9FAFB;
                  --gray-100: #F3F4F6;
                  --gray-200: #E5E7EB;
                  --gray-500: #6B7280;
                  --gray-700: #374151;
                  --black-50: #00000080;
                }

                * {
                  box-sizing: border-box;
                }

                body {
                  margin: 0;
                  padding: 24px;
                  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                  background: radial-gradient(circle at top, var(--cyan-200) 0, #ffffff 40%, var(--gray-100) 100%);
                  color: #111827;
                }

                .container {
                  max-width: 1200px;
                  margin: 0 auto;
                }

                .page-header {
                  margin-bottom: 18px;
                }

                .page-title {
                  font-size: 1.75rem;
                  font-weight: 800;
                  color: var(--primary-blue);
                  letter-spacing: 0.02em;
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                }

                .page-title-badge {
                  font-size: 0.75rem;
                  padding: 4px 10px;
                  border-radius: 999px;
                  background: var(--cyan-200);
                  color: var(--primary-blue);
                  font-weight: 600;
                }

                .page-subtitle {
                  margin-top: 6px;
                  font-size: 0.9rem;
                  color: var(--gray-500);
                }

                .card {
                  background: #ffffff;
                  border-radius: 18px;
                  box-shadow:
                    0 20px 25px -5px var(--black-50),
                    0 8px 10px -6px var(--black-50);
                  padding: 20px 20px 16px;
                  border: 1px solid rgba(18, 77, 149, 0.08);
                }

                .card-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  gap: 12px;
                  margin-bottom: 12px;
                }

                .card-title {
                  font-size: 1rem;
                  font-weight: 600;
                  color: var(--gray-700);
                }

                .card-meta {
                  font-size: 0.8rem;
                  color: var(--gray-500);
                }

                .pill {
                  display: inline-flex;
                  align-items: center;
                  gap: 6px;
                  padding: 4px 10px;
                  border-radius: 999px;
                  background: var(--gray-100);
                  font-size: 0.75rem;
                }

                .pill-dot {
                  width: 8px;
                  height: 8px;
                  border-radius: 999px;
                  background: var(--cyan-500);
                  box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.2);
                }

            .table-wrapper {
  margin-top: 10px;
  border-radius: 14px;
  border: 1px solid var(--gray-200);
  background: linear-gradient(to bottom, #ffffff, #f9fafb);
  width: 100%;
  overflow-x: auto;       /* scrollbar only when needed */
}

/* keep vertical scroll separate if you still want max height */
.table-scroll {
  max-height: 70vh;
}

/* let the table size itself to container */
table {
  width: 100%;
  border-collapse: collapse;
  /* removed min-width:1300px; */
}


                thead {
                  background: linear-gradient(90deg, var(--primary-blue), var(--cyan-500));
                  color: #ffffff;
                }

                th {
                  padding: 10px 12px;
                  font-size: 0.8rem;
                  text-align: left;
                  position: sticky;
                  top: 0;
                  z-index: 1;
                  backdrop-filter: blur(4px);
                }

                th:first-child {
                  padding-left: 18px;
                }

                th:last-child {
                  padding-right: 18px;
                }

                tbody tr:nth-child(even) {
                  background-color: var(--gray-50);
                }

                tbody tr:hover {
                  background-color: #ecfeff;
                  transition: background-color 120ms ease-out;
                }

                td {
                  padding: 9px 12px;
                  font-size: 0.85rem;
                  color: #111827;
                  vertical-align: top;
                }

                td:first-child {
                  padding-left: 18px;
                  font-weight: 600;
                  color: var(--primary-blue);
                }

                .status-badge {
                  display: inline-flex;
                  align-items: center;
                  padding: 2px 10px;
                  border-radius: 999px;
                  font-size: 0.75rem;
                  font-weight: 600;
                  text-transform: capitalize;
                }

                .pagination {
                  margin-top: 12px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  flex-wrap: wrap;
                  gap: 8px;
                  font-size: 0.85rem;
                }

                .pagination-center {
                  justify-content: center;
                }

                .pagination-buttons {
                  display: flex;
                  gap: 6px;
                }

                .btn {
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                  padding: 6px 14px;
                  border-radius: 999px;
                  border: 1px solid transparent;
                  font-size: 0.8rem;
                  font-weight: 600;
                  text-decoration: none;
                  cursor: pointer;
                  white-space: nowrap;
                  transition: background-color 160ms ease-out, border-color 160ms ease-out, transform 80ms ease-out, box-shadow 80ms ease-out;
                }

                .btn-primary {
                  background: var(--primary-blue);
                  color: #ffffff;
                  border-color: var(--primary-blue);
                  box-shadow: 0 8px 16px -6px var(--black-50);
                }

                .btn-primary:hover {
                  background: var(--cyan-500);
                  border-color: var(--cyan-500);
                  transform: translateY(-1px);
                  box-shadow: 0 10px 18px -8px var(--black-50);
                }

                .btn-outline {
                  background: #ffffff;
                  color: var(--primary-blue);
                  border-color: var(--gray-200);
                }

                .btn-outline:hover {
                  background: var(--gray-100);
                }

                .btn.disabled {
                  opacity: 0.45;
                  pointer-events: none;
                  cursor: default;
                  box-shadow: none;
                  transform: none;
                }

                .page-info {
                  color: var(--gray-500);
                }

                @media (max-width: 640px) {
                  body {
                    padding: 16px;
                  }
                  .card {
                    padding: 16px 12px 12px;
                    border-radius: 14px;
                  }
                  .page-title {
                    font-size: 1.4rem;
                  }
                  .page-subtitle {
                    font-size: 0.8rem;
                  }
                }
              </style>
            </head>
            <body>
              <div class="container">
                <header class="page-header">
                  <div class="page-title">
                    ACA Subsidy Submissions
                    <span class="page-title-badge">Admin View</span>
                  </div>
                  <p class="page-subtitle">
                    Review and manage all ACA subsidy eligibility submissions. Data includes age, income, and consent status.
                  </p>
                </header>

                <main class="card">
                  <div class="card-header">
                    <div>
                      <div class="card-title">ACA Eligibility Records</div>
                      <div class="card-meta">
                        Showing page ${page} of ${totalPages} • Total records: ${totalRecords}
                      </div>
                    </div>
                    <div class="pill">
                      <span class="pill-dot"></span>
                      Live data from MongoDB
                    </div>
                  </div>

                  <!-- TOP PAGINATION -->
                  <div class="pagination">
                    <div class="page-info">
                      Page <strong>${page}</strong> of <strong>${totalPages}</strong>
                    </div>
                    <div class="pagination-buttons">
                      <a href="?page=${page - 1}" class="btn btn-outline ${page <= 1 ? "disabled" : ""}">‹ Prev</a>
                      <a href="?page=${page + 1}" class="btn btn-primary ${page >= totalPages ? "disabled" : ""}">Next ›</a>
                    </div>
                  </div>

                  <div class="table-wrapper">
                    <div class="table-scroll">
                      <table>
                        <thead>
                          <tr>
                            <th>Applicant</th>
                            <th>Reference ID</th>
                            <th>Zip Code</th> <!-- ADDED HEADER -->
                            <th>State</th>    <!-- ADDED HEADER -->
                            <th>Age</th>
                            <th>Income</th>
                            <th>Phone</th>
                            <th>Privacy</th>
                            <th>ACA Auth</th>
                            <th>DOB</th>
                            <th>Status</th>
                            <th>Submitted At</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${rows ||
      `<tr><td colspan="12" style="text-align:center; padding:20px; color: var(--gray-500);">
                              No ACA submissions found on this page.
                            </td></tr>`
      }
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <!-- BOTTOM PAGINATION -->
                  <div class="pagination pagination-center">
                    <div class="pagination-buttons">
                      <a href="?page=${page - 1}" class="btn btn-outline ${page <= 1 ? "disabled" : ""}">‹ Prev</a>
                      <span class="page-info">Page ${page} of ${totalPages}</span>
                      <a href="?page=${page + 1}" class="btn btn-primary ${page >= totalPages ? "disabled" : ""}">Next ›</a>
                    </div>
                  </div>
                </main>
              </div>
            </body>
            </html>
        `;

    res.send(html);
  } catch (error) {
    console.error("Error fetching ACA submissions:", error);
    res.status(500).send("Error fetching ACA submissions");
  }
};