// A flow to identify species from eDNA samples using ML-based genetic sequence matching.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EDNAInputSchema = z.object({
  ednaDataUri: z
    .string()
    .describe(
      "The eDNA sample data as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().optional().describe('Optional description of the eDNA sample.'),
});
export type EDNAInput = z.infer<typeof EDNAInputSchema>;

const EDNAOutputSchema = z.object({
  speciesMatches: z
    .array(z.object({species: z.string(), confidence: z.number()}))
    .describe('A list of species identified from the eDNA sample and their confidence scores.'),
});
export type EDNAOutput = z.infer<typeof EDNAOutputSchema>;

export async function identifySpeciesFromEDNA(input: EDNAInput): Promise<EDNAOutput> {
  return identifySpeciesFromEDNAFlow(input);
}

const identifySpeciesFromEDNAPrompt = ai.definePrompt({
  name: 'identifySpeciesFromEDNAPrompt',
  input: {schema: EDNAInputSchema},
  output: {schema: EDNAOutputSchema},
  prompt: `You are an expert in marine biology and genetics. You will analyze eDNA samples to identify the species present in the sample.

Analyze the following eDNA sample data to identify the species present. Return a list of species matches and their confidence scores.

eDNA Sample: {{media url=ednaDataUri}}
Description: {{{description}}}

Format your response as a JSON object matching the EDNAOutputSchema schema.`,
});

const identifySpeciesFromEDNAFlow = ai.defineFlow(
  {
    name: 'identifySpeciesFromEDNAFlow',
    inputSchema: EDNAInputSchema,
    outputSchema: EDNAOutputSchema,
  },
  async input => {
    const {output} = await identifySpeciesFromEDNAPrompt(input);
    return output!;
  }
);
