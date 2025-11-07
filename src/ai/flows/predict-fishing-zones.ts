'use server';

/**
 * @fileOverview An AI agent to predict potential fishing zones based on sea surface temperature and catch data.
 *
 * - predictFishingZones - A function that handles the prediction of fishing zones.
 * - PredictFishingZonesInput - The input type for the predictFishingZones function.
 * - PredictFishingZonesOutput - The return type for the predictFishingZones function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictFishingZonesInputSchema = z.object({
  sstData: z.string().describe('Sea Surface Temperature (SST) data as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'),
  catchData: z.string().describe('Catch data as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'),
  additionalFactors: z.string().optional().describe('Additional factors influencing fish migration and spawning patterns.'),
});
export type PredictFishingZonesInput = z.infer<typeof PredictFishingZonesInputSchema>;

const PredictFishingZonesOutputSchema = z.object({
  fishingZones: z.string().describe('Predicted potential fishing zones as a geojson data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'),
  confidenceLevel: z.number().describe('The confidence level of the prediction (0-1).'),
  explanation: z.string().describe('Explanation of why these zones are predicted to be potential fishing zones.'),
});
export type PredictFishingZonesOutput = z.infer<typeof PredictFishingZonesOutputSchema>;

export async function predictFishingZones(input: PredictFishingZonesInput): Promise<PredictFishingZonesOutput> {
  return predictFishingZonesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictFishingZonesPrompt',
  input: {schema: PredictFishingZonesInputSchema},
  output: {schema: PredictFishingZonesOutputSchema},
  prompt: `You are an expert marine biologist specializing in predicting potential fishing zones.

  Based on the Sea Surface Temperature (SST) data and catch data provided, predict potential fishing zones. Also take into account additional factors, if any, influencing fish migration and spawning patterns.

  Output the predicted fishing zones as a geojson and provide the confidence level of the prediction and a short explanation.

  SST Data: {{media url=sstData}}
  Catch Data: {{media url=catchData}}
  {{#if additionalFactors}}
  Additional Factors: {{{additionalFactors}}}
  {{/if}}`,
});

const predictFishingZonesFlow = ai.defineFlow(
  {
    name: 'predictFishingZonesFlow',
    inputSchema: PredictFishingZonesInputSchema,
    outputSchema: PredictFishingZonesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
