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