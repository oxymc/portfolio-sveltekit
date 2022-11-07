import { writable } from 'svelte/store';

export const skillsDataForAdd = writable({})
export const skillsDataList = writable([])

export const updateSkillsDataList = (arr: any) => {
	skillsDataList.set(arr);
};
export const resetDataForAdd = () => {
	skillsDataForAdd.set({});
};