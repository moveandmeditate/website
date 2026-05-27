import type { SchemaTypeDefinition } from "sanity";
import { eventSchema } from "./event";
import { testimonialSchema } from "./testimonial";
import { founderProfileSchema } from "./founderProfile";
import { siteSettingsSchema } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Singletons first — they show at the top of the desk.
  siteSettingsSchema,
  founderProfileSchema,
  // Collections.
  eventSchema,
  testimonialSchema,
];
