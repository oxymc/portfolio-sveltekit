import { writable } from 'svelte/store';

export const user = writable({
  email: "",
  pass: "",
})

export const adminStatus = writable(false)

export const updateAdminStatus = (status: boolean) => {
	adminStatus.set(status);
};