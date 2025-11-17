import {getPuter} from "../getPuter";

export const createKVSlice = (set: any, get: any, setError: any) => ({
    get: async (key: string) => {
        const p = getPuter();
        if (!p) return setError("Puter.js not available");
        return p.kv.get(key);
    },

    set: async (key: string, value: string) => {
        const p = getPuter();
        if (!p) return setError("Puter.js not available");
        return p.kv.set(key, value);
    },

    delete: async (key: string) => {
        const p = getPuter();
        if (!p) return setError("Puter.js not available");
        return p.kv.delete(key);
    },

    list: async (pattern: string, returnValues?: boolean) => {
        const p = getPuter();
        if (!p) return setError("Puter.js not available");
        return p.kv.list(pattern, returnValues ?? false);
    },

    flush: async () => {
        const p = getPuter();
        if (!p) return setError("Puter.js not available");
        return p.kv.flush();
    },
});

//The kv.ts file in your store stands for “Key-Value” — basically, it’s a slice of your Zustand store that deals with a key-value storage system provided by window.puter.kv.

//Why we split it into kv.ts
//
// Originally, your Zustand store had all the code in one huge file. By splitting kv operations into their own slice:
//
// It’s easier to read and maintain.
//
// You can focus just on key-value logic without getting lost in authentication or file handling.
//
// It keeps your store modular, so each piece of functionality lives in its own file.
//
// In short: kv.ts is your interface to the Puter key-value store inside the Zustand store.