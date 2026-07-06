"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationSession = void 0;
const CarPlay_1 = require("../CarPlay");
const react_native_1 = require("react-native");
class NavigationSession {
    constructor(id, trip, mapTemplate) {
        this.id = id;
        this.trip = trip;
        this.mapTemplate = mapTemplate;
        this.maneuvers = [];
    }
    updateManeuvers(maneuvers) {
        this.maneuvers = maneuvers;
        const windowScale = CarPlay_1.CarPlay.window?.scale ?? 1;
        CarPlay_1.CarPlay.bridge.updateManeuversNavigationSession(this.id, maneuvers.map(maneuver => {
            if (maneuver.symbolImage) {
                const image = react_native_1.Image.resolveAssetSource(maneuver.symbolImage);
                maneuver.symbolImage = image;
                maneuver.symbolImageSize = maneuver.symbolImageSize ?? { width: 50, height: 50 };
                const width = Math.floor((maneuver.symbolImageSize.width * windowScale) / image.scale);
                const height = Math.floor((maneuver.symbolImageSize.height * windowScale) / image.scale);
                maneuver.symbolImageSize = { width, height };
            }
            if (maneuver.junctionImage) {
                maneuver.junctionImage = react_native_1.Image.resolveAssetSource(maneuver.junctionImage);
            }
            if (maneuver.tintSymbolImage && typeof maneuver.tintSymbolImage === 'string') {
                maneuver.tintSymbolImage = (0, react_native_1.processColor)(maneuver.tintSymbolImage);
            }
            return maneuver;
        }));
    }
    updateTravelEstimates(maneuverIndex, travelEstimates) {
        if (!travelEstimates.distanceUnits) {
            travelEstimates.distanceUnits = 'kilometers';
        }
        CarPlay_1.CarPlay.bridge.updateTravelEstimatesNavigationSession(this.id, maneuverIndex, travelEstimates);
    }
    cancel() {
        CarPlay_1.CarPlay.bridge.cancelNavigationSession(this.id);
    }
    finish() {
        CarPlay_1.CarPlay.bridge.finishNavigationSession(this.id);
    }
    pause(reason, description) {
        CarPlay_1.CarPlay.bridge.pauseNavigationSession(this.id, reason, description);
    }
}
exports.NavigationSession = NavigationSession;
//# sourceMappingURL=NavigationSession.js.map