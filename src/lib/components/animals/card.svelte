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
		cursor: pointer;
		display: flex;
		font-size: 3rem;
		height: 10rem;
		justify-content: center;
		width: 10rem;
	}
</style>
