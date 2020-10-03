import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IDName } from './classes/IDName';
import { ScanData } from './classes/scan';
import { StateScanning } from './classes/StateScanning';
import { Types } from './classes/Types';
import { RecognizeBarCodeService } from './recognize-bar-code.service';
import { StorageService } from './services/StorageService';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {


  public state: StateScanning = StateScanning.None;
  public sc: ScanData;
  public scExist: ScanData[] = [];
  idTypes: IDName[] = [];
  title = 'The application for save box data';
  constructor(private st: StorageService, private  snackBar: MatSnackBar, private recog : RecognizeBarCodeService) {
    this.sc = new ScanData();

    for (const n in Types) {
      if (typeof Types[n] === 'number') {
        this.idTypes.push(new IDName(parseInt(Types[n], 10), n));
      }
    }

    recog.FindBar$().subscribe(it=> this.findBarCode(it));
  }
  public findBarCode(s: string){
    switch(this.state){
      case StateScanning.None:
        break;
      case StateScanning.Box:
        this.sc.box = s;
        this.state = StateScanning.None;
        break;
      case StateScanning.Platz:
        this.sc.platz = s;
        this.state = StateScanning.None;
        break;
    }
  }
  
  public scanBox(): void{

    this.state=StateScanning.Box;
  }
  public scanPlatz(): void{    
    this.state=StateScanning.Platz;
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
