import { writable } from "svelte/store";
import type AnimalGame from "../games/animalGame";
import type { AnimalGameLevel } from "../types";

export const animalGameLevel = writable<AnimalGameLevel>();
export const animalGame = writable<AnimalGame>();
