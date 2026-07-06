"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarPlay = exports.CarPlayInterface = void 0;
const react_native_1 = require("react-native");
const { RNCarPlay } = react_native_1.NativeModules;
/**
 * A controller that manages all user interface elements appearing on your map displayed on the CarPlay screen.
 */
class CarPlayInterface {
    /**
     * React Native bridge to the CarPlay interface
     */
    bridge = RNCarPlay;
    /**
     * Boolean to denote if carplay is currently connected.
     */
    connected = false;
    window;
    /**
     * CarPlay Event Emitter
     */
    emitter = new react_native_1.NativeEventEmitter(RNCarPlay);
    onConnectCallbacks = new Set();
    onDisconnectCallbacks = new Set();
    constructor() {
        this.emitter.addListener('didConnect', (window) => {
            console.log('we are connected yes!');
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
        this.emitter.addListener('didPressMenuItem', e => {
            if (e?.title === 'Reload Android Auto') {
                this.bridge.reload();
            }
        });
        // check if already connected this will fire any 'didConnect' events
        // if a connected is already present.
        this.bridge.checkForConnection();
    }
    /**
     * Fired when CarPlay is connected to the device.
     */
    registerOnConnect = (callback) => {
        this.onConnectCallbacks.add(callback);
    };
    unregisterOnConnect = (callback) => {
        this.onConnectCallbacks.delete(callback);
    };
    /**
     * Fired when CarPlay is disconnected from the device.
     */
    registerOnDisconnect = (callback) => {
        this.onDisconnectCallbacks.add(callback);
    };
    unregisterOnDisconnect = (callback) => {
        this.onDisconnectCallbacks.delete(callback);
    };
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
}
exports.CarPlayInterface = CarPlayInterface;
exports.CarPlay = new CarPlayInterface();
