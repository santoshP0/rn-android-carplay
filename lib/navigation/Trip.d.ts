export interface RouteChoice {
    additionalInformationVariants: string[];
    selectionSummaryVariants: string[];
    summaryVariants: string[];
}
export interface TripPoint {
    latitude: number;
    longitude: number;
    name: string;
}
export interface TripConfig {
    id?: string;
    origin: TripPoint;
    destination: TripPoint;
    routeChoices: RouteChoice[];
}
export declare class Trip {
    config: TripConfig;
    id: string;
    constructor(config: TripConfig);
}
//# sourceMappingURL=Trip.d.ts.map