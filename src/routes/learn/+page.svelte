<script>
	import LoaderBig from '$lib/LoaderBig.svelte';
	import { loading } from '$lib/stores/globalStore';
	import { learnDataList } from '$lib/stores/learnStore';
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { getLearningDoc } from '../../firebase';

	let filledSymbol = '■';
	let emptySymbol = '□';

	onMount(async () => {
		if (browser) {
			$learnDataList = await getLearningDoc();
		}
	});
</script>

<h1>Learning...</h1>
<div class="container" in:fade>
	{#if $loading}
		<div class="loader__fh">
			<LoaderBig />
		</div>
	{:else}
		<div class="learning-wrp row">
			{#each $learnDataList as item}
				<div class="d-flex align-items-start mb-4">
					<div class="m-auto">
						<h3 class="fw-bold mb-0 fs-2">{item.name}</h3>
						<div class="d-flex fs-3">
							<span class="graph d-flex"
								>{filledSymbol.repeat(Math.ceil(item.value / 10))}{emptySymbol.repeat(
									Math.floor((100 - item.value) / 10)
								)}
							</span>
							<span class="value">{item.value}%</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.graph {
		letter-spacing: -4px;
	}
	.value {
		padding-left: 8px;
		min-width: 66px;
	}
	.learning-wrp {
		padding-top: 5vw;
		padding-bottom: 5vw;
	}
</style>
