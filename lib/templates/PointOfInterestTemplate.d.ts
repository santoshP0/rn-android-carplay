import { Template, TemplateConfig } from './Template';
export interface PointOfInterestItem {
    id: string;
    location: {
        latitude: number;
        longitude: number;
    };
    title: string;
    subtitle?: string;
    summary?: string;
    detailTitle?: string;
    detailSubtitle?: string;
    detailSummary?: string;
}
export interface PointOfInterestTemplateConfig extends TemplateConfig {
    title: string;
    items: PointOfInterestItem[];
    onPointOfInterestSelect?(e: PointOfInterestItem): void;
    onChangeMapRegion(e: {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    }): void;
}
export declare class PointOfInterestTemplate extends Template<PointOfInterestTemplateConfig> {
    get type(): string;
    get eventMap(): {
        didSelectPointOfInterest: string;
        didChangeMapRegion: string;
    };
}
//# sourceMappingURL=PointOfInterestTemplate.d.ts.map