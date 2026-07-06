"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchTemplate = void 0;
const CarPlay_1 = require("../CarPlay");
const Template_1 = require("./Template");
const react_native_1 = require("react-native");
class SearchTemplate extends Template_1.Template {
    config;
    get type() {
        return 'search';
    }
    get eventMap() {
        return {
            searchButtonPressed: 'onSearchButtonPressed',
        };
    }
    constructor(config) {
        // parse out any images in the results
        super(config);
        this.config = config;
        CarPlay_1.CarPlay.emitter.addListener('updatedSearchText', (e) => {
            if (config.onSearch && e.templateId === this.id) {
                void Promise.resolve(config.onSearch(e.searchText)).then((result = []) => {
                    if (react_native_1.Platform.OS === 'ios') {
                        const parsedResults = result.map(item => ({
                            ...item,
                            image: item.image ? react_native_1.Image.resolveAssetSource(item.image) : undefined,
                        }));
                        CarPlay_1.CarPlay.bridge.reactToUpdatedSearchText(parsedResults);
                    }
                });
            }
        });
        CarPlay_1.CarPlay.emitter.addListener('selectedResult', (e) => {
            if (config.onItemSelect && e.templateId === this.id) {
                void Promise.resolve(config.onItemSelect(e)).then(() => react_native_1.Platform.OS === 'ios' && CarPlay_1.CarPlay.bridge.reactToSelectedResult(true));
            }
        });
    }
}
exports.SearchTemplate = SearchTemplate;
