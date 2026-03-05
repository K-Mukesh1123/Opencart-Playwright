import * as XLSX from 'xlsx';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../data/test-data.xlsx');

export function updateExcelByKey(
  sheetName: string,
  keyColumn: string,
  keyValue: string,
  columnToUpdate: string,
  newValue: string
) {
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];

  const data: any[] = XLSX.utils.sheet_to_json(worksheet);

  const row = data.find(r => r[keyColumn] === keyValue);

  if (!row) {
    throw new Error(`Row with ${keyColumn}=${keyValue} not found`);
  }

  row[columnToUpdate] = newValue;

  const updatedSheet = XLSX.utils.json_to_sheet(data);

  workbook.Sheets[sheetName] = updatedSheet;

  XLSX.writeFile(workbook, filePath);
}