import { browser } from '$app/environment';
import { getAboutDoc } from '../firebase';
import { updateLoading } from '../lib/stores/globalStore';

export async function load() {
	updateLoading(true)
	if (browser) {
		getAboutDoc(`${import.meta.env.VITE_DB_ABOUT_ID}`)
	}
}
