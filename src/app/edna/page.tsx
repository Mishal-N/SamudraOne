import { IdentificationForm } from '@/components/ai/identification-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dna } from 'lucide-react';

export default function EdnaPage() {
  return (
    <div className="container mx-auto py-8">
       <div className="flex items-center gap-4 mb-8">
        <Dna className="size-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">eDNA Species Identification</h1>
          <p className="text-muted-foreground">
            Identify marine species from environmental DNA samples using ML-based genetic sequence matching.
          </p>
        </div>
      </div>
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>New eDNA Analysis</CardTitle>
          <CardDescription>
            Upload an eDNA sample data file (e.g., FASTA, FASTQ) to identify present species.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <IdentificationForm />
        </CardContent>
      </Card>
    </div>
  );
}
