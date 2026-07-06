import { Template, TemplateConfig } from '../Template';
export interface AndroidNavigationBaseTemplateConfig extends TemplateConfig {
    /**
     * Your component to render inside Android Auto Map view
     * Example `component: MyComponent`
     */
    component: React.ComponentType<any>;
    onDidShowPanningInterface?(): void;
    onDidDismissPanningInterface?(): void;
}
export declare class AndroidNavigationBaseTemplate<T extends AndroidNavigationBaseTemplateConfig> extends Template<T> {
    config: T;
    get eventMap(): {
        didShowPanningInterface: string;
        didDismissPanningInterface: string;
    };
    constructor(config: T);
}
//# sourceMappingURL=AndroidNavigationBaseTemplate.d.ts.map