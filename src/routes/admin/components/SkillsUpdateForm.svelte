<script>
	import { skillsDataList } from '$lib/stores/skillsStore';
	import { setSkillDoc } from '../../../firebase';
</script>

<div class="form">
	<div class="d-flex flex-wrap p-md-5">
		<legend class="px-2">Skills info update</legend>
		{#each $skillsDataList.sort((a, b) => a.order - b.order) as item}
			<form class="form-wrp d-flex p-2" on:submit|preventDefault={setSkillDoc(item)}>
				<div class="form-floating d-flex">
					<input
						type="text"
						class="form-control mx-1 name"
						placeholder="name"
						bind:value={item.name}
					/>
					<input
						type="text"
						class="form-control mx-1 desc"
						placeholder="value"
						bind:value={item.description}
					/>
					<input
						type="number"
						class="form-control mx-1"
						placeholder="name"
						bind:value={item.order}
					/>
				</div>
				<button class="btn btn-lg btn-dark" type="submit">Update</button>
			</form>
		{/each}
	</div>
</div>

<style>
	legend {
		width: 100%;
	}
	.form {
		margin: 0;
		padding: 0;
		max-width: none;
	}
	.form input {
		padding-top: 0;
		padding-bottom: 0;
	}
	input {
		min-width: 10vw;
	}
	input[type='number'] {
		max-width: 80px;
		min-width: 80px;
	}
	.name {
		font-weight: 600;
	}
	.desc {
		min-width: 20vw;
	}
	@media (max-width: 991px) {
		.form > div {
			height: 80vh;
			overflow: auto;
		}
		.form-wrp,
		.form-floating {
			flex-wrap: wrap;
		}
		.form-floating > * {
			margin-bottom: 0.5rem;
		}
	}
</style>
