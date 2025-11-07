import { MapPinOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function MapPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-muted/50 rounded-lg">
      <Alert variant="default" className="max-w-md bg-background">
        <MapPinOff className="h-4 w-4" />
        <AlertTitle>Map Unavailable</AlertTitle>
        <AlertDescription>
          To display the interactive map, please add your Google Maps API key to your environment variables.
          <br />
          Create a `.env.local` file and add the following line:
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold mt-2 block">
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
          </code>
        </AlertDescription>
      </Alert>
    </div>
  );
}
