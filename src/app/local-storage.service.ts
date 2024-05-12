import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    if (this.isLocalStorageSupported()) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getItem(key: string): any {
    if (this.isLocalStorageSupported()) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  }

  removeItem(key: string): void {
    if (this.isLocalStorageSupported()) {
      localStorage.removeItem(key);
    }
  }

  private isLocalStorageSupported(): boolean {
    try {
      const testKey = 'testKey';
      localStorage.setItem(testKey, testKey);
      localStorage.getItem(testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}
