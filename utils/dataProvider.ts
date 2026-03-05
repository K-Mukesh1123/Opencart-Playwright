import {parse} from 'csv-parse/sync';
import fs, { Utf8Stream } from 'fs';
import * as XLSX from 'xlsx';
import * as path from 'path'


export class DataProvider{

    static getTestDataFromJson(filePath:string){
       let data= JSON.parse(fs.readFileSync(filePath,'utf-8'));
       return data;
    }
    static gettestDataFromCSV(filePath:string){
        
       let data= parse(fs.readFileSync(filePath),{columns:true,skip_empty_lines:true});
        return data;
    }

    static gettestDataFromExcel(xlsxpath:string,sheetName:string){
        const filePath=path.resolve(__dirname,xlsxpath);
        const workbook=XLSX.readFile(filePath);
        const sheet=workbook.Sheets[sheetName];

        if(!sheet){
            throw new Error(`Sheet ${sheetName} not found`);
        }

        return XLSX.utils.sheet_to_json(sheet);

    }
}