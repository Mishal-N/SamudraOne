import { config } from 'dotenv';
config();

import '@/ai/flows/predict-fishing-zones.ts';
import '@/ai/flows/identify-species-from-edna.ts';
import '@/ai/flows/classify-marine-species.ts';