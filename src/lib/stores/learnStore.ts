import { writable } from 'svelte/store';

export const learnDataForAdd = writable({})
export const learnDataList = writable([])

export const updateLearnData = (obj: any) => {
	learnDataList.set(obj);
};