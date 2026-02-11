import { atom } from 'nanostores';

export const isLoading = atom(false);

export const setLoading = (loading: boolean) => {
    isLoading.set(loading);
};
