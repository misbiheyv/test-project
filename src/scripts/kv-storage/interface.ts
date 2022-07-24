import { KVStorageEngine } from './engines';
export {default as localStorageEngine} from './engines/localStorage';
export {default as sessionStorageEngine} from './engines/sessionStorage';

export { KVStorageEngine } from './engines';

export type KVStorageOptions = {
    engine?: KVStorageEngine;
}


export type SerializableValue = 
    SerializablePrimitiveValue |
    SerializablePrimitiveValue[] |
    Record<string, SerializablePrimitiveValue> |
    { toJSON(): SerializableValue };

export type SerializablePrimitiveValue = 
    string |
    number |
    boolean |
    null;