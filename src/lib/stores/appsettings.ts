import { readable } from "svelte/store";
import type { Appsettings } from "../types";
import APPSETTINGS from "../../routes/appsettings.json";

export const appSettingsStore = readable<Appsettings>(APPSETTINGS);
