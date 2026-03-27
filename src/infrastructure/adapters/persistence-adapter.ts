import { openDB, IDBPDatabase } from 'idb';
import { Measurement } from '@/domain/types';

const DB_NAME = 'FlotSimDB';
const STORE_NAME = 'measurements';

export class PersistenceAdapter {
  private static db: Promise<IDBPDatabase>;

  static init() {
    this.db = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, {
            keyPath: 'id',
            autoIncrement: true,
          });
          store.createIndex('timestamp', 'timestamp');
          store.createIndex('variable', 'variable');
        }
      },
    });
  }

  static async saveMeasurement(measurement: Measurement) {
    const db = await this.db;
    return db.add(STORE_NAME, measurement);
  }

  static async getLatestMeasurements(variable: string, limit = 50) {
    const db = await this.db;
    const tx = db.transaction(STORE_NAME, 'readonly');
    const index = tx.store.index('variable');
    const results = await index.getAll(variable);
    return results.slice(-limit);
  }

  static async clearAll() {
    const db = await this.db;
    return db.clear(STORE_NAME);
  }
}
