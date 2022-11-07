<script>
	import { adminStatus } from '$lib/stores/userStore';
	import AuthForm from '$lib/AuthForm.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { learnDataList } from '$lib/stores/learnStore';
	import { skillsDataList } from '$lib/stores/skillsStore';
	import SkillsAddForm from './components/SkillsAddForm.svelte';
	import AboutChangeForm from './components/AboutChangeForm.svelte';
	import LearnAddForm from './components/LearnAddForm.svelte';
	import LearnUpdateForm from './components/LearnUpdateForm.svelte';
	import { getLearningDoc, getSkillsDoc } from '../../firebase';
	import SkillsUpdateForm from './components/SkillsUpdateForm.svelte';

	let addLearningFormStatus = false;
	let updLearningFormStatus = false;
	let updAboutForm = false;
	let addSkillForm = false;
	let updSkillForm = false;

	onMount(async () => {
		if (browser) {
			$learnDataList = await getLearningDoc();
			$skillsDataList = await getSkillsDoc();
		}
	});

	const openForm = (target) => {
		switch (target) {
			case 'aboutUpdate':
				updAboutForm = true;
				break;
			case 'skillAdd':
				addSkillForm = true;
				break;
			case 'skillUpdate':
				updSkillForm = true;
				break;
			case 'learningAdd':
				addLearningFormStatus = true;
				break;
			case 'learningUpdate':
				updLearningFormStatus = true;
				break;
			default:
				break;
		}
	};
	const backToMainPage = () => {
		addLearningFormStatus = false;
		updLearningFormStatus = false;
		updAboutForm = false;
		addSkillForm = false;
		updSkillForm = false;
	};
</script>

<h1>Admin panel</h1>
<div id="forModal" class="container" in:fade>
	{#if $adminStatus}
		<div class="admin-page row g-4 py-5 row-cols-1 row-cols-xl-3">
			<div class="feature col">
				<div
					class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"
				/>
				<h3 class="fs-2 text-center"><i class="bi bi-person" /> About info</h3>
				{#if updAboutForm}
					<div class="modalForm d-flex align-items-center justify-content-center">
						<AboutChangeForm />
						<div class="d-flex align-items-center justify-content-center mt-2">
							<button class="btn btn-lg btn-danger" on:click={backToMainPage}>Back</button>
						</div>
					</div>
				{:else}
					<div class="d-flex align-items-center justify-content-center mt-2 p-2">
						<button class="btn btn-lg btn-dark" on:click={() => openForm('aboutUpdate')}
							>Update</button
						>
					</div>
				{/if}
			</div>
			<div class="feature col">
				<div
					class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"
				/>
				<h3 class="fs-2 text-center"><i class="bi bi-briefcase" /> Skills info</h3>
				{#if addSkillForm}
					<div class="modalForm d-flex align-items-center justify-content-center">
						<SkillsAddForm />
						<div class="d-flex align-items-center justify-content-center mt-2">
							<button class="btn btn-lg btn-danger" on:click={backToMainPage}>Back</button>
						</div>
					</div>
				{:else if updSkillForm}
					<div class="modalForm d-flex align-items-center justify-content-center">
						<SkillsUpdateForm />
						<div class="d-flex align-items-center justify-content-center mt-2">
							<button class="btn btn-lg btn-danger" on:click={backToMainPage}>Back</button>
						</div>
					</div>
				{:else}
					<div class="d-flex align-items-center justify-content-center mt-2 p-2">
						<button class="btn btn-lg btn-dark" on:click={() => openForm('skillAdd')}>Add</button>
						<span class="mx-3">or</span>
						<button class="btn btn-lg btn-dark" on:click={() => openForm('skillUpdate')}
							>Update</button
						>
					</div>
				{/if}
			</div>
			<div class="feature col">
				<div
					class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"
				/>
				<h3 class="fs-2 text-center"><i class="bi bi-book" /> Learning info</h3>
				{#if addLearningFormStatus}
					<div class="modalForm d-flex align-items-center justify-content-center">
						<LearnAddForm />
						<div class="d-flex align-items-center justify-content-center mt-2">
							<button class="btn btn-lg btn-danger" on:click={backToMainPage}>Back</button>
						</div>
					</div>
				{:else if updLearningFormStatus}
					<div class="modalForm d-flex align-items-center justify-content-center">
						<LearnUpdateForm />
						<div class="d-flex align-items-center justify-content-center mt-2">
							<button class="btn btn-lg btn-danger" on:click={backToMainPage}>Back</button>
						</div>
					</div>
				{:else}
					<div class="d-flex align-items-center justify-content-center p-2">
						<button class="btn btn-lg btn-dark" on:click={() => openForm('learningAdd')}>Add</button
						>
						<span class="mx-3">or</span>
						<button class="btn btn-lg btn-dark" on:click={() => openForm('learningUpdate')}
							>Update</button
						>
					</div>
				{/if}
			</div>
		</div>
	{:else}
		<AuthForm />
	{/if}
</div>

<style>
	button {
		max-width: 330px;
		width: max-content !important;
	}
	.modalForm {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		background-color: #fff;
		flex-direction: column;
		z-index: 1;
		padding: 20px;
	}
	.modalForm > * {
		width: 100%;
	}
	.btn-danger {
		position: absolute;
		top: 20px;
		right: 20px;
	}
	#forModal {
		padding-top: 5vw;
		padding-bottom: 5vw;
	}
	.admin-page {
		padding-top: 0 !important;
	}

	@media (max-width: 1279px) {
		.feature {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
		}
		h3 {
			margin: 0;
		}
	}
	@media (min-width: 1200px) {
		.feature {
			justify-content: center;
		}
		h3 {
			width: 100%;
		}
	}
</style>
