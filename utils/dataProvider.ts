import {parse} from 'csv-parse/sync';
import fs, { Utf8Stream } from 'fs';

export class DataProvider{

    static getTestDataFromJson(filePath:string){
       let data= JSON.parse(fs.readFileSync(filePath,'utf-8'))
       return data;
    }
    static gettestDataFromCSV(filePath:string){
        
       let data= parse(fs.readFileSync(filePath),{columns:true,skip_empty_lines:true});
        return data;
    }
}