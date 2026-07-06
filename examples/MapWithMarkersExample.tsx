import React, { useEffect } from 'react';
import { CarPlay, PlaceListMapTemplate } from '@santoshpk/react-native-carplay';

// Map with markers + a place list (Android Auto).
// Each row draws a marker via metadata: { type: 'place', latitude, longitude, icon }.
const places = [
  { id: 'p1', name: 'Central Park', info: '0.4 mi', lat: 40.7829, lng: -73.9654 },
  { id: 'p2', name: 'Times Square', info: '1.1 mi', lat: 40.758, lng: -73.9855 },
];

export default function MapWithMarkersExample() {
  useEffect(() => {
    const icon = require('./assets/marker.png');

    const items = places.map((p) => ({
      id: p.id,
      title: p.name,
      texts: [p.info],
      metadata: { type: 'place', latitude: p.lat, longitude: p.lng, icon },
    }));

    const template = new PlaceListMapTemplate({
      title: 'Nearby',
      anchor: { latitude: 40.75, longitude: -73.98, icon },
      currentLocationEnabled: true,
      itemList: items as any, // rows carry Android-only marker fields
      onListItemPressed: ({ index }) => console.log('tapped', places[index].name),
      onBackButtonPressed: () => CarPlay.popTemplate(),
    });

    CarPlay.registerOnConnect(() => CarPlay.setRootTemplate(template));
  }, []);

  return null;
}
