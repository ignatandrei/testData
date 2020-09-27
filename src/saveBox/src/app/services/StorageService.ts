import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  getData(key: string): any {
    if (this.isLocalStorageSupported) {
      return JSON.parse(this.localStorage.getItem(key));
    }

    return null;
  }

  saveData(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return true;
    }

    return false;
  }

  removeData(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return true;
    }

    return false;
  }

  isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }
}

