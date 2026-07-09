"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const react_native_1 = require("react-native");
const CarPlay_1 = require("../CarPlay");
class Template {
    get type() {
        return 'unset';
    }
    get eventMap() {
        return {};
    }
    constructor(config) {
        this.config = config;
        this.updateTemplate = (config) => {
            CarPlay_1.CarPlay.bridge.updateTemplate(this.id, this.parseConfig({ type: this.type, ...config }));
        };
        if (config.id) {
            this.id = config.id;
        }
        if (!this.id) {
            this.id = `${this.type}-${Date.now()}-${Math.round(Math.random() * Number.MAX_SAFE_INTEGER)}`;
        }
        const eventMap = {
            barButtonPressed: 'onBarButtonPressed',
            didAppear: 'onDidAppear',
            didDisappear: 'onDidDisappear',
            willAppear: 'onWillAppear',
            willDisappear: 'onWillDisappear',
            ...(this.eventMap || {}),
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.entries(eventMap).forEach(([eventName, callbackName]) => {
            CarPlay_1.CarPlay.emitter.addListener(eventName, (e) => {
                const configEventName = callbackName;
                if (config[configEventName] && e.templateId === this.id) {
                    config[configEventName]?.(e);
                }
            });
        });
        if (this.type !== 'map') {
            const callbackFn = react_native_1.Platform.select({
                android: ({ error } = {}) => {
                    error && console.error(error);
                },
            });
            CarPlay_1.CarPlay.bridge.createTemplate(this.id, this.parseConfig({ type: this.type, ...config }), callbackFn);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parseConfig(config) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function traverse(obj) {
            for (const i in obj) {
                if (obj[i] !== null && typeof obj[i] === 'object') {
                    traverse(obj[i]);
                }
                if (String(i).match(/[Ii]mage$/)) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    obj[i] = react_native_1.Image.resolveAssetSource(obj[i]);
                }
            }
        }
        const result = JSON.parse(JSON.stringify(config));
        traverse(result);
        return result;
    }
}
exports.Template = Template;
//# sourceMappingURL=Template.js.map