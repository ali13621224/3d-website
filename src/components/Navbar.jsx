const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#features', label: 'Features' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <header className="nav">
      <nav className="nav__inner" aria-label="Main">
        <a className="nav__brand" href="#home">
          <span className="nav__mark" aria-hidden="true" />
          Aurora
        </a>
        <ul className="nav__links">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <a className="btn btn--small" href="#contact">
          Start a project
        </a>
      </nav>
    </header>
  )
}
