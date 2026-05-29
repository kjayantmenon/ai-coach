export interface ManifestEntity {
  name: string;
  enabled: boolean;
}

export interface Manifest {
  gabVersion: string;
  gabKbVersion: string;
  entities: ManifestEntity[];
}

export interface ValidationError {
  path: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}
