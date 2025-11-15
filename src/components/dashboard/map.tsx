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
  { lat: 13.0827, lng: 80.2707, key: 'chennai' },
  { lat: 8.0883, lng: 77.5385, key: 'kanyakumari' },
  { lat: 11.9416, lng: 79.8083, key: 'puducherry' },
  { lat: 9.2876, lng: 79.3129, key: 'rameshwaram' },
];

export function Map() {
  return (
    <GoogleMap
      style={{ width: '100%', height: '100%' }}
      defaultCenter={{ lat: 11, lng: 79 }}
      defaultZoom={6}
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
