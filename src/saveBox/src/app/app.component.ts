import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IDName } from './classes/IDName';
import { ScanData } from './classes/scan';
import { Types } from './classes/Types';
import { StorageService } from './services/StorageService';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {


  public sc: ScanData;
  public scExist: ScanData[] = [];
  idTypes: IDName[] = [];
  title = 'The application for save box data';
  constructor(private st: StorageService, private  snackBar: MatSnackBar) {
    this.sc = new ScanData();

    for (const n in Types) {
      if (typeof Types[n] === 'number') {
        this.idTypes.push(new IDName(parseInt(Types[n], 10), n));
      }
    }
  }
  public scanBox(): void{
    // const b = this.sc.box;
    // this.saveMemory();
    // this.sc.box = b;
  }
  public scanPlatz(): void{    
    // this.saveMemory();
  }
  private saveMemory(): void{
    if(!this.sc.isValid){
      this.snackBar.open("Error!", "NOT A VALID ITEM", {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'left'
      });
      

      return;
    };
    
    this.scExist.push(this.sc);    
    this.sc=this.sc.copyNew();
    this.sc.platz='';
    
    
  }
  public saveData(): void{
    
    this.saveMemory();

    //window.alert('will save' + JSON.stringify(this.sc));
  }
  public deleteFromMemory(existScan: ScanData){
    const index= this.scExist.indexOf(existScan, 0);    
    if (index > -1) {
      this.scExist.splice(index, 1);
   }

  }
}
