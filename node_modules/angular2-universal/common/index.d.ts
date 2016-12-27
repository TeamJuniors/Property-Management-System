export declare const zoneProps: WeakMap<any, any>;
export declare class ZoneStore {
    zone: any;
    constructor(props?: any);
    clear(): void;
    setMap(obj: any): void;
    get(key: any): any;
    set(key: any, value: any): this;
    has(key: any): any;
}
