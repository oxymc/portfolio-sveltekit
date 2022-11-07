<script>
	import { loading } from '$lib/stores/globalStore';
	import { fade } from 'svelte/transition';
	import { skillsDataList } from '$lib/stores/skillsStore';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import LoaderBig from '$lib/LoaderBig.svelte';
	import { getSkillsDoc } from '../../firebase';

	onMount(async () => {
		if (browser) {
			$skillsDataList = await getSkillsDoc();
		}
	});
</script>

<h1 class="card-title">My skills</h1>
<div class="container" in:fade>
	{#if $loading}
		<div class="loader__fh">
			<LoaderBig />
		</div>
	{:else}
		<div class="skills-wrp row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
			{#each $skillsDataList.sort((a, b) => a.order - b.order) as item}
				{#if item.status}
					<div class="col d-flex align-items-start">
						<i class="bi {item.icon}" />
						<div class="mx-2">
							<h3 class="fw-bold mb-0 fs-4">{item.name}</h3>
							<p class="text-muted">{item.description}</p>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	@media (min-width: 992px) {
		.skills-wrp {
			padding-right: 40px;
		}
	}
</style>
