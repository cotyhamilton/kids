<script lang="ts">
	import { onMount } from "svelte";
	import type { Animal } from "$lib/types";
	import { getCollection } from "$lib/client";
	import AnimalGame from "$lib/games/animalGame";
	import { animalGame, animalGameLevel } from "$lib/stores/animalGame";
	import { goto } from "$app/navigation";

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

<button on:click={() => goto("/")}>Back</button>
<h1>Animals</h1>
<button on:click={startGame} disabled={!$animalGame}>Play</button>
