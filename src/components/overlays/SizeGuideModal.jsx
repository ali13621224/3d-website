import { useState } from 'react'
import { RING_SIZES, sizeFromDiameter } from '../../data/site.js'
import { useStore } from '../../store/StoreContext.jsx'
import Modal from '../ui/Modal.jsx'
import { ArrowLong, Ruler } from '../ui/Icons.jsx'

/** Interactive ring size finder across US, EU and UK scales. */
export default function SizeGuideModal() {
  const { panel, closePanel, notify } = useStore()
  const [diameter, setDiameter] = useState('16.5')
  const open = panel === 'sizeGuide'

  const match = sizeFromDiameter(diameter)

  return (
    <Modal
      open={open}
      onClose={closePanel}
      eyebrow="Fit with confidence"
      title="Ring Size Guide"
      size="lg"
      footer={
        <div className="sizes__foot">
          <p className="sizes__fine">
            Between two sizes? Take the larger. Every ÉCLAT ring includes one complimentary resize
            within the first year.
          </p>
          <button
            type="button"
            className="btn"
            onClick={() => notify('A complimentary ring sizer is on its way')}
          >
            <span>Request a Free Ring Sizer</span>
            <ArrowLong />
          </button>
        </div>
      }
    >
      <div className="sizes">
        <div className="sizes__calc">
          <span className="sizes__icon" aria-hidden="true">
            <Ruler />
          </span>
          <div className="sizes__calc-body">
            <label className="field">
              <span>Inner diameter of a ring you own (mm)</span>
              <input
                type="number"
                inputMode="decimal"
                step="0.1"
                min="13"
                max="23"
                value={diameter}
                onChange={(event) => setDiameter(event.target.value)}
              />
            </label>
            <div className="sizes__result">
              <p className="micro">Closest ÉCLAT size</p>
              {match ? (
                <p className="sizes__match">
                  <span className="num">US {match.us}</span>
                  <span className="num">EU {match.eu}</span>
                  <span className="num">UK {match.uk}</span>
                </p>
              ) : (
                <p className="sizes__empty">Enter a diameter between 13 and 23 mm.</p>
              )}
            </div>
          </div>
        </div>

        <div className="sizes__table-wrap">
          <table className="sizes__table num">
            <thead>
              <tr>
                <th scope="col">US</th>
                <th scope="col">EU</th>
                <th scope="col">UK</th>
                <th scope="col">Inner Ø (mm)</th>
              </tr>
            </thead>
            <tbody>
              {RING_SIZES.map((row) => (
                <tr key={row.us} className={match?.us === row.us ? 'is-active' : undefined}>
                  <td>{row.us}</td>
                  <td>{row.eu}</td>
                  <td>{row.uk}</td>
                  <td>{row.diameter.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  )
}
