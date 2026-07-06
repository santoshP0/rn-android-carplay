import { Action, HeaderAction } from '../../interfaces/Action';
import { Template, TemplateConfig } from '../Template';
import { Pane } from '../../interfaces/Pane';
import { ButtonPressedEvent } from '../../templates/GridTemplate';
export interface PaneTemplateConfig extends TemplateConfig {
    pane: Pane;
    headerAction?: HeaderAction;
    actions?: Action[];
    title?: string;
    onButtonPressed?(e: ButtonPressedEvent): void;
    onBackButtonPressed?(): void;
}
export declare class PaneTemplate extends Template<PaneTemplateConfig> {
    get type(): string;
    get eventMap(): {
        buttonPressed: string;
        backButtonPressed: string;
    };
}
//# sourceMappingURL=PaneTemplate.d.ts.map