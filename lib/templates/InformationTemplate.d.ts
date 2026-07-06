import { Template, TemplateConfig } from './Template';
export interface InformationItem {
    title: string;
    detail: string;
}
export interface InformationAction {
    id: string;
    title: string;
}
export interface InformationTemplateConfig extends TemplateConfig {
    title: string;
    leading?: boolean;
    items: InformationItem[];
    actions: InformationAction[];
    onActionButtonPressed(e: {
        id: string;
        templateId: string;
    }): void;
}
export declare class InformationTemplate extends Template<InformationTemplateConfig> {
    get type(): string;
    get eventMap(): {
        actionButtonPressed: string;
    };
    updateInformationTemplateItems: (items: InformationItem[]) => void;
    updateInformationTemplateActions: (actions: InformationAction[]) => void;
}
//# sourceMappingURL=InformationTemplate.d.ts.map