import type { FocusArea } from "../types/marketBridge";

export const focusAreas: FocusArea[] = [
  {
    id: "payments",
    label: "Payments",
    shortDescription:
      "Delays, confirmations, refunds, reconciliation, or disputes around payments.",
    preliminarySignal:
      "Payment friction can become relevant when several actors need to agree that a transaction happened correctly.",
  },
  {
    id: "traceability",
    label: "Traceability",
    shortDescription:
      "The need to prove origin, movement, delivery, or chain of custody.",
    preliminarySignal:
      "Traceability issues may deserve closer review when information needs to be verified across several steps or organizations.",
  },
  {
    id: "certificates",
    label: "Certificates & verification",
    shortDescription:
      "Credentials, permits, records, proofs, or certificates that need to be checked.",
    preliminarySignal:
      "Verification problems can become costly when trust depends on documents, screenshots, PDFs, or manual checks.",
  },
  {
    id: "trust",
    label: "Trust between actors",
    shortDescription:
      "Several parties need to rely on the same information, but each keeps its own version.",
    preliminarySignal:
      "Trust issues may be relevant when independent actors need a shared view of information without relying blindly on one party.",
  },
  {
    id: "transparency",
    label: "Transparency",
    shortDescription:
      "Clients, partners, donors, or regulators need clearer information they can understand and trust.",
    preliminarySignal:
      "Transparency concerns may point to a need for information that can be checked, explained, and trusted.",
  },
  {
    id: "disputes",
    label: "Disputes & authenticity",
    shortDescription:
      "Unclear records, falsification, altered information, or difficulty proving what happened.",
    preliminarySignal:
      "Disputes and authenticity problems may deserve review when proving what happened affects reputation, trust, or decisions.",
  },
];

export const organizationTypes = [
  "Small business",
  "Mid-sized business",
  "Consultant",
  "NGO / impact organization",
  "Tourism / travel company",
  "Product-based business",
  "Education / certification project",
  "Logistics / supply chain actor",
  "Other",
];

export const betaRequestUrl = "https://tally.so/r/44A4xX";

export const betaFeedbackUrl = "";
