import { Injectable } from '@angular/core';
import { StreamPriorityOptions } from 'http2';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecognizeBarCodeService {

   recog = new Subject<string>();
  constructor() { }

  public findBar(s: string){
    //window.alert('find bar' + s);
    this.recog.next(s);

  }

  public FindBar$(): Observable<string>{
    return this.recog.asObservable();
  }
}
