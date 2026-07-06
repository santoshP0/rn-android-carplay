import React, { useEffect } from 'react';
import { CarPlay, ListTemplate } from '@santoshpk/react-native-carplay';

// Simplest possible example: show one row when the car connects.
export default function HelloWorld() {
  useEffect(() => {
    const template = new ListTemplate({
      title: 'Hello',
      sections: [{ items: [{ text: 'Hello, Car!' }] }],
    });

    CarPlay.registerOnConnect(() => CarPlay.setRootTemplate(template));
  }, []);

  return null;
}
