import { Types } from './Types';
export class ScanData{
    constructor(){

    }
    public platz: string;
    public box: string;
    public typeScan: Types;

    public get isValid(): boolean{
        if ((this.box || '').length == 0) {
            return false;
        }
        if ((this.platz || '').length == 0) {
            return false;
        }
        
        if ((+this.typeScan || 0) == 0) {
            return false;
        }

        return true;
    }

    public copyNew(): ScanData{
        const newItem = new ScanData();
        newItem.typeScan = this.typeScan;
        newItem.platz  = this.platz;
        newItem.box = this.box;
        return newItem;
    }
}
