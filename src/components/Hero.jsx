export default function Hero() {
  return (
    <section id="home" className="section hero">
      <div className="hero__inner">
        <p className="eyebrow">React Three Fiber · WebGL</p>
        <h1 className="hero__title">
          Shape light,
          <br />
          <span className="gradient">move matter.</span>
        </h1>
        <p className="hero__lede">
          Aurora is a real-time 3D playground that answers your cursor and your scroll.
          Everything you see is live geometry rendered on the GPU — no video, no images.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#features">
            Explore the build
          </a>
          <a className="btn btn--ghost" href="#contact">
            Get in touch
          </a>
        </div>
        <ul className="hero__stats">
          <li>
            <strong>60fps</strong>
            <span>GPU rendered</span>
          </li>
          <li>
            <strong>0</strong>
            <span>video files</span>
          </li>
          <li>
            <strong>100%</strong>
            <span>live geometry</span>
          </li>
        </ul>
      </div>
      <div className="scroll-hint" aria-hidden="true">
        <span />
      </div>
    </section>
  )
}
