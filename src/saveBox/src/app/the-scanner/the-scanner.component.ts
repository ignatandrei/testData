import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RecognizeBarCodeService } from '../recognize-bar-code.service';


@Component({
  selector: 'app-the-scanner',
  templateUrl: './the-scanner.component.html',
  styleUrls: ['./the-scanner.component.css']
})
export class TheScannerComponent implements OnInit {


  //#region barcode scanner
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];
  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;
  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    // window.alert('qr: ' + resultString);
    this.qrResultString = resultString;
    this.recog.findBar(resultString);
  }

  get currentDeviceId(): string{

    if (this.currentDevice == null) {
        return 'no_device';
    }

    return this.currentDevice.deviceId;

  }
  onDeviceSelectChange(selected: string) {
    const prev = this.currentDeviceId;
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
    if (prev !== this.currentDeviceId) {
      window.alert('change camera to ' + this.currentDevice.label);
    }
  }
  cancelCamera(){
    this.recog.findBar('');
  }
  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };
    window.alert('not ready yet, https://github.com/zxing-js/ngx-scanner/blob/6f8d3954ea39a3adbc17f0f5f02c6bdbff95416d/projects/zxing-scanner-demo/src/app/app.component.ts');
    // this._dialog
    //   .open(FormatsDialogComponent, { data })
    //   .afterClosed()
    //   .subscribe(x => { if (x) { this.formatsEnabled = x; } });
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  openInfoDialog() {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };
    window.alert('not ready yet');
    // this._dialog.open(AppInfoDialogComponent, { data });
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
    this.onDeviceSelectChange(this.currentDeviceId);
  }
  //#endregion
  constructor(private readonly _dialog: MatDialog, private recog: RecognizeBarCodeService) { }

  ngOnInit(): void {
  }

}
