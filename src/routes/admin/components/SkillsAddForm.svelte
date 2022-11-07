<script>
	import { skillsDataForAdd, skillsDataList } from '$lib/stores/skillsStore';
	import { addSkillsDoc } from '../../../firebase';
</script>

<div class="form">
	<form
		on:submit|preventDefault={addSkillsDoc(
			this,
			$skillsDataForAdd.name,
			$skillsDataForAdd.description,
			$skillsDataForAdd.icon,
			$skillsDataForAdd.status,
			$skillsDataList.length + 1
		)}
	>
		<legend>Skills info add</legend>
		<div class="form-floating mb-2">
			<input
				type="text"
				class="form-control"
				id="floatingSkillName"
				placeholder="name"
				bind:value={$skillsDataForAdd.name}
			/>
			<label for="floatingSkillName">name</label>
		</div>
		<div class="form-floating mb-2">
			<input
				type="text"
				class="form-control"
				id="floatingSkillIcon"
				placeholder="icon"
				bind:value={$skillsDataForAdd.icon}
			/>
			<label for="floatingSkillIcon">icon</label>
			<p>
				take icon-name from: <a href="https://icons.getbootstrap.com/" target="_blank"
					>bootstrap lib</a
				>
			</p>
		</div>
		<div class="form-floating mb-2">
			<textarea
				type="text"
				class="form-control"
				id="floatingSkillsDesc"
				placeholder="description"
				bind:value={$skillsDataForAdd.description}
			/>
			<label for="floatingSkillsDesc">description</label>
		</div>
		<div class="form-check mb-2">
			<input
				class="form-check-input"
				type="checkbox"
				id="flexCheckChecked"
				bind:checked={$skillsDataForAdd.status}
			/>
			<label class="form-check-label" for="flexCheckChecked"> Active </label>
		</div>
		<button class="btn btn-lg btn-dark" type="submit">Add</button>
	</form>
</div>

<style>
	.form {
		margin: 0;
		padding: 0;
	}
	.form button {
		display: block;
		margin: auto;
	}
</style>
