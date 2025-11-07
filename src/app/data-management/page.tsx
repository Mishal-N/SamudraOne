import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HardHat } from 'lucide-react';

export default function DataManagementPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center">
      <Card className="max-w-md p-8">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <HardHat className="size-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Feature Under Construction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The Data Ingestion and Management module is coming soon. This feature will allow for uploading, validating, and standardizing various marine datasets.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
