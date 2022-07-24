import KVFactory from "./KVFactory";
import type { KVStorageOptions } from "./interface";

export { localStorageEngine, sessionStorageEngine } from "./interface";

export default function factory(
    opts: KVStorageOptions,
    namespace: string = 'default'
) : KVFactory {
    return new KVFactory(namespace, opts)
}

export { 

    KVStorageOptions,
    KVStorageEngine,
    SerializableValue

} from './interface'