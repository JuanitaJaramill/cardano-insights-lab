import { focusAreas, organizationTypes } from "../data/marketBridgeData";
import { isValidEmail } from "../lib/resultLogic";
import type { AreaId, CaseData } from "../types/marketBridge";

type CaseFormProps = {
  caseData: CaseData;
  onToggleArea: (areaId: AreaId) => void;
  onCaseDescriptionChange: (value: string) => void;
  onOrganizationTypeChange: (value: string) => void;
  onContactEmailChange: (value: string) => void;
  onGenerateResult: () => void;
  onReset: () => void;
};

export default function CaseForm({
  caseData,
  onToggleArea,
  onCaseDescriptionChange,
  onOrganizationTypeChange,
  onContactEmailChange,
  onGenerateResult,
  onReset,
}: CaseFormProps) {
  const canGenerateResult =
    caseData.selectedAreas.length > 0 &&
    caseData.caseDescription.trim().length > 20 &&
    caseData.organizationType.length > 0 &&
    isValidEmail(caseData.contactEmail);

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
            const isSelected = caseData.selectedAreas.includes(area.id);

            return (
              <button
                key={area.id}
                type="button"
                onClick={() => onToggleArea(area.id)}
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
              value={caseData.caseDescription}
              onChange={(event) =>
                onCaseDescriptionChange(event.target.value)
              }
              className="mt-4 min-h-40 w-full rounded-2xl border border-white/10 bg-[#0f0a19] p-4 text-[#f7f4ff] outline-none transition placeholder:text-[#8d7da3] focus:border-[#d8bbff]"
              placeholder="Tell us what is happening..."
            />

            <p className="mt-3 text-xs leading-5 text-[#a99bbd]">
              Do not include confidential, sensitive, or private business
              information.
            </p>
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
              value={caseData.organizationType}
              onChange={(event) =>
                onOrganizationTypeChange(event.target.value)
              }
              className="mt-4 w-full rounded-2xl border border-white/10 bg-[#0f0a19] p-4 text-[#f7f4ff] outline-none transition focus:border-[#d8bbff]"
            >
              <option value="">Select one option</option>

              {organizationTypes.map((type) => (
                <option key={type} value={type} className="bg-[#0f0a19]">
                  {type}
                </option>
              ))}
            </select>

            <label
              htmlFor="contactEmail"
              className="mt-6 block text-xl font-bold text-white"
            >
              Contact email
            </label>

            <p className="mt-2 text-sm leading-6 text-[#cfc4df]">
              This helps CIL follow up if you request the Beta Opportunity Path.
            </p>

            <input
              id="contactEmail"
              type="email"
              value={caseData.contactEmail}
              onChange={(event) => onContactEmailChange(event.target.value)}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-[#0f0a19] p-4 text-[#f7f4ff] outline-none transition placeholder:text-[#8d7da3] focus:border-[#d8bbff]"
              placeholder="name@example.com"
            />

            <div className="mt-6 rounded-2xl bg-[#d8bbff]/10 p-4 text-sm leading-6 text-[#ddd3ee]">
              The free version provides a simple case map. The paid beta path
              will offer a deeper review and a short human-reviewed note from
              CIL.
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            disabled={!canGenerateResult}
            onClick={onGenerateResult}
            className="rounded-full bg-[#d8bbff] px-7 py-4 text-base font-bold text-[#241334] transition hover:bg-[#e6d3ff] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Generate free case map
          </button>

          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-white/15 px-7 py-4 text-base font-semibold text-[#ddd3ee] transition hover:bg-white/[0.06]"
          >
            Reset
          </button>
        </div>

        {!canGenerateResult && (
          <p className="mt-4 text-sm text-[#cfc4df]">
            To generate your free case map, select at least one area, describe
            your case with some context, choose an organization type, and add a
            valid email.
          </p>
        )}
      </section>
    </main>
  );
}
