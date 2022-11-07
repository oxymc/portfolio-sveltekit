<script>
	import { login } from '../firebase';
	import { user } from '$lib/stores/userStore';
</script>

<div class="form-signin">
	<form on:submit|preventDefault={login($user)}>
		<h2 class="h3 mb-3 fw-normal">Please sign in</h2>

		<div class="form-floating mb-2 ">
			<input
				type="email"
				class="form-control"
				id="floatingInput"
				placeholder="name@example.com"
				bind:value={$user.email}
			/>
			<label for="floatingInput">Email address</label>
		</div>
		<div class="form-floating mb-2">
			<input
				type="password"
				class="form-control"
				id="floatingPassword"
				placeholder="Password"
				bind:value={$user.pass}
			/>
			<label for="floatingPassword">Password</label>
		</div>
		<button class="btn btn-lg btn-dark" type="submit">Sign in</button>
	</form>
</div>

<style>
	.form-signin {
		width: 100%;
		max-width: 330px;
		padding: 15px;
		margin: auto;
	}
	button {
		display: block;
		margin: auto;
	}
</style>
