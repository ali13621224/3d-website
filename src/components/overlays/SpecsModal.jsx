import { fourCs, metalMeta, metalValue } from '../../lib/pricing.js'
import { formatPrice } from '../../lib/currency.js'
import { useStore } from '../../store/StoreContext.jsx'
import Modal from '../ui/Modal.jsx'
import { Certificate } from '../ui/Icons.jsx'

/** The 4 Cs, the certificate and the metal valuation for one jewel. */
export default function SpecsModal({ jewel, open, onClose, metal }) {
  const { currency } = useStore()
  if (!jewel) return null

  const chosenMetal = metal || jewel.defaultMetal
  const goldValue = metalValue(jewel, chosenMetal)

  return (
    <Modal
      open={open}
      onClose={onClose}
      eyebrow={`${jewel.certificate} certified`}
      title={`${jewel.name} — Specification`}
      size="lg"
    >
      <div className="specs">
        <div className="specs__cert">
          <span className="specs__cert-mark" aria-hidden="true">
            <Certificate />
          </span>
          <div>
            <strong>{jewel.certificate} Grading Report</strong>
            <p>
              Supplied with the original grading report and an ÉCLAT authenticity card matching the
              laser inscription on the girdle.
            </p>
          </div>
        </div>

        <dl className="specs__cs">
          {fourCs(jewel).map((entry) => (
            <div className="specs__cs-item" key={entry.key}>
              <dt>{entry.key}</dt>
              <dd>{entry.value}</dd>
            </div>
          ))}
        </dl>

        <dl className="specs__rows">
          <div>
            <dt>Shape</dt>
            <dd className="specs__cap">{jewel.shape}</dd>
          </div>
          <div>
            <dt>Setting</dt>
            <dd>{jewel.collection}</dd>
          </div>
          <div>
            <dt>Metal</dt>
            <dd>{metalMeta(jewel, chosenMetal)}</dd>
          </div>
          <div>
            <dt>Finished metal value</dt>
            <dd className="num">
              {formatPrice(goldValue, currency)} <span className="specs__hint">at spot</span>
            </dd>
          </div>
          <div>
            <dt>Provenance</dt>
            <dd>100% conflict-free · Kimberley Process compliant</dd>
          </div>
        </dl>
      </div>
    </Modal>
  )
}
