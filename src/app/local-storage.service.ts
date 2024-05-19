import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  getItemsStartingWith(keyStartingWith: string): Record<string, string> {
    if (this.isLocalStorageSupported()) {
      const elements: Record<string, string> = {};

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)!;
        if (key.startsWith(keyStartingWith)) {
          elements[key] = JSON.parse(localStorage.getItem(key)!)!;
        }
      }

      console.log("saves: ", elements);
      return elements;
    }

    return {};
  }

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
      if (!window) return false;

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
