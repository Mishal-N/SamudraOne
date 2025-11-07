'use client';

import {
  Map as GoogleMap,
  Marker,
  AdvancedMarker,
} from '@vis.gl/react-google-maps';
import { Fish } from 'lucide-react';

const fishingZones = [
  { lat: 15.4, lng: 73.8, key: 'zone1' },
  { lat: 12.9, lng: 74.8, key: 'zone2' },
  { lat: 8.5, lng: 76.9, key: 'zone3' },
  { lat: 20.2, lng: 85.8, key: 'zone4' },
];

export function Map() {
  return (
    <GoogleMap
      style={{ width: '100%', height: '100%' }}
      defaultCenter={{ lat: 15, lng: 80 }}
      defaultZoom={5}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      mapId="a3b0f5c22f1d2e1a"
    >
      {fishingZones.map((zone) => (
        <AdvancedMarker key={zone.key} position={zone}>
          <div className="bg-primary/80 backdrop-blur-sm text-primary-foreground p-2 rounded-full shadow-lg border-2 border-accent">
            <Fish className="h-5 w-5" />
          </div>
        </AdvancedMarker>
      ))}
    </GoogleMap>
  );
}
