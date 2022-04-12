<script lang="ts">
	export let emoji: string;
</script>

<div on:click>
	<h1>{emoji}</h1>
</div>

<style>
	div {
		align-items: center;
		border: 1px solid black;
		border-radius: 2rem;
		display: flex;
		font-size: 2rem;
		height: 100%;
		justify-content: center;
		margin: auto;
		max-width: 200px;
		width: 100%;
	}
	div::before {
		content: "";
		display: block;
		padding-bottom: 100%;
	}

	h1 {
		padding: 0;
		margin: 0;
	}
</style>
