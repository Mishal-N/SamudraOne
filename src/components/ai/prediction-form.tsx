'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { predictFishingZonesAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Bot, Download, FileUp, Sparkles } from 'lucide-react';

const formSchema = z.object({
  sstData: z.any().refine(file => file?.length == 1, 'SST Data is required.'),
  catchData: z.any().refine(file => file?.length == 1, 'Catch Data is required.'),
  additionalFactors: z.string().optional(),
});

const initialState = { status: 'idle', message: '', data: undefined };

const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export function PredictionForm() {
  const [state, formAction] = useFormState(predictFishingZonesAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sstData: undefined,
      catchData: undefined,
      additionalFactors: '',
    },
  });

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: 'Success!',
        description: state.message,
      });
      form.reset();
    } else if (state.status === 'error') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    const sstDataUrl = await fileToDataURL(values.sstData[0]);
    formData.append('sstData', sstDataUrl);

    const catchDataUrl = await fileToDataURL(values.catchData[0]);
    formData.append('catchData', catchDataUrl);

    if (values.additionalFactors) {
      formData.append('additionalFactors', values.additionalFactors);
    }
    
    formAction(formData);
  };
  
  const sstFileRef = form.register('sstData');
  const catchFileRef = form.register('catchData');

  return (
    <>
      <Form {...form}>
        <form ref={formRef} action={formAction} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="sstData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sea Surface Temperature (SST) Data</FormLabel>
                <FormControl>
                  <Input type="file" {...sstFileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="catchData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Historical Catch Data</FormLabel>
                <FormControl>
                  <Input type="file" {...catchFileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalFactors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Factors (Optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., chlorophyll levels, currents, known spawning grounds..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={state.status === 'loading'} className="w-full">
            {state.status === 'loading' ? 'Predicting...' : 'Predict Fishing Zones'}
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>

      {state.status === 'loading' && <Progress value={50} className="w-full mt-4 animate-pulse" />}

      {state.status === 'success' && state.data && (
        <Card className="mt-8 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot /> AI Prediction Result
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Confidence Level</h3>
              <div className="flex items-center gap-2">
                <Progress value={state.data.confidenceLevel * 100} className="w-full" />
                <span>{(state.data.confidenceLevel * 100).toFixed(1)}%</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Explanation</h3>
              <p className="text-sm text-muted-foreground bg-background p-3 rounded-md">{state.data.explanation}</p>
            </div>
            <div>
              <h3 className="font-semibold">Predicted Zones GeoJSON</h3>
               <Button asChild variant="outline">
                <a href={state.data.fishingZones} download="predicted_fishing_zones.geojson">
                  <Download className="mr-2 h-4 w-4" />
                  Download GeoJSON
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
