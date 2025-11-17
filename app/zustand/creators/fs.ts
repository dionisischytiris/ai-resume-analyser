import {getPuter} from "../getPuter";

export const createFsSlice = (set: any, get: any, setError: any) => ({
    write: async (path: string, data: any) => {
        const p = getPuter();
        if (!p) return setError("Puter.js not available");
        return p.fs.write(path, data);
    },

    readDir: async (path: string) => {
        const p = getPuter();
        if (!p) return setError("Puter.js not available");
        return p.fs.readdir(path);
    },

    read: async (path: string) => {
        const p = getPuter();
        if (!p) return setError("Puter.js not available");
        return p.fs.read(path);
    },

    upload: async (files: any) => {
        const p = getPuter();
        if (!p) return setError("Puter.js not available");
        return p.fs.upload(files);
    },

    delete: async (path: string) => {
        const p = getPuter();
        if (!p) return setError("Puter.js not available");
        return p.fs.delete(path);
    },
});
