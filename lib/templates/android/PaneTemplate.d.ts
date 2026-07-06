import { Action, HeaderAction } from '../../interfaces/Action';
import { Template, TemplateConfig } from '../Template';
import { Pane } from '../../interfaces/Pane';
export interface PaneTemplateConfig extends TemplateConfig {
    pane: Pane;
    headerAction?: HeaderAction;
    actions?: Action[];
    title?: string;
}
export declare class PaneTemplate extends Template<PaneTemplateConfig> {
    get type(): string;
}
//# sourceMappingURL=PaneTemplate.d.ts.map