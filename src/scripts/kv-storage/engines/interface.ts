export interface KVStorageEngine {
    get(key: string) : CanBePromise<Nullable<string>>;

    set(key: string, value: string) : CanBePromise<void>;

    remove(key: string) : CanBePromise<void>;
}

type Nullable<T> = T | null | undefined;

type CanBePromise<T> = Promise<T> | T;