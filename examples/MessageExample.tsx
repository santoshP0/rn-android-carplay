import React, { useEffect } from 'react';
import { CarPlay, MessageTemplate } from '@santoshpk/react-native-carplay';

// A full-screen message (Android). Set loading: true for a spinner instead.
export default function MessageExample() {
  useEffect(() => {
    const template = new MessageTemplate({
      title: 'Nothing here',
      message: 'There is nothing to show right now.',
      actions: [{ id: 'retry', title: 'Retry' }],
    });

    CarPlay.registerOnConnect(() => CarPlay.setRootTemplate(template));
  }, []);

  return null;
}
