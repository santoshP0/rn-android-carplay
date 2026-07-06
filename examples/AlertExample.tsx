import React, { useEffect } from 'react';
import { CarPlay, ListTemplate, AlertTemplate } from '@santoshpk/react-native-carplay';

// A modal alert, presented on top of the current template.
export default function AlertExample() {
  useEffect(() => {
    const alert = new AlertTemplate({
      titleVariants: ['Are you sure?'],
      actions: [
        { id: 'yes', title: 'Yes', style: 'default' },
        { id: 'no', title: 'No', style: 'cancel' },
      ],
      onActionButtonPressed: ({ id }) => {
        console.log('picked', id);
        CarPlay.dismissTemplate();
      },
    });

    const root = new ListTemplate({
      title: 'Home',
      sections: [{ items: [{ text: 'Show alert' }] }],
      onItemSelect: async () => CarPlay.presentTemplate(alert),
    });

    CarPlay.registerOnConnect(() => CarPlay.setRootTemplate(root));
  }, []);

  return null;
}
