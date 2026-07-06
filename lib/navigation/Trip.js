"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
const CarPlay_1 = require("../CarPlay");
class Trip {
    constructor(config) {
        this.config = config;
        if (config.id) {
            this.id = config.id;
        }
        if (!this.id) {
            this.id = `trip-${Date.now()}-${Math.round(Math.random() * Number.MAX_SAFE_INTEGER)}`;
        }
        CarPlay_1.CarPlay.bridge.createTrip(this.id, config);
    }
}
exports.Trip = Trip;
//# sourceMappingURL=Trip.js.map