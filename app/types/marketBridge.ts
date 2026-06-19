export type AreaId =
  | "payments"
  | "traceability"
  | "certificates"
  | "trust"
  | "transparency"
  | "disputes";

export type FocusArea = {
  id: AreaId;
  label: string;
  shortDescription: string;
  preliminarySignal: string;
};

export type CaseData = {
  selectedAreas: AreaId[];
  caseDescription: string;
  organizationType: string;
  contactEmail: string;
};

export type ExplorationResult = {
  label: string;
  description: string;
  patternTitle: string;
  patternDescription: string;
  suggestedNextStep: string;
};
