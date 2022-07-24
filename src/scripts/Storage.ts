export default class Storage {
    setValue(k: string, v: string) {
        localStorage.setItem(k, v);
    }
    get(k: string) {
        localStorage.getItem(k);
    }
    delete(k: string) {
        localStorage.removeItem(k);
    }
}