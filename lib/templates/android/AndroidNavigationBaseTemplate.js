"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndroidNavigationBaseTemplate = void 0;
const react_native_1 = require("react-native");
const Template_1 = require("../Template");
const CarPlay_1 = require("../../CarPlay");
class AndroidNavigationBaseTemplate extends Template_1.Template {
    get eventMap() {
        return {
            didShowPanningInterface: 'onDidShowPanningInterface',
            didDismissPanningInterface: 'onDidDismissPanningInterface',
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
}
exports.AndroidNavigationBaseTemplate = AndroidNavigationBaseTemplate;
//# sourceMappingURL=AndroidNavigationBaseTemplate.js.map