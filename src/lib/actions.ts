'use server';

import {
  predictFishingZones as predictFishingZonesFlow,
  type PredictFishingZonesInput,
  type PredictFishingZonesOutput,
} from '@/ai/flows/predict-fishing-zones';

import {
  classifyMarineSpecies as classifyMarineSpeciesFlow,
  type ClassifyMarineSpeciesInput,
  type ClassifyMarineSpeciesOutput,
} from '@/ai/flows/classify-marine-species';

import {
  identifySpeciesFromEDNA as identifySpeciesFromEDNAFlow,
  type EDNAInput,
  type EDNAOutput,
} from '@/ai/flows/identify-species-from-edna';
import { z } from 'zod';

type FormState<T> = {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
  data?: T;
};

// Fish Stock Prediction
const predictSchema = z.object({
  sstData: z.string().min(1, 'SST data is required.'),
  catchData: z.string().min(1, 'Catch data is required.'),
  additionalFactors: z.string().optional(),
});

export async function predictFishingZonesAction(
  prevState: FormState<PredictFishingZonesOutput>,
  formData: FormData
): Promise<FormState<PredictFishingZonesOutput>> {
  try {
    const parsed = predictSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
      return { status: 'error', message: parsed.error.errors.map(e => e.message).join(', ') };
    }
    
    const result = await predictFishingZonesFlow(parsed.data as PredictFishingZonesInput);
    return { status: 'success', message: 'Prediction successful.', data: result };
  } catch (error) {
    return { status: 'error', message: error instanceof Error ? error.message : 'An unknown error occurred.' };
  }
}

// Biodiversity Classification
const classifySchema = z.object({
  imageDataUri: z.string().min(1, 'Image data is required.'),
});

export async function classifyMarineSpeciesAction(
  prevState: FormState<ClassifyMarineSpeciesOutput>,
  formData: FormData
): Promise<FormState<ClassifyMarineSpeciesOutput>> {
  try {
    const parsed = classifySchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
        return { status: 'error', message: parsed.error.errors.map(e => e.message).join(', ') };
    }
    const result = await classifyMarineSpeciesFlow(parsed.data as ClassifyMarineSpeciesInput);
    return { status: 'success', message: 'Classification successful.', data: result };
  } catch (error) {
    return { status: 'error', message: error instanceof Error ? error.message : 'An unknown error occurred.' };
  }
}


// eDNA Identification
const identifySchema = z.object({
  ednaDataUri: z.string().min(1, 'eDNA data is required.'),
  description: z.string().optional(),
});

export async function identifySpeciesFromEDNAAction(
  prevState: FormState<EDNAOutput>,
  formData: FormData
): Promise<FormState<EDNAOutput>> {
  try {
    const parsed = identifySchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
        return { status: 'error', message: parsed.error.errors.map(e => e.message).join(', ') };
    }
    const result = await identifySpeciesFromEDNAFlow(parsed.data as EDNAInput);
    return { status: 'success', message: 'Identification successful.', data: result };
  } catch (error) {
    return { status: 'error', message: error instanceof Error ? error.message : 'An unknown error occurred.' };
  }
}
