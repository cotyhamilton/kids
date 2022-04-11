import type { ID } from "@directus/sdk";
import type { Animal, AnimalGameLevel } from "../types";

class AnimalGame {
	animals: Animal[];
	numOptions = 3;
	levels: AnimalGameLevel[] = [];
	levelIndex = 0;
	lastLevel = false;

	constructor(animals: Animal[], numLevels: number) {
		this.animals = animals;
		this.buildGame(numLevels);
	}

	private buildGame(numLevels: number): void {
		for (let i = 0; i < numLevels; ++i) {
			const levelAnimalIds = [];
			for (let j = 0; j < this.numOptions; ++j) {
				let animalId: ID;
				do {
					animalId = this.animals[Math.floor(Math.random() * this.animals.length)].id;
				} while (levelAnimalIds.includes(animalId));

				levelAnimalIds.push(animalId);
			}
			const levelAnimals = levelAnimalIds.map((id) =>
				this.animals.find((animal) => animal.id === id)
			);
			this.levels.push(this.buildLevel(levelAnimals));
		}
	}

	private buildLevel(animals: Animal[]): AnimalGameLevel {
		const answer = animals[Math.floor(Math.random() * animals.length)];
		return { answer, options: [...animals] };
	}

	public getLevels(): AnimalGameLevel[] {
		return this.levels;
	}

	public getNextGameLevel(): AnimalGameLevel {
		const level = this.levels[this.levelIndex];
		if (this.levelIndex === this.levels.length - 1) {
			this.lastLevel = true;
		}
		this.levelIndex++;
		return level;
	}
}

export default AnimalGame;
