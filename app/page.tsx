"use client";

import { useMemo, useState } from "react";

type AreaId =
  | "payments"
  | "traceability"
  | "certificates"
  | "trust"
  | "transparency"
  | "disputes";

type FocusArea = {
  id: AreaId;
  label: string;
  shortDescription: string;
  preliminarySignal: string;
};

const focusAreas: FocusArea[] = [
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

const organizationTypes = [
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

export default function Home() {
  const [started, setStarted] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<AreaId[]>([]);
  const [caseDescription, setCaseDescription] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [showResult, setShowResult] = useState(false);

  const selectedAreaObjects = useMemo(
    () => focusAreas.filter((area) => selectedAreas.includes(area.id)),
    [selectedAreas]
  );

  const toggleArea = (areaId: AreaId) => {
    setSelectedAreas((current) =>
      current.includes(areaId)
        ? current.filter((id) => id !== areaId)
        : [...current, areaId]
    );
  };

  const canGenerateResult =
    selectedAreas.length > 0 &&
    caseDescription.trim().length > 20 &&
    organizationType.length > 0;

  const explorationLevel = useMemo(() => {
    if (selectedAreas.length >= 4) {
      return {
        label: "Strong signal for deeper review",
        description:
          "Your case combines several business areas. This may involve coordination, verification, trust, operational risk, or several actors depending on the same information.",
      };
    }

    if (selectedAreas.length >= 2) {
      return {
        label: "Worth exploring further",
        description:
          "Your case connects more than one business concern. That may justify a clearer evaluation path before choosing a technology or vendor.",
      };
    }

    return {
      label: "Early signal",
      description:
        "Your case touches one relevant area. It may still be useful to clarify whether a simpler tool could solve the problem before considering blockchain.",
    };
  }, [selectedAreas.length]);

  const suggestedNextStep = useMemo(() => {
    if (selectedAreas.length >= 4) {
      return "Your case shows multiple overlapping signals. A deeper review may help identify whether blockchain is relevant, or whether a simpler architecture would be enough.";
    }

    if (selectedAreas.length >= 2) {
      return "Your case connects several business concerns. A useful next step would be to map who needs to trust, verify, or act on the information.";
    }

    return "Start by clarifying whether this problem can be solved with a simpler tool before considering blockchain.";
  }, [selectedAreas.length]);

  const resetFlow = () => {
    setStarted(false);
    setSelectedAreas([]);
    setCaseDescription("");
    setOrganizationType("");
    setShowResult(false);
  };

  if (!started) {
    return (
      <main className="min-h-screen bg-[#0f0a19] text-[#f7f4ff]">
        <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16 md:px-10">
          <div className="mb-8 inline-flex w-fit items-center rounded-full border border-[#d6b8ff]/30 bg-[#d6b8ff]/10 px-4 py-2 text-sm font-medium text-[#e7d7ff]">
            CIL Market Bridge · Beta app
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#c8a6ff]">
                Clarity before adoption
              </p>

              <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
                Turn business confusion into a clearer path for evaluating
                blockchain opportunities.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#ddd3ee] md:text-xl">
                You do not need to understand blockchain to start. Begin with
                the business concern. CIL Market Bridge will help you map the
                areas involved and receive a simple preliminary reading.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setStarted(true)}
                  className="rounded-full bg-[#d8bbff] px-7 py-4 text-base font-bold text-[#241334] transition hover:bg-[#e6d3ff]"
                >
                  Start exploring
                </button>

                <div className="rounded-full border border-white/15 px-7 py-4 text-base font-medium text-[#ddd3ee]">
                  Free case map · Beta version
                </div>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-purple-950/40 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c8a6ff]">
                What the app does
              </p>

              <ol className="mt-5 space-y-4 text-[#f4eeff]">
                <li className="rounded-2xl bg-white/[0.06] p-4">
                  <span className="block text-sm text-[#c8a6ff]">01</span>
                  Helps you recognize the business concern
                </li>
                <li className="rounded-2xl bg-white/[0.06] p-4">
                  <span className="block text-sm text-[#c8a6ff]">02</span>
                  Lets you select all areas involved
                </li>
                <li className="rounded-2xl bg-white/[0.06] p-4">
                  <span className="block text-sm text-[#c8a6ff]">03</span>
                  Generates a simple free case map
                </li>
                <li className="rounded-2xl bg-white/[0.06] p-4">
                  <span className="block text-sm text-[#c8a6ff]">04</span>
                  Prepares the path toward a paid beta Opportunity Path
                </li>
              </ol>
            </aside>
          </div>
        </section>
      </main>
    );
  }

  if (showResult) {
    return (
      <main className="min-h-screen bg-[#0f0a19] text-[#f7f4ff]">
        <section className="mx-auto w-full max-w-5xl px-6 py-12 md:px-10">
          <button
            type="button"
            onClick={resetFlow}
            className="mb-8 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-[#ddd3ee] transition hover:bg-white/[0.06]"
          >
            Start again
          </button>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-purple-950/40 backdrop-blur md:p-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#c8a6ff]">
              Your free case map
            </p>

            <h1 className="text-4xl font-black leading-tight text-white md:text-5xl">
              {explorationLevel.label}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#ddd3ee]">
              {explorationLevel.description}
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-[#0f0a19]/50 p-6">
              <h2 className="text-xl font-bold text-white">
                Your case summary
              </h2>

              <p className="mt-4 leading-7 text-[#ddd3ee]">
                {caseDescription}
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-[#0f0a19]/50 p-6">
                <h2 className="text-xl font-bold text-white">
                  Areas involved
                </h2>

                <div className="mt-4 flex flex-wrap gap-3">
                  {selectedAreaObjects.map((area) => (
                    <span
                      key={area.id}
                      className="rounded-full bg-[#d8bbff] px-4 py-2 text-sm font-bold text-[#241334]"
                    >
                      {area.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#0f0a19]/50 p-6">
                <h2 className="text-xl font-bold text-white">
                  Your business context
                </h2>

                <p className="mt-4 text-[#ddd3ee]">{organizationType}</p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-[#0f0a19]/50 p-6">
              <h2 className="text-xl font-bold text-white">
                What this may suggest
              </h2>

              <div className="mt-5 space-y-4">
                {selectedAreaObjects.map((area) => (
                  <div key={area.id} className="rounded-2xl bg-white/[0.05] p-4">
                    <h3 className="font-bold text-[#e7d7ff]">{area.label}</h3>
                    <p className="mt-2 leading-7 text-[#ddd3ee]">
                      {area.preliminarySignal}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-[#0f0a19]/50 p-6">
              <h2 className="text-xl font-bold text-white">
                Suggested next step
              </h2>

              <p className="mt-3 leading-7 text-[#ddd3ee]">
                {suggestedNextStep}
              </p>
            </div>

            <div className="mt-8 rounded-3xl border border-[#d8bbff]/30 bg-[#d8bbff]/10 p-6">
              <h2 className="text-xl font-bold text-white">
                Before jumping into technology
              </h2>

              <p className="mt-3 leading-7 text-[#ddd3ee]">
                This result does not mean blockchain is automatically the right
                solution. It means your case shows signals that may deserve a
                clearer evaluation before investing in vendors, pilots, or
                technology that may not fit.
              </p>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.06] p-6">
              <h2 className="text-xl font-bold text-white">
                Want a clearer path?
              </h2>

              <p className="mt-3 leading-7 text-[#ddd3ee]">
                The next version of CIL Market Bridge will offer a paid beta
                Opportunity Path for USD 5, including a deeper review and a
                short human-reviewed note from CIL.
              </p>

              <button
                type="button"
                className="mt-5 rounded-full bg-[#d8bbff] px-6 py-3 text-sm font-bold text-[#241334] opacity-70"
              >
                Paid beta coming soon
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f0a19] text-[#f7f4ff]">
      <section className="mx-auto w-full max-w-6xl px-6 py-12 md:px-10">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#c8a6ff]">
            Free case map
          </p>

          <h1 className="text-4xl font-black leading-tight text-white md:text-5xl">
            What areas are connected to your business concern?
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#ddd3ee]">
            Choose every area that feels relevant. Real business problems often
            involve more than one dimension at the same time.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((area) => {
            const isSelected = selectedAreas.includes(area.id);

            return (
              <button
                key={area.id}
                type="button"
                onClick={() => toggleArea(area.id)}
                className={`rounded-3xl border p-5 text-left transition ${
                  isSelected
                    ? "border-[#d8bbff] bg-[#d8bbff]/20"
                    : "border-white/10 bg-white/[0.05] hover:border-[#d8bbff]/50"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-bold text-white">
                    {area.label}
                  </h2>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      isSelected
                        ? "bg-[#d8bbff] text-[#241334]"
                        : "bg-white/10 text-[#ddd3ee]"
                    }`}
                  >
                    {isSelected ? "Selected" : "Select"}
                  </span>
                </div>

                <p className="mt-4 leading-7 text-[#ddd3ee]">
                  {area.shortDescription}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            <label
              htmlFor="caseDescription"
              className="block text-xl font-bold text-white"
            >
              Briefly describe what is happening in your case.
            </label>

            <p className="mt-2 text-sm leading-6 text-[#cfc4df]">
              Example: We need to track product origin, confirm supplier
              payments, and provide certificates that clients can verify.
            </p>

            <textarea
              id="caseDescription"
              value={caseDescription}
              onChange={(event) => setCaseDescription(event.target.value)}
              className="mt-4 min-h-40 w-full rounded-2xl border border-white/10 bg-[#0f0a19] p-4 text-[#f7f4ff] outline-none transition placeholder:text-[#8d7da3] focus:border-[#d8bbff]"
              placeholder="Tell us what is happening..."
            />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            <label
              htmlFor="organizationType"
              className="block text-xl font-bold text-white"
            >
              What best describes your organization?
            </label>

            <select
              id="organizationType"
              value={organizationType}
              onChange={(event) => setOrganizationType(event.target.value)}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-[#0f0a19] p-4 text-[#f7f4ff] outline-none transition focus:border-[#d8bbff]"
            >
              <option value="">Select one option</option>
              {organizationTypes.map((type) => (
                <option key={type} value={type} className="bg-[#0f0a19]">
                  {type}
                </option>
              ))}
            </select>

            <div className="mt-6 rounded-2xl bg-[#d8bbff]/10 p-4 text-sm leading-6 text-[#ddd3ee]">
              This free version gives you a simple case map. The paid beta path
              will later offer a deeper review and a short human-reviewed note
              from CIL.
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            disabled={!canGenerateResult}
            onClick={() => setShowResult(true)}
            className="rounded-full bg-[#d8bbff] px-7 py-4 text-base font-bold text-[#241334] transition hover:bg-[#e6d3ff] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Generate free case map
          </button>

          <button
            type="button"
            onClick={resetFlow}
            className="rounded-full border border-white/15 px-7 py-4 text-base font-semibold text-[#ddd3ee] transition hover:bg-white/[0.06]"
          >
            Reset
          </button>
        </div>

        {!canGenerateResult && (
          <p className="mt-4 text-sm text-[#cfc4df]">
            To generate your free case map, select at least one area, describe
            your case with a bit of context, and choose an organization type.
          </p>
        )}
      </section>
    </main>
  );
}
