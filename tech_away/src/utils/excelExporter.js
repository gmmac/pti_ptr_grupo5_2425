// src/utils/excelExporter.js
import * as XLSX from "xlsx";

/**
 * Exports multiple data sheets to an Excel file.
 *
 * @param {Record<string, any[]>} sheetsObj - Keys are sheet names, values are arrays of row objects.
 * @param {string} reportType                - A key or slug to include in the filename.
 */
export function exportReportToExcel(sheetsObj, reportType) {
  const workbook = XLSX.utils.book_new();

  Object.entries(sheetsObj).forEach(([sheetName, data]) => {
    if (Array.isArray(data) && data.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    }
  });

  const now = new Date();
  const pad2 = num => num.toString().padStart(2, '0');
  const pad3 = num => num.toString().padStart(3, '0');

  const timestamp =
    now.getFullYear().toString() +
    pad2(now.getMonth() + 1) +
    pad2(now.getDate()) +
    pad2(now.getHours()) +
    pad2(now.getMinutes()) +
    pad2(now.getSeconds());

  const filename = `${timestamp}-report-${reportType}.xlsx`;

  XLSX.writeFile(workbook, filename);
}
