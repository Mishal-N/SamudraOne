import { ClassificationForm } from '@/components/ai/classification-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Microscope } from 'lucide-react';

export default function BiodiversityPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Microscope className="size-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Biodiversity Classification</h1>
          <p className="text-muted-foreground">
            Classify marine species and otolith morphology from images using a CNN model.
          </p>
        </div>
      </div>
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>New Classification</CardTitle>
          <CardDescription>
            Upload an image of a marine species or otolith to automatically classify it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClassificationForm />
        </CardContent>
      </Card>
    </div>
  );
}
