<script lang="ts">
	import { onMount } from "svelte";
	import type { Animal } from "$lib/types";
	import { getCollection } from "$lib/client";
	import AnimalGame from "$lib/games/animalGame";
	import { animalGame, animalGameLevel } from "$lib/stores/animalGame";
	import BackButton from "$lib/components/common/BackButton.svelte";
	import { goto } from "$app/navigation";
	import Button from "../../lib/components/common/Button.svelte";
	import Heading from "../../lib/components/common/Heading.svelte";

	let animals: Animal[] = [];

	onMount(async () => {
		const collection = "animals";
		try {
			animals = await getCollection<Animal>(collection);
		} catch (error) {
			console.error({ message: "Error on fetch", reason: error.message, collection });
		}
		$animalGame = new AnimalGame(animals, 10);
	});

	const startGame = () => {
		$animalGameLevel = $animalGame.getNextGameLevel();
		goto("/animals/level");
	};
</script>

<BackButton on:click={() => goto("/")} />
<Heading>Animals</Heading>
<Button on:click={startGame} disabled={!$animalGame}>play</Button>
