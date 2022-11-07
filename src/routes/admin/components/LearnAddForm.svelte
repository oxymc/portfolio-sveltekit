<script>
	import { learnDataForAdd } from '$lib/stores/learnStore';
	import { addLearningDoc } from '../../../firebase';
</script>

<div class="form">
	<form
		on:submit|preventDefault={addLearningDoc(this, $learnDataForAdd.name, $learnDataForAdd.value)}
	>
		<legend>Learning info</legend>
		<div class="form-floating mb-2">
			<input
				type="text"
				class="form-control"
				id="floatingWayName"
				placeholder="name"
				bind:value={$learnDataForAdd.name}
			/>
			<label for="floatingWayName">name</label>
		</div>
		<div class="form-floating mb-2">
			<input
				type="number"
				class="form-control"
				id="floatingWayVal"
				placeholder="value"
				min="0"
				max="100"
				step="5"
				bind:value={$learnDataForAdd.value}
			/>
			<label for="floatingWayVal">value</label>
		</div>
		<button class="btn btn-lg btn-dark" type="submit">Add</button>
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
