import { PredictionForm } from '@/components/ai/prediction-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Fish } from 'lucide-react';

export default function FishStockPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Fish className="size-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI-Powered Fish Stock Prediction</h1>
          <p className="text-muted-foreground">
            Predict potential fishing zones based on SST and catch data.
          </p>
        </div>
      </div>
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>New Prediction</CardTitle>
          <CardDescription>
            Upload Sea Surface Temperature (SST) and historical catch data to generate a prediction.
            Files should be in a standard data format (e.g., CSV, NetCDF).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PredictionForm />
        </CardContent>
      </Card>
    </div>
  );
}
