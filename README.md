# @santoshpk/rn-android-carplay

React Native bindings for **Android Auto** (and Apple CarPlay), forked from
[`react-native-carplay`](https://github.com/birkir/react-native-carplay) `2.4.0-beta.2`.

This fork focuses on making the **Android Auto** side production-ready: it migrates the
native layer to the modern `ReactHost` API, adds Point-of-Interest (POI) enhancements,
fixes template parsing/rendering bugs, and adds a few extra bridge methods
(`openUrl`, `launchGoogleMaps`). iOS CarPlay support from upstream is retained.

> Publishing this as a real package removes the need for the large `patch-package`
> diff previously carried inside the app.

---

## Why this fork

| Area | Change |
| --- | --- |
| Native host | Migrated to `ReactHost` for modern React Native (0.71+ / New Architecture friendly) |
| Templates | Fixes in `RCTMapTemplate`, `ListTemplate`, `PaneTemplate`, `PlaceListMapTemplate`, `MessageTemplate` |
| POI | Enhanced Point-of-Interest template + `PlaceListMapTemplate` options |
| Bridge | Added `CarPlay.openUrl(url)` and `CarPlay.launchGoogleMaps(url)` |
| Android Auto | "Reload Android Auto" menu item wired through `didPressMenuItem` |

---

## Requirements

- React Native **>= 0.71**, React **>= 18**
- Android **minSdk 23**, **compileSdk 34**
- `androidx.car.app:app:1.4.0-beta02`
- A car head unit or the **Desktop Head Unit (DHU)** emulator for testing

---

## Install

```bash
npm i @santoshpk/rn-android-carplay
# or
yarn add @santoshpk/rn-android-carplay
```

### Drop-in for existing `react-native-carplay` code

If your app already imports `react-native-carplay`, alias it so no import changes are
needed:

```bash
npm i react-native-carplay@npm:@santoshpk/rn-android-carplay
```

Otherwise update imports to `@santoshpk/rn-android-carplay`.

---

## Android setup

### 1. `AndroidManifest.xml`

The library ships a manifest that registers `CarPlayService` under the Android Auto
**POI** category. In your **app** manifest declare the Android Auto min API level and
(if not already present) the car app service. Minimal example:

```xml
<application ...>
  <meta-data
    android:name="androidx.car.app.minCarApiLevel"
    android:value="1" />

  <service
    android:name="org.birkir.carplay.CarPlayService"
    android:exported="true">
    <intent-filter>
      <action android:name="androidx.car.app.CarAppService" />
      <category android:name="androidx.car.app.category.POI" />
    </intent-filter>
  </service>
</application>
```

> Swap the category for `androidx.car.app.category.NAVIGATION` or `.MESSAGING`
> depending on your app type, and request the matching `androidx.car.app.*_TEMPLATES`
> permission.

### 2. `automotive_app_desc.xml`

Create `android/app/src/main/res/xml/automotive_app_desc.xml`:

```xml
<automotiveApp>
  <uses name="template" />
</automotiveApp>
```

Reference it from the manifest `<application>`:

```xml
<meta-data
  android:name="com.google.android.gms.car.application"
  android:resource="@xml/automotive_app_desc" />
```

### 3. Gradle (optional overrides)

The library defaults to `compileSdk 34 / minSdk 23 / targetSdk 34`. Override in your
root `android/build.gradle` `ext` block if needed:

```gradle
ext {
    compileSdkVersion = 34
    minSdkVersion = 23
    targetSdkVersion = 34
}
```

---

## Usage

```tsx
import {
  CarPlay,
  ListTemplate,
  PaneTemplate,
} from '@santoshpk/rn-android-carplay';

// Build a template
const listTemplate = new ListTemplate({
  title: 'On-call',
  sections: [
    {
      header: 'Shifts',
      items: [
        { text: 'Morning', detailText: '6am – 2pm' },
        { text: 'Evening', detailText: '2pm – 10pm' },
      ],
    },
  ],
  onItemSelect: async ({ index }) => {
    console.log('selected', index);
  },
});

// Wait for the car to connect, then set the root
CarPlay.registerOnConnect(() => {
  CarPlay.setRootTemplate(listTemplate);
});

CarPlay.registerOnDisconnect(() => {
  // clean up
});
```

### Core `CarPlay` API

| Method | Purpose |
| --- | --- |
| `registerOnConnect(cb)` / `registerOnDisconnect(cb)` | Lifecycle listeners for car connect/disconnect |
| `setRootTemplate(template, animated?)` | Set the root screen |
| `pushTemplate(template, animated?)` | Push a screen |
| `popTemplate(animated?)` / `popToRootTemplate(animated?)` | Navigate back |
| `presentTemplate(template, animated?)` / `dismissTemplate(animated?)` | Modal templates |
| `enableNowPlaying(enable?)` | Toggle Now Playing template |
| **`openUrl(url)`** *(fork)* | Open a URL on the car/phone |
| **`launchGoogleMaps(url)`** *(fork)* | Launch Google Maps navigation. Pass a `geo:` URI, e.g. `CarPlay.launchGoogleMaps(\`geo:${lat},${lng}\`)` |

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

## Building from source

```bash
git clone https://github.com/santoshP0/rn-android-carplay.git
cd rn-android-carplay
npm install
npm run build      # tsc → lib/
```

`lib/` is generated (git-ignored) and rebuilt automatically on `npm publish` via the
`prepare` script.

---

## Credits & License

Forked from [`react-native-carplay`](https://github.com/birkir/react-native-carplay)
by Birkir Guðjónsson and contributors. Original work and this fork are both **MIT**
licensed. This fork retains the upstream copyright.

MIT © Santosh Kumar
