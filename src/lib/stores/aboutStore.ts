import { writable } from 'svelte/store';

export const aboutData = writable({})

export const updateAboutData = (obj: any) => {
	aboutData.set(obj);
};