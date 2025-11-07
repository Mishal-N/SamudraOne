'use client';

import { useEffect, useState, useRef, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { classifyMarineSpeciesAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Bot, Image as ImageIcon, Sparkles, FileUp } from 'lucide-react';

const formSchema = z.object({
  image: z.any().refine(file => file?.length == 1, 'An image file is required.'),
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

export function ClassificationForm() {
  const [state, formAction] = useActionState(classifyMarineSpeciesAction, initialState);
  const { toast } = useToast();
  const [preview, setPreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { image: undefined },
  });
  
  const imageFileRef = form.register('image');

  useEffect(() => {
    if (state.status === 'success') {
      toast({ title: 'Success!', description: state.message });
      form.reset();
      setPreview(null);
    } else if (state.status === 'error') {
      toast({ title: 'Error', description: state.message, variant: 'destructive' });
    }
  }, [state, toast, form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    const imageDataUri = await fileToDataURL(values.image[0]);
    formData.append('imageDataUri', imageDataUri);
    formAction(formData);
  };

  return (
    <>
      <Form {...form}>
        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Species or Otolith Image</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4">
                    {preview ? (
                      <Image src={preview} alt="Image preview" width={80} height={80} className="rounded-md object-cover aspect-square" />
                    ) : (
                      <div className="flex items-center justify-center w-20 h-20 rounded-md bg-muted">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <Input type="file" accept="image/*" {...imageFileRef} onChange={handleFileChange} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={state.status === 'loading'} className="w-full">
            {state.status === 'loading' ? 'Classifying...' : 'Classify Image'}
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
      
      {state.status === 'loading' && <Progress value={50} className="w-full mt-4 animate-pulse" />}

      {state.status === 'success' && state.data && (
        <Card className="mt-8 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot /> AI Classification Result
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Predicted Species</h3>
              <p className="text-lg text-primary font-bold">{state.data.speciesName}</p>
            </div>
             <div>
              <h3 className="font-semibold">Confidence Level</h3>
              <div className="flex items-center gap-2">
                <Progress value={state.data.confidence * 100} className="w-full" />
                <span>{(state.data.confidence * 100).toFixed(1)}%</span>
              </div>
            </div>
            {state.data.otolithMorphology && (
              <div>
                <h3 className="font-semibold">Otolith Morphology</h3>
                <p className="text-sm text-muted-foreground bg-background p-3 rounded-md">{state.data.otolithMorphology}</p>
              </div>
            )}
            {state.data.additionalNotes && (
               <div>
                <h3 className="font-semibold">Additional Notes</h3>
                <p className="text-sm text-muted-foreground bg-background p-3 rounded-md">{state.data.additionalNotes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}
