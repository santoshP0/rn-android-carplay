import React, { useEffect } from 'react';
import { CarPlay, ListTemplate } from '@santoshpk/react-native-carplay';

// A list with sections. Tapping a row logs its index.
export default function ListExample() {
  useEffect(() => {
    const template = new ListTemplate({
      title: 'Places',
      sections: [
        {
          header: 'Nearby',
          items: [
            { text: 'Central Park', detailText: '0.4 mi' },
            { text: 'Times Square', detailText: '1.1 mi' },
          ],
        },
      ],
      onItemSelect: async ({ index }) => console.log('tapped row', index),
    });

    CarPlay.registerOnConnect(() => CarPlay.setRootTemplate(template));
  }, []);

  return null;
}
