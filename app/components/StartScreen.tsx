type StartScreenProps = {
  onStart: () => void;
};

export default function StartScreen({ onStart }: StartScreenProps) {
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
              You do not need to understand blockchain to start. Begin with the
              business concern. CIL Market Bridge will help you map the areas
              involved and receive a simple preliminary reading.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={onStart}
                className="rounded-full bg-[#d8bbff] px-7 py-4 text-base font-bold text-[#241334] transition hover:bg-[#e6d3ff]"
              >
                Start exploring
              </button>

              
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
