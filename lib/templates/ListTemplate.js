"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTemplate = void 0;
const CarPlay_1 = require("../CarPlay");
const Template_1 = require("./Template");
const react_native_1 = require("react-native");
/**
 * A hierarchical list of menu items can be displayed on the CarPlay screen using a list template.
 *
 * The List Template allows navigation apps to present a hierarchical list of menu items. It includes a navigation bar and a list view.
 *
 * The navigation bar includes a title, and up to two (2) leading buttons and two (2) trailing buttons. You can customize the appearance of these buttons with icons or text.
 *
 * Each item in the list view may include an icon, title, subtitle, and an optional disclosure indicator indicating the presence of a submenu. The depth of the menu hierarchy may not exceed 5 levels. Note that some cars limit the total number of items that may be shown in a list.
 */
class ListTemplate extends Template_1.Template {
    config;
    get type() {
        return 'list';
    }
    get eventMap() {
        return {
            backButtonPressed: 'onBackButtonPressed',
        };
    }
    constructor(config) {
        super(config);
        this.config = config;
        CarPlay_1.CarPlay.emitter.addListener('didSelectListItem', (e) => {
            if (config.onItemSelect && e.templateId === this.id) {
                void Promise.resolve(config.onItemSelect(e)).then(() => {
                    if (react_native_1.Platform.OS === 'ios') {
                        CarPlay_1.CarPlay.bridge.reactToSelectedResult(true);
                    }
                });
            }
        });
    }
    updateSections = (sections) => {
        this.config.sections = sections;
        return CarPlay_1.CarPlay.bridge.updateListTemplateSections(this.id, this.parseConfig(sections));
    };
    updateListTemplateItem = (config) => {
        const section = this.config.sections?.[config.sectionIndex];
        if (section) {
            section.items[config.itemIndex] = config;
        }
        return CarPlay_1.CarPlay.bridge.updateListTemplateItem(this.id, this.parseConfig(config));
    };
    getMaximumListItemCount() {
        return CarPlay_1.CarPlay.bridge.getMaximumListItemCount(this.id);
    }
    getMaximumListSectionCount() {
        return CarPlay_1.CarPlay.bridge.getMaximumListSectionCount(this.id);
    }
}
exports.ListTemplate = ListTemplate;
