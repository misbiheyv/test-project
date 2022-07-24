import { KVStorageEngine } from "./interface";

export default class LocalStorageEngine implements KVStorageEngine {
    get(key: string) : ReturnType<KVStorageEngine['get']> {
        return localStorage.getItem(key);
    }
    
    set(key: string, value: string) : ReturnType<KVStorageEngine['set']> {
        localStorage.setItem(key, value);
    }

    remove(key: string) : ReturnType<KVStorageEngine['remove']> {
        localStorage.removeItem(key);
    }
}