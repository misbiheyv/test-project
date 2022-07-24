import type
{ 

    KVStorageOptions,
    KVStorageEngine,
    SerializableValue

} from "./interface";

import DefaultEngine from './engines';

export default class KVFactory {
    readonly namespace: string;
    private engine: KVStorageEngine;

    private get getNamespacePrefix() : string {
        return `[[${this.namespace}]]-`
    }

    constructor(
        namespace : string,
        opts: KVStorageOptions = {engine: new DefaultEngine()}
    ) {
        this.namespace = namespace
        this.engine = opts.engine
    }

    async get<T extends SerializableValue>(key: string) : Promise<T | null> {
        const namespacedKey = this.getNamespacePrefix + key;
        const rawData = await this.engine.get(namespacedKey)
        return JSON.parse(rawData)
    }
    
    async set(key: string, value: SerializableValue) : Promise<void>{
        const namespacedKey = this.getNamespacePrefix + key;
        await this.engine.set(namespacedKey, JSON.stringify(value))
    }

    async remove(key: string) : Promise<void>{
        const namespacedKey = this.getNamespacePrefix + key;
        await this.engine.remove(namespacedKey)
    }
}