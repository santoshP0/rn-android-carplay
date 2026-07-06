import React, { useEffect } from 'react';
import { CarPlay, GridTemplate } from '@santoshpk/react-native-carplay';

// A grid of icon buttons. Each button needs an id, titleVariants and an image.
export default function GridExample() {
  useEffect(() => {
    const template = new GridTemplate({
      title: 'Menu',
      buttons: [
        { id: 'home', titleVariants: ['Home'], image: require('./assets/icon.png') },
        { id: 'map', titleVariants: ['Map'], image: require('./assets/icon.png') },
        { id: 'settings', titleVariants: ['Settings'], image: require('./assets/icon.png') },
      ],
      onButtonPressed: ({ id }) => console.log('pressed', id),
    });

    CarPlay.registerOnConnect(() => CarPlay.setRootTemplate(template));
  }, []);

  return null;
}
