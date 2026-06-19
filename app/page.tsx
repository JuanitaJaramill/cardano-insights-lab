"use client";

import { useState } from "react";
import CaseForm from "./components/CaseForm";
import CaseResult from "./components/CaseResult";
import StartScreen from "./components/StartScreen";
import type { AreaId, CaseData } from "./types/marketBridge";

type AppStep = "start" | "form" | "result";

function createEmptyCaseData(): CaseData {
  return {
    selectedAreas: [],
    caseDescription: "",
    organizationType: "",
    contactEmail: "",
  };
}

export default function Home() {
  const [step, setStep] = useState<AppStep>("start");
  const [caseData, setCaseData] = useState<CaseData>(createEmptyCaseData);

  const toggleArea = (areaId: AreaId) => {
    setCaseData((current) => ({
      ...current,
      selectedAreas: current.selectedAreas.includes(areaId)
        ? current.selectedAreas.filter((id) => id !== areaId)
        : [...current.selectedAreas, areaId],
    }));
  };

  const updateCaseDescription = (value: string) => {
    setCaseData((current) => ({
      ...current,
      caseDescription: value,
    }));
  };

  const updateOrganizationType = (value: string) => {
    setCaseData((current) => ({
      ...current,
      organizationType: value,
    }));
  };

  const updateContactEmail = (value: string) => {
    setCaseData((current) => ({
      ...current,
      contactEmail: value,
    }));
  };

  const resetToStart = () => {
    setCaseData(createEmptyCaseData());
    setStep("start");
  };

  const startNewCase = () => {
    setCaseData(createEmptyCaseData());
    setStep("form");
  };

  if (step === "start") {
    return <StartScreen onStart={() => setStep("form")} />;
  }

  if (step === "result") {
    return (
      <CaseResult
        caseData={caseData}
        onEditCase={() => setStep("form")}
        onStartNewCase={startNewCase}
      />
    );
  }

  return (
    <CaseForm
      caseData={caseData}
      onToggleArea={toggleArea}
      onCaseDescriptionChange={updateCaseDescription}
      onOrganizationTypeChange={updateOrganizationType}
      onContactEmailChange={updateContactEmail}
      onGenerateResult={() => setStep("result")}
      onReset={resetToStart}
    />
  );
}
