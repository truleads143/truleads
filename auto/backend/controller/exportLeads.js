import ExcelJS from "exceljs";
import InsuranceLeads from "../models/insuranceLeads.js";

export const exportLeads = async (req, res) => {
  try {
    // 1️⃣ Fetch all leads (descending order)
    const leads = await InsuranceLeads.find()
      .sort({ createdAt: -1 })
      .lean();

    // 2️⃣ Create workbook & worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Insurance Leads");

    // 3️⃣ Excel creation timestamp
    const exportTime = new Date();

    worksheet.addRow([
      `Created At - ${exportTime.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "medium",
      })}`,
    ]);

    worksheet.addRow([]); // spacing row

    // 4️⃣ Define columns
    worksheet.columns = [
      { header: "S.No", key: "sno", width: 8 },
      { header: "Lead Id", key: "leadid", width: 40 },
      { header: "Name", key: "name", width: 25 },
      { header: "Age", key: "age", width: 10 },
      { header: "Currently Insured", key: "insured", width: 20 },
      { header: "Looking for Switch", key: "switch", width: 25 },
      { header: "House Owner", key: "owner", width: 14 },
      { header: "State", key: "state", width: 15 },
      { header: "Phone Number", key: "phone", width: 20 },
      { header: "Zip Code", key: "zipCode", width: 12 },
      { header: "Date (EST)", key: "date", width: 14 },
      { header: "Time (EST)", key: "time", width: 14 },
    ];

    // 5️⃣ Add data rows
    leads.forEach((lead, index) => {
      const createdDate = new Date(lead.createdAt);

      worksheet.addRow({
        sno: index + 1,
        leadid: `${lead.leadTrackingId || ""}`,
        name: `${lead.firstName} ${lead.lastName || ""}`.trim(),
        insured: lead.currentlyInsured ? "Yes" : "No",
        switch: lead.lookingToSwitchForLowerRates ? "Yes" : "No",
        owner: lead.isOwnerOfHouse ? "Yes" : "No",
        age: lead.age ?? "",
        state: lead.state,
        phone: `${lead.countryCode} ${lead.phoneNumber}`,
        zipCode: lead.zipCode || "",
        date: createdDate.toLocaleDateString("en-US", {
          timeZone: "America/New_York",
        }),
        time: createdDate.toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
        }),
      });
    });

    // 6️⃣ Center alignment for all cells
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
        };
      });
    });

    // 7️⃣ Bold actual header row (correct fix)
    worksheet.getRow(worksheet.headerRowNumber).font = { bold: true };

    // 8️⃣ Response headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=insurance_leads.xlsx"
    );

    // 9️⃣ Send Excel file
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Export Leads Error:", error);
    res.status(500).json({
      message: "Failed to export leads",
    });
  }
};
