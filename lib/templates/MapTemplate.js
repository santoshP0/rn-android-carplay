"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapTemplate = void 0;
const react_native_1 = require("react-native");
const CarPlay_1 = require("../CarPlay");
const NavigationSession_1 = require("../navigation/NavigationSession");
const Template_1 = require("./Template");
/**
 * The Map Template is a control layer that appears as an overlay over the base view and allows you to present user controls.
 *
 * The control layer consists of a navigation bar and map buttons. By default, the navigation bar appears when the user interacts with the app, and disappears after a period of inactivity.
 *
 * The navigation bar includes up to two leading buttons and two trailing buttons. You can customize the appearance of these buttons with icons or text.
 *
 * The control layer may also include up to four map buttons. The map buttons are always shown as icons.
 *
 * Navigation apps enter panning mode, zoom in or out, and perform other functions by responding to user actions on these buttons.
 */
class MapTemplate extends Template_1.Template {
    get type() {
        return 'map';
    }
    get eventMap() {
        return {
            alertActionPressed: 'onAlertActionPressed',
            mapButtonPressed: 'onMapButtonPressed',
            panWithDirection: 'onPanWithDirection',
            panBeganWithDirection: 'onPanBeganWithDirection',
            panEndedWithDirection: 'onPanEndedWithDirection',
            selectedPreviewForTrip: 'onSelectedPreviewForTrip',
            didCancelNavigation: 'onDidCancelNavigation',
            startedTrip: 'onStartedTrip',
        };
    }
    constructor(config) {
        super(config);
        this.config = config;
        if (config.component) {
            react_native_1.AppRegistry.registerComponent(this.id, () => config.component);
        }
        const callbackFn = react_native_1.Platform.select({
            android: ({ error } = {}) => {
                error && console.error(error);
            },
        });
        CarPlay_1.CarPlay.bridge.createTemplate(this.id, this.parseConfig({ type: this.type, ...config, render: true }), callbackFn);
    }
    /**
     * Begins guidance for a trip.
     *
     * Keep a reference to the navigation session to perform guidance updates.
     * @param trip Trip class instance
     */
    async startNavigationSession(trip) {
        const res = await CarPlay_1.CarPlay.bridge.startNavigationSession(this.id, trip.id);
        return new NavigationSession_1.NavigationSession(res.navigationSessionId, trip, this);
    }
    updateTravelEstimates(trip, travelEstimates, timeRemainingColor = 0) {
        if (!travelEstimates.distanceUnits) {
            travelEstimates.distanceUnits = 'kilometers';
        }
        CarPlay_1.CarPlay.bridge.updateTravelEstimatesForTrip(this.id, trip.id, travelEstimates, timeRemainingColor);
    }
    /**
     * Update MapTemplate configuration
     */
    updateConfig(config) {
        this.config = config;
        CarPlay_1.CarPlay.bridge.updateMapTemplateConfig(this.id, this.parseConfig(config));
    }
    updateMapButtons(mapButtons) {
        this.config.mapButtons = mapButtons;
        CarPlay_1.CarPlay.bridge.updateMapTemplateMapButtons(this.id, this.parseConfig(mapButtons));
    }
    /**
     * Hides the display of trip previews.
     */
    hideTripPreviews() {
        CarPlay_1.CarPlay.bridge.hideTripPreviews(this.id);
    }
    showTripPreviews(tripPreviews, textConfiguration = {}) {
        CarPlay_1.CarPlay.bridge.showTripPreviews(this.id, tripPreviews.map(trip => trip.id), textConfiguration);
    }
    showRouteChoicesPreviewForTrip(trip, textConfiguration = {}) {
        CarPlay_1.CarPlay.bridge.showRouteChoicesPreviewForTrip(this.id, trip.id, textConfiguration);
    }
    presentNavigationAlert(config, animated = true) {
        CarPlay_1.CarPlay.bridge.presentNavigationAlert(this.id, config, animated);
    }
    dismissNavigationAlert(animated = true) {
        CarPlay_1.CarPlay.bridge.dismissNavigationAlert(this.id, animated);
    }
    /**
     * Shows the panning interface over the map.
     *
     * Calling this method while displaying the panning interface has no effect.
     *
     * While showing the panning interface, the system hides all map buttons. The system doesn't provide a button to dismiss the panning interface. Instead, you must provide a map button in the navigation bar that the user taps to dismiss the panning interface.
     * @param animated A Boolean value that determines whether to animate the panning interface.
     */
    showPanningInterface(animated = false) {
        CarPlay_1.CarPlay.bridge.showPanningInterface(this.id, animated);
    }
    /**
     * Dismisses the panning interface.
     *
     * When dismissing the panning interface, the system shows the previously hidden map buttons.
     * @param animated A Boolean value that determines whether to animate the dismissal of the panning interface.
     */
    dismissPanningInterface(animated = false) {
        CarPlay_1.CarPlay.bridge.dismissPanningInterface(this.id, animated);
    }
}
exports.MapTemplate = MapTemplate;
//# sourceMappingURL=MapTemplate.js.map