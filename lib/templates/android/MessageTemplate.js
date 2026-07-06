"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTemplate = void 0;
const Template_1 = require("../Template");
class MessageTemplate extends Template_1.Template {
    get type() {
        return 'message';
    }
}
exports.MessageTemplate = MessageTemplate;
