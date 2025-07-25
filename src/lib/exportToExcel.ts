import { saveAs } from "file-saver";
import { MonthlyTaxReportMutation, TaxReportMutation } from "@/interface";
import ExcelJS from 'exceljs';
import { getTaxProfile } from "./supabase/api";

export async function exportToExcel(data: TaxReportMutation[], fileName: string) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    const headers = ["MONTH", "GROSS INCOME", "PPH"];
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
    footerRow.getCell(1).font = { bold : true }
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

export async function exportToExcelMonthly(data: MonthlyTaxReportMutation[], fileName: string, month: string, year: number) {
  const taxModule = await getTaxProfile();
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');
  
  worksheet.addRow([month.toUpperCase() + " " + year])
  worksheet.mergeCells('A1:B1')
  const headers = ["DAY", "GROSS INCOME"];
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

  const headerRow2 = worksheet.getRow(2);
  headerRow2.eachCell(cell => {
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
      worksheet.addRow([item.day, item.grossprofit]).eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      });
  });

  const footer1 = ["Total", null];
  const footerRow1 = worksheet.addRow(footer1);
  footerRow1.getCell(2).value = {
    formula: `SUM(B3:B${data.length + 2})`
  };

  footerRow1.eachCell(cell => {
    cell.alignment = { vertical: 'middle', horizontal: 'right' };
    cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
    };
  });

  footerRow1.getCell(1).font = { bold: true };

  const footer2 = ["Total PPh", null];
  const footerRow2 = worksheet.addRow(footer2);
  footerRow2.getCell(2).value = {
    formula: `B${data.length + 3} * ${taxModule.data?.pph_percentage}`
  };

  footerRow2.eachCell(cell => {
      cell.alignment = { vertical: 'middle', horizontal: 'right' };
      cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
      };
  });

  footerRow2.getCell(1).font = { bold: true };

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