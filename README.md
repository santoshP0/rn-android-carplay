# @santoshpk/react-native-carplay

[![npm](https://img.shields.io/npm/v/@santoshpk/react-native-carplay.svg)](https://www.npmjs.com/package/@santoshpk/react-native-carplay)
[![license](https://img.shields.io/npm/l/@santoshpk/react-native-carplay.svg)](https://opensource.org/licenses/MIT)

React Native bindings for **Android Auto** and **Apple CarPlay**.

A fork of [`react-native-carplay`](https://github.com/birkir/react-native-carplay)
`2.4.0-beta.2` with a production-hardened Android Auto layer

---

## Requirements

- React Native **>= 0.71**, React **>= 18**
- Android **minSdk 23**, **compileSdk 34**
- A car head unit or the **Desktop Head Unit (DHU)** emulator for testing

---

## Install

```bash
npm i @santoshpk/react-native-carplay
# or
yarn add @santoshpk/react-native-carplay
```

### Drop-in for existing `react-native-carplay` code

If your app already imports `react-native-carplay`, alias it so no import changes are
needed:

```bash
npm i react-native-carplay@npm:@santoshpk/react-native-carplay
```

Otherwise update imports to `@santoshpk/react-native-carplay`.

---

## Usage

```tsx
import { useEffect } from 'react';
import { CarPlay, ListTemplate } from '@santoshpk/react-native-carplay';

export default function HelloCar() {
  useEffect(() => {
    const template = new ListTemplate({
      title: 'Hello',
      sections: [{ items: [{ text: 'Hello, Car!' }] }],
    });

    CarPlay.registerOnConnect(() => CarPlay.setRootTemplate(template));
  }, []);

  return null;
}
```

See the [`examples/`](./examples) folder for a simple, self-contained `.tsx` file per
template — list, grid, pane, message, alert, **map with markers**, and **navigation**.

### Core `CarPlay` API

| Method | Purpose |
| --- | --- |
| `registerOnConnect(cb)` / `registerOnDisconnect(cb)` | Lifecycle listeners for car connect/disconnect |
| `setRootTemplate(template, animated?)` | Set the root screen |
| `pushTemplate(template, animated?)` | Push a screen |
| `popTemplate(animated?)` / `popToRootTemplate(animated?)` | Navigate back |
| `presentTemplate(template, animated?)` / `dismissTemplate(animated?)` | Modal templates |
| `enableNowPlaying(enable?)` | Toggle Now Playing template |
| **`openUrl(url)`** *(fork, **iOS only**)* | Open a maps URL, e.g. `CarPlay.openUrl(\`http://maps.apple.com/?daddr=${lat},${lng}&dirflg=d\`)`. No-ops with a warning on Android. |
| **`launchGoogleMaps(url)`** *(fork, **Android only**)* | Launch Google Maps navigation with a `geo:` URI, e.g. `CarPlay.launchGoogleMaps(\`geo:${lat},${lng}\`)`. No-ops with a warning on iOS. |

> **Platform routing:** `openUrl` is iOS-only, `launchGoogleMaps` is Android-only. Each
> no-ops (with a `console.warn`) on the other platform, so a wrong-platform call is safe
> — but route navigation per platform: Apple Maps via `openUrl` on iOS, Google Maps via
> `launchGoogleMaps` on Android.

---

## Templates

**Cross-platform:** `ListTemplate`, `GridTemplate`, `TabBarTemplate`, `MapTemplate`,
`InformationTemplate`, `PointOfInterestTemplate`, `AlertTemplate`, `ActionSheetTemplate`,
`ContactTemplate`, `SearchTemplate`, `NowPlayingTemplate`, `VoiceControlTemplate`.

**Android-only:** `MessageTemplate`, `NavigationTemplate`, `PaneTemplate`,
`PlaceListMapTemplate`, `PlaceListNavigationTemplate`, `RoutePreviewNavigationTemplate`.

> Not every template is valid for every Android Auto app category. POI apps support
> `PlaceListMapTemplate`, `PaneTemplate`, `ListTemplate`, `GridTemplate`,
> `MessageTemplate`, and a few others.

---

## Testing on Android Auto

1. Install [Android Auto](https://play.google.com/store/apps/details?id=com.google.android.projection.gearhead) and the **Desktop Head Unit (DHU)** from the Android SDK.
2. Enable *Developer mode* in Android Auto → *Settings*.
3. Enable *Unknown sources* so your dev build is listed.
4. Run the DHU:
   ```bash
   ~/Library/Android/sdk/extras/google/auto/desktop-head-unit
   ```


---

## Credits & License

Forked from [`react-native-carplay`](https://github.com/birkir/react-native-carplay)
by Birkir Guðjónsson and contributors. Original work and this fork are both **MIT**
licensed. This fork retains the upstream copyright.

MIT © Santosh Kumar
