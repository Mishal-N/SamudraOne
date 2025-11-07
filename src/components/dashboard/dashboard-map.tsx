'use client';

import { APIProvider } from '@vis.gl/react-google-maps';
import { Map } from './map';
import { MapPlaceholder } from './map-placeholder';

export function DashboardMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <MapPlaceholder />;
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map />
    </APIProvider>
  );
}
