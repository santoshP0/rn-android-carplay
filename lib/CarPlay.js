"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarPlay = exports.CarPlayInterface = void 0;
const react_native_1 = require("react-native");
const { RNCarPlay } = react_native_1.NativeModules;
/**
 * A controller that manages all user interface elements appearing on your map displayed on the CarPlay screen.
 */
class CarPlayInterface {
    constructor() {
        /**
         * React Native bridge to the CarPlay interface
         */
        this.bridge = RNCarPlay;
        /**
         * Boolean to denote if carplay is currently connected.
         */
        this.connected = false;
        /**
         * CarPlay Event Emitter
         */
        this.emitter = new react_native_1.NativeEventEmitter(RNCarPlay);
        this.onConnectCallbacks = new Set();
        this.onDisconnectCallbacks = new Set();
        /**
         * Fired when CarPlay is connected to the device.
         */
        this.registerOnConnect = (callback) => {
            this.onConnectCallbacks.add(callback);
        };
        this.unregisterOnConnect = (callback) => {
            this.onConnectCallbacks.delete(callback);
        };
        /**
         * Fired when CarPlay is disconnected from the device.
         */
        this.registerOnDisconnect = (callback) => {
            this.onDisconnectCallbacks.add(callback);
        };
        this.unregisterOnDisconnect = (callback) => {
            this.onDisconnectCallbacks.delete(callback);
        };
        this.emitter.addListener('didConnect', (window) => {
            this.connected = true;
            this.window = window;
            this.onConnectCallbacks.forEach(callback => {
                callback(window);
            });
        });
        this.emitter.addListener('didDisconnect', () => {
            this.connected = false;
            this.window = undefined;
            this.onDisconnectCallbacks.forEach(callback => {
                callback();
            });
        });
        if (react_native_1.Platform.OS === 'android') {
            this.emitter.addListener('didPressMenuItem', e => {
                if (e?.title === 'Reload Android Auto') {
                    this.bridge.reload();
                }
            });
        }
        // check if already connected this will fire any 'didConnect' events
        // if a connected is already present.
        this.bridge.checkForConnection();
    }
    /**
     * Sets the root template, starting a new stack for the template navigation hierarchy.
     * @param rootTemplate The root template. Replaces the current rootTemplate, if one exists.
     * @param animated Set TRUE to animate the presentation of the root template; ignored if there isn't a current rootTemplate.
     */
    setRootTemplate(rootTemplate, animated = true) {
        return this.bridge.setRootTemplate(rootTemplate.id, animated);
    }
    /**
     * Pushes a template onto the navigation stack and updates the display.
     * @param templateToPush The template to push onto the navigation stack.
     * @param animated Set TRUE to animate the presentation of the template.
     */
    pushTemplate(templateToPush, animated = true) {
        return this.bridge.pushTemplate(templateToPush.id, animated);
    }
    /**
     * Pops templates until the specified template is at the top of the navigation stack.
     * @param targetTemplate The template that you want at the top of the stack. The template must be on the navigation stack before calling this method.
     * @param animated A Boolean value that indicates whether the system animates the display of transitioning templates.
     */
    popToTemplate(targetTemplate, animated = true) {
        return this.bridge.popToTemplate(targetTemplate.id, animated);
    }
    /**
     * Pops all templates on the stack—except the root template—and updates the display.
     * @param animated A Boolean value that indicates whether the system animates the display of transitioning templates.
     */
    popToRootTemplate(animated = true) {
        return this.bridge.popToRootTemplate(animated);
    }
    /**
     * Pops the top template from the navigation stack and updates the display.
     * @param animated A Boolean value that indicates whether the system animates the display of transitioning templates.
     */
    popTemplate(animated = true) {
        return this.bridge.popTemplate(animated);
    }
    /**
     * presents a presentable template, alert / action / voice
     * @param templateToPresent The presentable template to present
     * @param animated A Boolean value that indicates whether the system animates the display of transitioning templates.
     */
    presentTemplate(templateToPresent, animated = true) {
        return this.bridge.presentTemplate(templateToPresent.id, animated);
    }
    /**
     * Dismisses the current presented template
     * * @param animated A Boolean value that indicates whether the system animates the display of transitioning templates.
     */
    dismissTemplate(animated = true) {
        return this.bridge.dismissTemplate(animated);
    }
    /**
     * The current root template in the template navigation hierarchy.
     * @todo Not implemented yet
     */
    get rootTemplate() {
        return Promise.resolve('');
    }
    /**
     * The top-most template in the navigation hierarchy stack.
     * @todo Not implemented yet
     */
    get topTemplate() {
        return Promise.resolve('');
    }
    /**
     * Control now playing template state
     * @param enable A Boolean value that indicates whether the system use now playing template.
     */
    enableNowPlaying(enable = true) {
        return this.bridge.enableNowPlaying(enable);
    }
    /**
     * Open a URL on the car device. **iOS only.**
     *
     * On iOS pass a maps URL, e.g. `http://maps.apple.com/?daddr=<lat>,<lng>&dirflg=d`.
     * On Android use {@link launchGoogleMaps} instead.
     *
     * @param url The URL to open.
     */
    openUrl(url) {
        if (react_native_1.Platform.OS !== 'ios') {
            console.warn('[CarPlay] openUrl is iOS-only. Use launchGoogleMaps on Android.');
            return;
        }
        return this.bridge.openUrl(url);
    }
    /**
     * Launch Google Maps navigation on the car device. **Android only.**
     *
     * Pass a `geo:` URI, e.g. `geo:<lat>,<lng>`.
     * On iOS use {@link openUrl} with an Apple Maps URL instead.
     *
     * @param url The `geo:` URI to navigate to.
     */
    launchGoogleMaps(url) {
        if (react_native_1.Platform.OS !== 'android') {
            console.warn('[CarPlay] launchGoogleMaps is Android-only. Use openUrl on iOS.');
            return;
        }
        return this.bridge.launchGoogleMaps(url);
    }
}
exports.CarPlayInterface = CarPlayInterface;
exports.CarPlay = new CarPlayInterface();
//# sourceMappingURL=CarPlay.js.map