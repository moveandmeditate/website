import type { SchemaTypeDefinition } from "sanity";
import { authorSchema } from "./author";
import { blogPostSchema } from "./blogPost";
import { brandSchema } from "./brand";
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
  brandSchema,
  blogPostSchema,
  authorSchema,
];
