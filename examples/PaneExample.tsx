import React, { useEffect } from 'react';
import { CarPlay, PaneTemplate } from '@santoshpk/react-native-carplay';

// A detail screen (Android): rows of info plus action buttons.
export default function PaneExample() {
  useEffect(() => {
    const template = new PaneTemplate({
      title: 'Central Park',
      pane: {
        items: [
          { text: 'Address', detailText: '59th St to 110th St' },
          { text: 'Distance', detailText: '0.4 mi' },
        ],
        actions: [{ id: 'navigate', title: 'Navigate' }],
      },
      onButtonPressed: ({ id }) => console.log('action', id),
      onBackButtonPressed: () => CarPlay.popTemplate(),
    });

    CarPlay.registerOnConnect(() => CarPlay.setRootTemplate(template));
  }, []);

  return null;
}
