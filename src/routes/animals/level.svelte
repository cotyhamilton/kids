<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { animalGame, animalGameLevel } from "$lib/stores/animalGame";
	import type { Animal } from "$lib/types";
	import AnimalCard from "$lib/components/animals/card.svelte";
	import { flip } from "svelte/animate";
	import { dndzone } from "svelte-dnd-action";

	const flipDurationMs = 300;
	function handleOptionsConsider(e) {
		options = e.detail.items;
		// disable target dnd if dragged animal is incorrect
		if (e.detail.info.id !== answer.id) {
			targetDisabled = true;
		} else {
			targetDisabled = false;
		}
	}
	function handleOptionsFinalize(e) {
		options = e.detail.items;
		targetDisabled = false;
	}
	function handleAnswersConsider(e) {
		answers = e.detail.items;
	}
	async function handleAnswersFinalize(e) {
		if (e.detail.items[0].id === answer.id) {
			answers = e.detail.items;
			answers = [];
			if ($animalGame.lastLevel) {
				await goto("/animals");
			} else {
				$animalGameLevel = $animalGame.getNextGameLevel();
			}
		} else {
			options = [...e.detail.items, ...options];
			answers = [];
		}
	}

	let answer: Animal;
	let options: Animal[] = [];
	let answers: Animal[] = [];
	let targetDisabled = false;

	onMount(async () => {
		if (!$animalGameLevel) {
			await goto("/animals");
		}
	});

	$: if ($animalGameLevel) {
		answer = $animalGameLevel.answer;
		options = $animalGameLevel.options;
		const utterance = new SpeechSynthesisUtterance(answer.name);
		speechSynthesis.speak(utterance);
	}
</script>

<button on:click={() => goto("/animals")}>Back</button>

{#if answer}
	<h1>{answer.name}</h1>
{/if}

<div
	class="options-container grid"
	use:dndzone={{ items: options, flipDurationMs, dropTargetStyle: { outline: "none" } }}
	on:consider={handleOptionsConsider}
	on:finalize={handleOptionsFinalize}
>
	{#each options as option (option.id)}
		<span animate:flip={{ duration: flipDurationMs }}> <AnimalCard emoji={option.emoji} /></span>
	{/each}
</div>

<div class="target-container">
	<div
		class="target"
		use:dndzone={{
			items: answers,
			flipDurationMs,
			dropFromOthersDisabled: targetDisabled,
			dropTargetStyle: { outline: "none" }
		}}
		on:consider={handleAnswersConsider}
		on:finalize={handleAnswersFinalize}
	>
		{#each answers as guess (guess.id)}
			<span animate:flip={{ duration: flipDurationMs }}><AnimalCard emoji={guess.emoji} /></span>
		{/each}
	</div>
</div>

<style>
	h1 {
		text-align: center;
	}

	.target-container {
		display: flex;
		justify-content: space-around;
		margin: 3rem;
	}

	.target {
		border: 3px dashed lightskyblue;
		border-radius: 2rem;
		height: 200px;
		width: 200px;
	}

	span:focus {
		outline: none;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 1rem;
	}
</style>
