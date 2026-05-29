export interface KbEntityMapping {
  logicalName: string;
  displayName: string;
}

export interface Kb {
  version: string;
  entities: KbEntityMapping[];
}

export interface KbVersionRange {
  min: string;
  max: string;
}
