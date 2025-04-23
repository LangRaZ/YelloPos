import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { TaxReportMutation } from "@/interface";
import ExcelJS from 'exceljs';

export async function exportToExcel(data: TaxReportMutation[], fileName: string) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    const headers = ["MONTH", "GROSS PROFIT", "PPH"];
    worksheet.addRow(headers)

    const headerRow = worksheet.getRow(1);
    headerRow.eachCell(cell => {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.font = { bold: true };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
    });

    data.forEach(item => {
        worksheet.addRow([item.month, item.sum, item.pph]).eachCell(cell => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          }
        });
    });

    const footer = ["Total", null, null];
    const footerRow = worksheet.addRow(footer);
    footerRow.getCell(2).value = {
      formula: `SUM(B2:B${data.length + 1})`
    };
    footerRow.getCell(3).value = {
      formula: `SUM(C2:C${data.length + 1})`
    };
    footerRow.eachCell(cell => {
        cell.alignment = { vertical: 'middle', horizontal: 'right' };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
    });

    worksheet.columns.forEach(column => {
      let maxLength = 10;
      column?.eachCell?.({ includeEmpty: true }, cell => {
          const len = cell.value?.toString().length ?? 0;
          if (len > maxLength) maxLength = len;
      });
      column.width = maxLength + 2;
    });
  
    const excelBuffer = await workbook.xlsx.writeBuffer()

    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, `${fileName}.xlsx`);
    return blob;
  }