'use client';

import { useEffect, useRef, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { identifySpeciesFromEDNAAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Bot, Sparkles, FileText, FileUp } from 'lucide-react';

const formSchema = z.object({
  ednaData: z.any().refine(file => file?.length == 1, 'eDNA data file is required.'),
  description: z.string().optional(),
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

export function IdentificationForm() {
  const [state, formAction] = useActionState(identifySpeciesFromEDNAAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ednaData: undefined, description: '' },
  });
  
  const ednaFileRef = form.register('ednaData');

  useEffect(() => {
    if (state.status === 'success') {
      toast({ title: 'Success!', description: state.message });
      form.reset();
    } else if (state.status === 'error') {
      toast({ title: 'Error', description: state.message, variant: 'destructive' });
    }
  }, [state, toast, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    const ednaDataUri = await fileToDataURL(values.ednaData[0]);
    formData.append('ednaDataUri', ednaDataUri);
    if (values.description) {
      formData.append('description', values.description);
    }
    formAction(formData);
  };

  return (
    <>
      <Form {...form}>
        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="ednaData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>eDNA Sample Data File</FormLabel>
                <FormControl>
                  <Input type="file" {...ednaFileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sample Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., Water sample from Arabian Sea, 20m depth..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={state.status === 'loading'} className="w-full">
            {state.status === 'loading' ? 'Analyzing...' : 'Identify Species'}
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
      
      {state.status === 'loading' && <Progress value={50} className="w-full mt-4 animate-pulse" />}
      
      {state.status === 'success' && state.data && (
        <Card className="mt-8 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot /> AI Analysis Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Species</TableHead>
                  <TableHead className="text-right">Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {state.data.speciesMatches.length > 0 ? (
                  state.data.speciesMatches.map((match, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{match.species}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span>{(match.confidence * 100).toFixed(1)}%</span>
                          <Progress value={match.confidence * 100} className="w-24" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center">
                      No species identified in the sample.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
}
