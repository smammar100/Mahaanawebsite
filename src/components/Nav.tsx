import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Nav() {
  return (
    <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-4">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="body-md font-medium text-foreground underline-offset-4 transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
