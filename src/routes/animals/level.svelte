<script lang="ts">
	import { goto } from "$app/navigation";
	import type { ID } from "@directus/sdk";
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
		} else {
			answer = $animalGameLevel.answer;
			options = $animalGameLevel.options;
			const utterance = new SpeechSynthesisUtterance(answer.name);
			speechSynthesis.speak(utterance);
		}
	});

	const onAnimalClick = async (id: ID) => {
		if (id === answer.id) {
			if ($animalGame.lastLevel) {
				await goto("/animals");
			} else {
				$animalGameLevel = $animalGame.getNextGameLevel();
			}
		} else {
			const utterance = new SpeechSynthesisUtterance("Try again");
			speechSynthesis.speak(utterance);
		}
	};

	$: if ($animalGameLevel) {
		answer = $animalGameLevel.answer;
		options = $animalGameLevel.options;
	}

	$: console.log(targetDisabled);
</script>

<button on:click={() => goto("/animals")}>Back</button>

{#if answer}
	<h1>{answer.name}</h1>
{/if}

<div
	class="options-container"
	use:dndzone={{ items: options, flipDurationMs, dropTargetStyle: { outline: "none" } }}
	on:consider={handleOptionsConsider}
	on:finalize={handleOptionsFinalize}
>
	{#each options as option (option.id)}
		<span animate:flip={{ duration: flipDurationMs }}>
			<!-- <AnimalCard emoji={option.emoji} on:click={() => onAnimalClick(option.id)} /> -->
			<AnimalCard emoji={option.emoji} /></span
		>
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
			<span animate:flip={{ duration: flipDurationMs }}
				><AnimalCard emoji={guess.emoji} on:click={() => onAnimalClick(guess.id)} /></span
			>
		{/each}
	</div>
</div>

<style>
	h1 {
		text-align: center;
	}
	.options-container {
		display: flex;
		justify-content: space-around;
	}
	.target-container {
		display: flex;
		justify-content: space-around;
		margin: 3rem;
	}
	.target {
		border: 3px dashed lightskyblue;
		border-radius: 2rem;
		height: 11rem;
		width: 11rem;
	}
	span:focus {
		outline: none;
	}
</style>
