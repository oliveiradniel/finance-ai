import { z } from "zod";

import { isMatch } from "date-fns";

export const generateAiReportSchema = z.object({
  month: z.string().refine((value) => isMatch(value, "MM")),
});

export type GenerateAiReportSchema = z.infer<typeof generateAiReportSchema>;
