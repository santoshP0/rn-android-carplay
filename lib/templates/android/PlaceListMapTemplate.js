"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceListMapTemplate = void 0;
const Template_1 = require("../Template");
/**
 * A template that displays a map along with a list of places.
 * The map can display markers corresponding to the places in the list. See setItemList for details.
 * Template Restrictions In regards to template refreshes, as described in onGetTemplate, this template is considered a refresh of a previous one if:
 * - The previous template is in a loading state (see setLoading, or
 * - The template title has not changed, and the number of rows and the title (not counting spans) of each row between the previous and new ItemLists have not changed.
 * - The template is sent in response to a user-initiated content refresh request. (see setOnContentRefreshListener.
 */
class PlaceListMapTemplate extends Template_1.Template {
    get type() {
        return 'place-list-map';
    }
    get eventMap() {
        return {
            didSelectPointOfInterest: 'onListItemPressed',
            backButtonPressed: 'onBackButtonPressed',
        };
    }
}
exports.PlaceListMapTemplate = PlaceListMapTemplate;
//# sourceMappingURL=PlaceListMapTemplate.js.map