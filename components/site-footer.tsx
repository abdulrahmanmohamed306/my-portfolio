import { profile } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} {profile.fullName}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a href={`mailto:${profile.email}`} className="hover:text-ledger">Email</a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ledger">LinkedIn</a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-ledger">GitHub</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
