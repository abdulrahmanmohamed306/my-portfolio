import { skillGroups } from "@/lib/site";

/**
 * Skills set out as a trial balance: accounting skills on the debit side,
 * data skills on the credit side, and the two sides balance.
 */
export function SkillsTrialBalance() {
  const [debit, credit] = skillGroups;
  const rows = [
    ...debit.items.map((s) => ({ ...s, side: "dr" as const })),
    ...credit.items.map((s) => ({ ...s, side: "cr" as const })),
  ];

  return (
    <figure className="border border-rule-strong bg-sheet">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule-strong px-5 py-3">
        <span className="font-serif text-lg text-ink">Trial balance of skills</span>
        <span className="text-xs text-muted">
          Dr {debit.title}, Cr {credit.title}
        </span>
      </figcaption>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-rule text-left text-xs text-muted">
            <th scope="col" className="px-5 py-2 font-medium">
              Account
            </th>
            <th scope="col" className="w-16 px-3 py-2 text-center font-medium sm:w-24">
              Dr
            </th>
            <th scope="col" className="w-16 px-3 py-2 text-center font-medium sm:w-24">
              Cr
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.name} className={`${i % 2 === 0 ? "bg-bar/60" : ""} ${i === debit.items.length ? "border-t border-rule-strong" : ""}`}>
              <th scope="row" className={`py-2.5 pr-3 text-left font-normal ${r.side === "cr" ? "pl-10 sm:pl-14" : "pl-5"}`}>
                <span className="block font-medium text-ink">{r.name}</span>
                <span className="block text-xs text-muted">{r.note}</span>
              </th>
              <td className="px-3 py-2.5 text-center align-middle font-serif text-lg text-ledger">
                {r.side === "dr" ? <span aria-label="Debit">✓</span> : ""}
              </td>
              <td className="px-3 py-2.5 text-center align-middle font-serif text-lg text-ledger">
                {r.side === "cr" ? <span aria-label="Credit">✓</span> : ""}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-ink">
            <th scope="row" className="px-5 pb-4 pt-3 text-left font-semibold text-ink">
              Totals
              <span className="block text-xs font-normal text-ledger">Balanced: the accounting and the analysis carry each other.</span>
            </th>
            <td className="px-3 pb-4 pt-3 text-center">
              <span className="figure double-rule pb-0.5 font-serif text-lg font-semibold text-ink">{debit.items.length}</span>
            </td>
            <td className="px-3 pb-4 pt-3 text-center">
              <span className="figure double-rule pb-0.5 font-serif text-lg font-semibold text-ink">{credit.items.length}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </figure>
  );
}
