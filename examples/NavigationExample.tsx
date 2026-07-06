import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { CarPlay, ListTemplate } from '@santoshpk/react-native-carplay';

// Start turn-by-turn to a coordinate, using the right maps app per platform.
function navigateTo(lat: number, lng: number) {
  if (Platform.OS === 'android') {
    CarPlay.launchGoogleMaps(`geo:${lat},${lng}`);
  } else {
    CarPlay.openUrl(`http://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`);
  }
}

export default function NavigationExample() {
  useEffect(() => {
    const template = new ListTemplate({
      title: 'Navigate',
      sections: [{ items: [{ text: 'Central Park' }] }],
      onItemSelect: async () => navigateTo(40.7829, -73.9654),
    });

    CarPlay.registerOnConnect(() => CarPlay.setRootTemplate(template));
  }, []);

  return null;
}
