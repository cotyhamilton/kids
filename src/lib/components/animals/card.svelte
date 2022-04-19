<script lang="ts">
	export let emoji: string;
</script>

<div on:click>
	<h1>{emoji}</h1>
</div>

<style>
	div {
		align-items: center;
		background-color: #3f9ed1;
		border-radius: 2rem;
		box-shadow: 0 -8px #1b6390 inset;
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
</style>
