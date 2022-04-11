import { Directus, type PartialItem } from "@directus/sdk";
import { get } from "svelte/store";
import { appSettingsStore } from "./stores/appsettings";

const directus = new Directus(get(appSettingsStore).API_URL);

const getCollection = async <T extends PartialItem<T>>(
	collection: string
): Promise<PartialItem<T>[]> => {
	const { data } = await directus.items<string, T>(collection).readByQuery({
		fields: ["*"]
	});
	return data;
};

export { directus, getCollection };
