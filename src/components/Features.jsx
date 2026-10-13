const FEATURES = [
  {
    title: 'Real-time rendering',
    body: 'A distorted metallic orb, an orbiting knot and drifting shards, all shaded live by WebGL on every frame.',
    accent: '#22d3ee',
  },
  {
    title: 'Reactive by design',
    body: 'Move your cursor and the camera follows. Scroll and the whole world rotates, drifts and eases ahead of you.',
    accent: '#a855f7',
  },
  {
    title: 'Modern, small stack',
    body: 'Vite for instant reloads, React for the interface, React Three Fiber for the scene. No heavyweight engine.',
    accent: '#f472b6',
  },
]

export default function Features() {
  return (
    <section id="features" className="section features">
      <p className="eyebrow">What makes it tick</p>
      <h2 className="section__title">
        A scene you can <span className="gradient">feel</span>.
      </h2>
      <div className="cards">
        {FEATURES.map((feature) => (
          <article className="card" key={feature.title}>
            <span className="card__dot" style={{ background: feature.accent }} aria-hidden="true" />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
