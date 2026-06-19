import {
  betaFeedbackUrl,
  betaRequestUrl,
  focusAreas,
} from "../data/marketBridgeData";
import { buildExplorationResult } from "../lib/resultLogic";
import type { CaseData } from "../types/marketBridge";

type CaseResultProps = {
  caseData: CaseData;
  onEditCase: () => void;
  onStartNewCase: () => void;
};

export default function CaseResult({
  caseData,
  onEditCase,
  onStartNewCase,
}: CaseResultProps) {
  const selectedAreaObjects = focusAreas.filter((area) =>
    caseData.selectedAreas.includes(area.id)
  );

  const result = buildExplorationResult(caseData.selectedAreas);

  return (
    <main className="min-h-screen bg-[#0f0a19] text-[#f7f4ff]">
      <section className="mx-auto w-full max-w-5xl px-6 py-12 md:px-10">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onEditCase}
            className="rounded-full border border-[#d8bbff]/40 px-5 py-3 text-sm font-semibold text-[#e7d7ff] transition hover:bg-[#d8bbff]/10"
          >
            Edit my case
          </button>

          <button
            type="button"
            onClick={onStartNewCase}
            className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-[#ddd3ee] transition hover:bg-white/[0.06]"
          >
            Start a new case
          </button>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-purple-950/40 backdrop-blur md:p-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#c8a6ff]">
            Your free case map
          </p>

          <h1 className="text-4xl font-black leading-tight text-white md:text-5xl">
            {result.label}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#ddd3ee]">
            {result.description}
          </p>

          <div className="mt-8 rounded-3xl border border-[#d8bbff]/25 bg-[#d8bbff]/10 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c8a6ff]">
              Main pattern detected
            </p>

            <h2 className="mt-3 text-2xl font-black text-white">
              {result.patternTitle}
            </h2>

            <p className="mt-3 leading-7 text-[#ddd3ee]">
              {result.patternDescription}
            </p>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-[#0f0a19]/50 p-6">
            <h2 className="text-xl font-bold text-white">
              Your case summary
            </h2>

            <p className="mt-4 whitespace-pre-wrap leading-7 text-[#ddd3ee]">
              {caseData.caseDescription}
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-[#0f0a19]/50 p-6">
              <h2 className="text-xl font-bold text-white">Areas involved</h2>

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

              <p className="mt-4 text-[#ddd3ee]">
                {caseData.organizationType}
              </p>

              <p className="mt-3 break-all text-sm text-[#cfc4df]">
                Contact: {caseData.contactEmail}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-[#0f0a19]/50 p-6">
            <h2 className="text-xl font-bold text-white">
              What the selected areas may suggest
            </h2>

            <div className="mt-5 space-y-4">
              {selectedAreaObjects.map((area) => (
                <div
                  key={area.id}
                  className="rounded-2xl border border-white/5 bg-white/[0.05] p-4"
                >
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
              {result.suggestedNextStep}
            </p>
          </div>

          <div className="mt-8 rounded-3xl border border-[#d8bbff]/30 bg-[#d8bbff]/10 p-6">
            <h2 className="text-xl font-bold text-white">
              Before jumping into technology
            </h2>

            <p className="mt-3 leading-7 text-[#ddd3ee]">
              This result does not mean blockchain is automatically the right
              solution. It means the case contains signals that may deserve a
              clearer evaluation before investing in a platform, vendor, pilot,
              or technology that may not fit.
            </p>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#c8a6ff]">
              Deeper beta review
            </p>

            <h2 className="text-2xl font-black text-white">
              Beta Opportunity Path — USD 5
            </h2>

            <p className="mt-3 leading-7 text-[#ddd3ee]">
              Receive a deeper review of your case, including possible
              blockchain relevance, caution signals, simpler alternatives when
              appropriate, a suggested exploration path, and a short
              human-reviewed note from CIL.
            </p>

            <ul className="mt-5 space-y-3 text-[#ddd3ee]">
              <li>• A deeper reading of the selected business areas.</li>
              <li>• Possible technology and coordination signals.</li>
              <li>• Warnings when a simpler tool may be enough.</li>
              <li>• A practical next step for exploration.</li>
              <li>• A short human-reviewed note from CIL.</li>
            </ul>

            <a
              href={betaRequestUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-full bg-[#d8bbff] px-6 py-3 text-sm font-bold text-[#241334] transition hover:bg-[#e6d3ff]"
            >
              Request Beta Opportunity Path
            </a>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-[#0f0a19]/50 p-6">
            <h2 className="text-xl font-bold text-white">
              Help us improve the beta
            </h2>

            <p className="mt-3 leading-7 text-[#ddd3ee]">
              Tell us whether this case map was clear, useful, and connected to
              your business concern.
            </p>

            {betaFeedbackUrl ? (
              <a
                href={betaFeedbackUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-full border border-[#d8bbff]/40 px-6 py-3 text-sm font-bold text-[#e7d7ff] transition hover:bg-[#d8bbff]/10"
              >
                Give beta feedback
              </a>
            ) : (
              <p className="mt-4 text-sm text-[#a99bbd]">
                The beta feedback form will be available soon.
              </p>
            )}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 p-5 text-sm leading-6 text-[#a99bbd]">
            This is an early beta. Do not submit confidential, private, or
            sensitive business information. Information submitted through the
            request or feedback forms will be used only to respond to the
            request and improve CIL Market Bridge.
          </div>
        </div>
      </section>
    </main>
  );
}
