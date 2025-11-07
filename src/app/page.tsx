import { Fish, Dna, Microscope, Anchor } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { StatsCard } from '@/components/dashboard/stats-card';
import { DashboardMap } from '@/components/dashboard/dashboard-map';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to SamudraOne, your unified marine data intelligence platform.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Potential Fishing Zones"
          value="12"
          description="Identified by AI models"
          icon={Fish}
        />
        <StatsCard
          title="Species Classified"
          value="1,284"
          description="From image & otolith data"
          icon={Microscope}
        />
        <StatsCard
          title="eDNA Samples Processed"
          value="452"
          description="Last 30 days"
          icon={Dna}
        />
        <StatsCard
          title="Biodiversity Hotspots"
          value="8"
          description="High-density regions detected"
          icon={Anchor}
        />
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Oceanographic Data Map</CardTitle>
          <p className="text-muted-foreground">
            Interactive map showing key oceanographic and biodiversity data points.
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full rounded-lg overflow-hidden border">
            <DashboardMap />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
