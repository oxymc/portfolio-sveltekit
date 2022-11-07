<script>
	import { aboutData } from '$lib/stores/aboutStore';
	import { setAboutDoc } from '../../../firebase';
</script>

<div class="form">
	<form on:submit|preventDefault={setAboutDoc($aboutData)}>
		<legend>About info</legend>
		<div class="form-floating mb-2">
			<input
				type="text"
				class="form-control"
				id="floatingCurrentPosition"
				placeholder="current position"
				bind:value={$aboutData.current_position}
			/>
			<label for="floatingCurrentPosition">current position</label>
		</div>
		<div class="form-floating mb-2">
			<textarea
				type="text"
				class="form-control"
				id="floatingSkills"
				placeholder="description"
				bind:value={$aboutData.current_skills}
			/>
			<label for="floatingSkills">current skills</label>
		</div>
		<div class="form-floating mb-2">
			<textarea
				type="text"
				class="form-control"
				id="floatingSkillsDesc"
				placeholder="full desc"
				bind:value={$aboutData.full_desc}
			/>
			<label for="floatingSkillsDesc">full desc</label>
		</div>
		<button class="btn btn-lg btn-dark" type="submit">Update</button>
	</form>
</div>

<style>
	.form {
		margin: 0;
		padding: 0;
	}
	button {
		display: block;
		margin: auto;
	}
</style>
