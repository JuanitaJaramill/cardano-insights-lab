import type {
  AreaId,
  ExplorationResult,
} from "../types/marketBridge";

function includesAll(selectedAreas: AreaId[], areas: AreaId[]) {
  return areas.every((area) => selectedAreas.includes(area));
}

export function isValidEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email.trim());
}

export function buildExplorationResult(
  selectedAreas: AreaId[]
): ExplorationResult {
  if (includesAll(selectedAreas, ["payments", "disputes"])) {
    return {
      label: "Worth exploring further",
      description:
        "Your case shows friction around transactions, confirmations, or agreements.",
      patternTitle: "Transactional friction",
      patternDescription:
        "Payments and disputes together may indicate difficulty proving what was agreed, paid, delivered, or confirmed between different actors.",
      suggestedNextStep:
        "Map who initiates each transaction, who confirms it, where disputes begin, and what evidence is currently available.",
    };
  }

  if (
    includesAll(selectedAreas, [
      "traceability",
      "certificates",
      "trust",
    ])
  ) {
    return {
      label: "Strong signal for deeper review",
      description:
        "Your case combines traceability, verification, and coordination challenges.",
      patternTitle: "Shared verification challenge",
      patternDescription:
        "Several actors may need to verify the origin, status, or authenticity of information without depending entirely on one organization.",
      suggestedNextStep:
        "Identify who creates each record, who needs to verify it, and whether the current information can be altered or duplicated.",
    };
  }

  if (includesAll(selectedAreas, ["traceability", "certificates"])) {
    return {
      label: "Worth exploring further",
      description:
        "Your case appears to involve both movement history and document verification.",
      patternTitle: "Traceability and verification",
      patternDescription:
        "The business may need a clearer way to connect an item, service, or process with records that prove its origin or status.",
      suggestedNextStep:
        "Map the full journey of the item or information and identify which certificates must remain connected to it.",
    };
  }

  if (includesAll(selectedAreas, ["trust", "transparency"])) {
    return {
      label: "Worth exploring further",
      description:
        "Your case shows a possible coordination problem between different actors.",
      patternTitle: "Trust and visibility",
      patternDescription:
        "Different participants may be working with separate versions of the same information or may lack a reliable way to verify what they receive.",
      suggestedNextStep:
        "Identify which actors need access to the information, what each one is allowed to see, and who currently controls the record.",
    };
  }

  if (includesAll(selectedAreas, ["certificates", "disputes"])) {
    return {
      label: "Worth exploring further",
      description:
        "Your case may involve difficulty proving whether records or documents are authentic.",
      patternTitle: "Authenticity and evidence",
      patternDescription:
        "Certificates and disputes together can signal a need for stronger evidence about when a record was created, changed, or verified.",
      suggestedNextStep:
        "List the documents involved, who issues them, who checks them, and how alterations or duplicates are currently detected.",
    };
  }

  if (selectedAreas.length >= 4) {
    return {
      label: "Strong signal for deeper review",
      description:
        "Your case combines several business concerns that may involve coordination, verification, trust, or operational risk.",
      patternTitle: "Multiple overlapping signals",
      patternDescription:
        "The problem appears to affect several parts of the business at once. A deeper review is needed to separate the core issue from its symptoms.",
      suggestedNextStep:
        "Map the actors, information, decisions, and current tools involved before selecting any technology.",
    };
  }

  if (selectedAreas.length >= 2) {
    return {
      label: "Worth exploring further",
      description:
        "Your case connects more than one business concern and may justify a clearer evaluation path.",
      patternTitle: "Connected business concerns",
      patternDescription:
        "The selected areas may be symptoms of the same underlying coordination, verification, or information problem.",
      suggestedNextStep:
        "Identify which actors need to create, verify, update, or trust the same information.",
    };
  }

  return {
    label: "Early signal",
    description:
      "Your case touches one relevant area, but more context is needed before considering a technology solution.",
    patternTitle: "Initial business signal",
    patternDescription:
      "The problem may still be solved with a simpler process or tool. The first step is understanding where the current friction begins.",
    suggestedNextStep:
      "Document the current process, the people involved, and the specific moment where the problem occurs.",
  };
}
