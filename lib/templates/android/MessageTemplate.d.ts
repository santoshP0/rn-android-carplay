import { Action, HeaderAction } from '../../interfaces/Action';
import { Template, TemplateConfig } from '../Template';
import { ImageSourcePropType } from 'react-native';
export interface MessageTemplateConfig extends TemplateConfig {
    message?: string;
    loading?: boolean;
    headerAction?: HeaderAction;
    actions?: Action[];
    icon?: ImageSourcePropType;
    title?: string;
    debugMessage?: string;
}
export declare class MessageTemplate extends Template<MessageTemplateConfig> {
    get type(): string;
}
//# sourceMappingURL=MessageTemplate.d.ts.map