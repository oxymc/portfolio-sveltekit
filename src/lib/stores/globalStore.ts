import { writable } from 'svelte/store';

export const loading = writable(false)

export const updateLoading = (status: boolean) => {
	loading.set(status);
};