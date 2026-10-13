export default function Footer() {
  return (
    <section id="contact" className="section contact">
      <div className="contact__panel">
        <h2 className="section__title">
          Let&rsquo;s build something <span className="gradient">dimensional</span>.
        </h2>
        <p className="contact__lede">
          This is a starter scene — swap the geometry, the palette and the copy and it is yours.
        </p>
        <a className="btn btn--primary" href="mailto:hello@example.com">
          hello@example.com
        </a>
      </div>
      <footer className="footer">
        <span>Aurora · built with React Three Fiber</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </section>
  )
}
