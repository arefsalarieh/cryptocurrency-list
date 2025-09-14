import { Cryptocurrency } from '@/types/crypto';

const DB_NAME = 'CryptoDB';
const DB_VERSION = 1;
const STORE_NAME = 'cryptocurrencies';

class IndexedDBService {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        reject(new Error('Failed to open IndexedDB'));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          store.createIndex('cmcRank', 'cmcRank', { unique: false });
          store.createIndex('lastUpdated', 'lastUpdated', { unique: false });
        }
      };
    });
  }

  async saveCryptocurrencies(cryptocurrencies: Cryptocurrency[]): Promise<void> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      store.clear();

      cryptocurrencies.forEach((crypto) => {
        store.add(crypto);
      });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(new Error('Failed to save cryptocurrencies'));
    });
  }

  async getCryptocurrencies(limit: number = 10, offset: number = 0): Promise<Cryptocurrency[]> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('cmcRank');
      
      const request = index.openCursor();
      const results: Cryptocurrency[] = [];
      let count = 0;
      let skipped = 0;

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        
        if (cursor) {
          if (skipped < offset) {
            skipped++;
            cursor.continue();
            return;
          }
          
          if (count < limit) {
            results.push(cursor.value);
            count++;
            cursor.continue();
          } else {
            resolve(results);
          }
        } else {
          resolve(results);
        }
      };

      request.onerror = () => {
        reject(new Error('Failed to get cryptocurrencies'));
      };
    });
  }

  async getTotalCount(): Promise<number> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.count();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(new Error('Failed to get total count'));
      };
    });
  }

  async getLastUpdated(): Promise<string | null> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('lastUpdated');
      const request = index.openCursor(null, 'prev');

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          resolve(cursor.value.lastUpdated);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => {
        reject(new Error('Failed to get last updated'));
      };
    });
  }

  async clearData(): Promise<void> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to clear data'));
    });
  }

  async isDataStale(maxAgeMinutes: number = 5): Promise<boolean> {
    const lastUpdated = await this.getLastUpdated();
    if (!lastUpdated) return true;

    const lastUpdateTime = new Date(lastUpdated).getTime();
    const currentTime = new Date().getTime();
    const maxAge = maxAgeMinutes * 60 * 1000;

    return (currentTime - lastUpdateTime) > maxAge;
  }
}

export const indexedDBService = new IndexedDBService();
