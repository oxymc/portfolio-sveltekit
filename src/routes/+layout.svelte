<script>
	import '../app.css';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { adminStatus } from '$lib/stores/userStore';
	import { fade } from 'svelte/transition';
	import ConnectToMe from '$lib/ConnectToMe.svelte';
	import { logout } from '../firebase';
	import { loading } from '$lib/stores/globalStore';
	import LoaderBig from '$lib/LoaderBig.svelte';
	import { base } from '$app/paths';

	let menuIsOpen = false;

	onMount(() => {
		if (browser) {
			$adminStatus = sessionStorage.getItem('logined') === 'true' ? true : false;
		}
	});
</script>

<header>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container navbar__container">
			<a class="navbar-brand" href="/" on:click={() => (menuIsOpen = false)}
				><img src="photo.webp" alt="mdo" width="24" height="24" class="rounded-circle" /></a
			>
			<button
				class="navbar-toggler"
				class:open={menuIsOpen}
				on:click={() => (menuIsOpen = !menuIsOpen)}
				type="button"
			>
				<span class="navbar-toggler-icon" />
			</button>
			<div class="collapse navbar-collapse">
				<div class="navbar-nav">
					<a class="nav-link" href="{base}/education" on:click={() => (menuIsOpen = false)}
						>Education</a
					>
					<a class="nav-link" href="{base}/skills" on:click={() => (menuIsOpen = false)}>Skills</a>
					<a class="nav-link" href="{base}/learn" on:click={() => (menuIsOpen = false)}
						>Learning now</a
					>
				</div>
			</div>
		</div>
	</nav>
</header>
<main>
	<div in:fade>
		<slot />
	</div>
	<div class="d-sm-flex flex-column flex-shrink-0 bg-dark sidebar pt-2 pb-2" style="width: 4.5rem;">
		{#if $loading}
			<LoaderBig />
		{:else}
			<a class="link__admin text-center" href="{base}/admin" on:click={() => (menuIsOpen = false)}>
				<i class="bi bi-gear" />
			</a>
			<div class="nav nav-pills nav-flush flex-column mb-auto mt-auto text-center">
				<ConnectToMe />
			</div>
			<div class="d-flex flex-column text-center">
				{#if $adminStatus}
					<a href="/" on:click={logout} on:click={() => (menuIsOpen = false)}>
						<i class="bi bi-box-arrow-left" />
					</a>
				{:else}
					<a href="{base}/admin" on:click={() => (menuIsOpen = false)}>
						<i class="bi bi-box-arrow-in-right" />
					</a>
				{/if}
			</div>
		{/if}
	</div>
</main>

<style>
	.link__admin {
		color: white;
	}
	.sidebar {
		position: absolute;
		left: auto;
		right: 0;
		height: 100%;
		top: 0;
	}
	@media (min-width: 1280px) {
		.navbar {
			padding-left: 235px;
		}
		.navbar__container {
			margin-left: 0;
		}
	}
	@media (max-width: 991px) {
		.sidebar {
			top: auto;
			bottom: 0;
			width: 100% !important;
			height: auto;
			display: flex;
			justify-content: space-around;
			align-items: center;
			flex-direction: row !important;
		}
		.nav {
			flex-direction: row !important;
		}
		.sidebar :global(a) {
			font-size: 20px;
			margin: 1rem;
		}
		.navbar-toggler.open + .navbar-collapse {
			display: block;
		}
	}
	@media (max-width: 1279px) {
		main > div:first-child::after {
			display: none;
		}
	}
</style>
