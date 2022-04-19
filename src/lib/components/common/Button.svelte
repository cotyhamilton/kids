<script lang="ts">
</script>

<button {...$$props} on:click>
	<slot />
</button>

<style>
	button {
		background-color: #2ce152;
		border-radius: 1rem;
		border: none;
		box-shadow: 0 -4px #38c15f inset;
		color: inherit;
		cursor: pointer;
		display: block;
		font-size: 2rem;
		font-weight: 700;
		padding: 1rem;
		margin-bottom: 1rem;
		margin-top: 1rem;
		text-transform: uppercase;
		width: 100%;
	}
</style>
