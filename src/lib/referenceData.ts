import raw from "@/data/latest.json";
import type { ReferenceDataFile, ReferenceItem } from "@/types";

/**
 * The only place the app touches the JSON file. Swap this module for a fetch()
 * or an API client later and nothing else has to change.
 */
const data = raw as ReferenceDataFile;

export const referenceItems: readonly ReferenceItem[] = data.items;
export const dataUpdatedAt: string = data.updatedAt;
export const dataQuality: ReferenceDataFile["dataQuality"] = data.dataQuality;
