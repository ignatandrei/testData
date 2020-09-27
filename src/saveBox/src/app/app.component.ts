import { Component } from "@angular/core";
import { IDName } from "./classes/IDName";
import { ScanData } from "./classes/scan";
import { Types } from "./classes/Types";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  public sc: ScanData;
  idTypes: IDName[] = [];
  title = "The application for save box data";
  constructor() {
    this.sc = new ScanData();

    for (const n in Types) {
      if (typeof Types[n] === "number") {
        this.idTypes.push(new IDName(parseInt(Types[n], 10), n));
      }
    }
  }
  public scanBox(): void{
    window.alert('scan box');
  }
  public scanPlatz(): void{
    window.alert('scan platz');
  }
}
