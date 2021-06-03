export function cloneClass<T>(instance: T, proto: any): T {
    const clone = Object.assign({}, instance);
    Object.setPrototypeOf(clone, proto);
    return clone;
}