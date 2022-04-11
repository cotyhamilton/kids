import type { ID } from "@directus/sdk";

export type Animal = {
	id?: ID;
	emoji?: string;
	name?: string;
};

export type AnimalGameLevel = {
	answer: Animal;
	options: Animal[];
};
