<script>
	import { goto } from "$app/navigation";
	import AnimalCard from "$lib/components/animals/card.svelte";
	import Heading from "../lib/components/common/Heading.svelte";
</script>

<Heading>Games</Heading>

<AnimalCard emoji={"🦄"} on:click={() => goto("/animals")} />
