<script>
	import { learnDataList } from '$lib/stores/learnStore';
	import { setLearningDoc, removeLearnItem } from '../../../firebase';
</script>

<div class="form">
	<div>
		<legend>Learning info</legend>
		{#each $learnDataList as item}
			<form on:submit|preventDefault={setLearningDoc(item)}>
				<div class="form-floating mb-2 d-flex">
					<input
						type="text"
						class="form-control m-1"
						id="floatingWayName"
						placeholder="name"
						bind:value={item.name}
					/>
					<input
						type="number"
						class="form-control m-1"
						id="floatingWayVal"
						placeholder="value"
						min="0"
						max="100"
						step="5"
						bind:value={item.value}
					/>
				</div>
				<div class="d-flex justify-content-between mb-3">
					<button class="btn btn-lg btn-dark m-1" type="submit">Update</button>
					<button class="btn btn-lg btn-outline-danger m-1" on:click={removeLearnItem(item)}
						>Remove</button
					>
				</div>
			</form>
		{/each}
	</div>
</div>

<style>
	.form {
		margin: 0;
		padding: 0;
	}
	.form input {
		padding-top: 0;
		padding-bottom: 0;
	}
	button {
		max-width: 49%;
	}
</style>
