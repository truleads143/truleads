// import prisma from '../DB/db.config.js';  // ❌ NOT NEEDED ANYMORE
import Lead from "../models/leads.js";       // ✅ Mongoose model

// ================== CREATE / GENERATE LEAD ==================
export const generateLeads = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    address,
    preferredContact,
    serviceType,
    otherServiceType,
    description,
  } = req.body;

  // Basic validation
  if (!fullName || !email || !phone || !serviceType) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  if (otherServiceType && !description) {
    return res.status(400).json({
      message: "Please provide description for other service type",
    });
  }

  try {
    // MongoDB (Mongoose) create
    const newLead = await Lead.create({
      name: fullName,
      email,
      phone,
      address,
      preferredContact,
      serviceType,
      otherService: otherServiceType,
      description,
    });

    if (!newLead) {
      return res.status(500).json({ message: "Failed to create lead" });
    }

    console.log("lead sebt to DB:", process.env.DATABASE_URL);
    return res.status(201).json({
      message: "Lead created successfully",
      lead: newLead, // optional: you can remove this if not needed
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ================== GET LEADS WITH PAGINATION (HTML TABLE) ==================
export const getLeads = async (req, res) => {
  try {
    // Get page number from query, default: 1
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;

    // Count total leads for pagination (MongoDB)
    const totalLeads = await Lead.countDocuments();

    // Fetch leads for current page
    const leads = await Lead.find()
      .sort({ createdAt: -1 }) // newest first
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    // Generate table rows
    const rows = leads
      .map(
        (lead) => `
      <tr>
        <td>${lead.name}</td>
        <td>${lead.email}</td>
        <td>${lead.phone}</td>
        <td>${lead.address || ""}</td>
        <td>${lead.preferredContact || ""}</td>
        <td>${lead.serviceType}</td>
        <td>${lead.otherService || ""}</td>
        <td>${lead.description || ""}</td>
        <td>${lead.status}</td>
        <td>${new Date(lead.createdAt).toLocaleString()}</td>
      </tr>
    `
      )
      .join("");

    const totalPages = Math.max(1, Math.ceil(totalLeads / pageSize));

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>All Leads • TruLeads</title>
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
            overflow: hidden;
            background: linear-gradient(to bottom, #ffffff, #f9fafb);
          }

          .table-scroll {
            overflow-x: auto;
            max-height: 70vh;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            min-width: 900px;
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

          td:nth-child(9) { /* Status */
            font-weight: 600;
            font-size: 0.78rem;
          }

          .status-badge {
            display: inline-flex;
            align-items: center;
            padding: 2px 10px;
            border-radius: 999px;
            font-size: 0.75rem;
            background: #ecfeff;
            color: var(--primary-blue);
            border: 1px solid var(--cyan-300);
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
              All Leads
              <span class="page-title-badge">Admin View</span>
            </div>
            <p class="page-subtitle">
              Review, track, and manage all captured leads in a clean, paginated table.
            </p>
          </header>

          <main class="card">
            <div class="card-header">
              <div>
                <div class="card-title">Lead Records</div>
                <div class="card-meta">
                  Showing page ${page} of ${totalPages} • Total leads: ${totalLeads}
                </div>
              </div>
              <div class="pill">
                <span class="pill-dot"></span>
                Live updates based on latest entries
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
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Preferred Contact</th>
                      <th>Service Type</th>
                      <th>Other Service</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${
                      rows ||
                      `<tr><td colspan="10" style="text-align:center; padding:20px; color: var(--gray-500);">
                        No leads found on this page.
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
    console.error("Error fetching leads:", error);
    res.status(500).send("Error fetching leads");
  }
};

