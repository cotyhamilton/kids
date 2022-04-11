<script>
	import { goto } from "$app/navigation";
	import AnimalCard from "$lib/components/animals/card.svelte";
</script>

<h1>Games</h1>

<AnimalCard emoji={"🦄"} on:click={() => goto("/animals")} />
