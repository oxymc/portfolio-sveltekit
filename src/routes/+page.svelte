<script>
	import { loading } from '$lib/stores/globalStore';
	import { fade } from 'svelte/transition';
	import { aboutData } from '$lib/stores/aboutStore';
	import LoaderBig from '$lib/LoaderBig.svelte';
	import ConnectToMe from '$lib/ConnectToMe.svelte';
</script>

<h1 class="card-title">About me</h1>
<div class="container" in:fade>
	{#if $loading}
		<LoaderBig />
	{:else}
		<div class="mb-3">
			<div class="row g-0">
				<div class="col-md-4">
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img src="photo.webp" class="img-fluid rounded-circle" alt="my photo" />
					<h2 class="card-text text-center">Maxym Balagur</h2>
					<p class="card-text small text-center">{$aboutData.current_position}</p>
				</div>
				<div class="col-md-8">
					<div class="card-body">
						<p class="card-text">
							{$aboutData.full_desc}
						</p>
						<p class="card-text small mt-4 mb-4">
							<small class="text-muted">{$aboutData.current_skills}</small>
						</p>
						<h2 class="card-title">Contact me</h2>
						<div class="d-flex about__socials">
							<ConnectToMe />
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.about__socials :global(a) {
		margin: 1rem 2rem 1rem 0;
		font-size: 44px;
		color: rgb(33, 37, 41);
	}
	img {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
	.card-text.small {
		margin-bottom: 1rem;
	}

	@media (min-width: 992px) {
		.card-body .card-text:first-child {
			padding-right: 1rem;
		}
	}
</style>
