/**
 * Sanity CLI configuration. Read by the `sanity` binary for project ops
 * (e.g. `pnpm dlx sanity dataset export production`, schema deploys).
 *
 * Studio runtime config lives in sanity.config.ts — this file is just
 * about giving the CLI the IDs it needs.
 */
import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "@/sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  // Don't auto-update the Studio runtime; we pin via package.json.
  autoUpdates: false,
});
