export const composeInitial = (slice: string): object => {
   const serialStore = localStorage.getItem('store') || "{}";
   const store = JSON.parse(serialStore);
   return store[slice] || {};
}

export const putInStore = (slice: string, key: string, value: any) => {
    const serialStore = localStorage.getItem('store') || "{}";
    const store = JSON.parse(serialStore);
    if (!store.hasOwnProperty(slice)) {
        store[slice] = {};
    }
    store[slice][key] = value;
    localStorage.setItem('store', JSON.stringify(store));
}

export const getFromStore = (slice: string , key: string): any => {
    const serialStore = localStorage.getItem('store') || "{}";
    const store = JSON.parse(serialStore);
    return store[slice] && store[slice][key];
}