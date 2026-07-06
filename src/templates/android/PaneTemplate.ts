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

export class PaneTemplate extends Template<PaneTemplateConfig> {
  public get type(): string {
    return 'pane';
  }

  get eventMap() {
    return {
      buttonPressed: 'onButtonPressed',
      backButtonPressed: 'onBackButtonPressed',
    };
  }
}
