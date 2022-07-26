import type { IEmployee } from '../employee';

export type IEValidatorKey = keyof IEmployee

export type IEValidatorOpts = {
    [K in IEValidatorKey]: boolean
};

export type IEValidator = {
    [K in keyof IEmployee]: (p: any) => boolean
};

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

export type { IEmployee } from '../employee';