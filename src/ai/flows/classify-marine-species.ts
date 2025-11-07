'use server';

/**
 * @fileOverview This file defines a Genkit flow for classifying marine species using a CNN model.
 *
 * classifyMarineSpecies - A function that classifies marine species based on an image.
 * ClassifyMarineSpeciesInput - The input type for the classifyMarineSpecies function.
 * ClassifyMarineSpeciesOutput - The output type for the classifyMarineSpecies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyMarineSpeciesInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of a marine species or otolith, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ClassifyMarineSpeciesInput = z.infer<typeof ClassifyMarineSpeciesInputSchema>;

const ClassifyMarineSpeciesOutputSchema = z.object({
  speciesName: z.string().describe('The predicted name of the marine species.'),
  confidence: z
    .number()
    .describe('The confidence level of the species name prediction (0-1).'),
  otolithMorphology: z
    .string()
    .optional()
    .describe('The predicted otolith morphology, if applicable.'),
  additionalNotes: z
    .string()
    .optional()
    .describe('Any additional notes or observations about the classification.'),
});
export type ClassifyMarineSpeciesOutput = z.infer<typeof ClassifyMarineSpeciesOutputSchema>;

export async function classifyMarineSpecies(
  input: ClassifyMarineSpeciesInput
): Promise<ClassifyMarineSpeciesOutput> {
  return classifyMarineSpeciesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifyMarineSpeciesPrompt',
  input: {schema: ClassifyMarineSpeciesInputSchema},
  output: {schema: ClassifyMarineSpeciesOutputSchema},
  prompt: `You are an expert marine biologist specializing in species identification using image analysis.

You will analyze the provided image and identify the marine species and, if applicable, its otolith morphology. You will also provide a confidence level for your species identification.

Analyze the following image:
{{media url=imageDataUri}}

Ensure your output matches the schema EXACTLY.  Output the speciesName, confidence, otolithMorphology, and any additionalNotes.
`,
});

const classifyMarineSpeciesFlow = ai.defineFlow(
  {
    name: 'classifyMarineSpeciesFlow',
    inputSchema: ClassifyMarineSpeciesInputSchema,
    outputSchema: ClassifyMarineSpeciesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
