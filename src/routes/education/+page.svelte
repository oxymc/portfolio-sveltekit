<script>
	import { fade } from 'svelte/transition';
</script>

<h1>Studied at</h1>
<div class="container" in:fade>
	<div class="mb-3">
		<div class="row g-0">
			<div class="col-md-5">
				<img src="tnty.webp" class="img-fluid rounded-start" alt="tntu logotype" />
			</div>
			<div class="col-md-7">
				<div class="card-body">
					<p class="card-text">"Ivan Pul'uj" Technical University</p>
					<p class="card-text small"><i class="bi bi-geo-alt" /> Ukraine, Ternopil</p>
					<p class="card-text small"><i class="bi bi-journal-check" /> Specialist diploma</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	img {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
</style>
