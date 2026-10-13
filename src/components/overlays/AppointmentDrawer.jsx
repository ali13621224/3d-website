import { useState } from 'react'
import { APPOINTMENT_TYPES, BOUTIQUES, TIME_SLOTS } from '../../data/site.js'
import { useStore } from '../../store/StoreContext.jsx'
import Drawer from '../ui/Drawer.jsx'
import { ArrowLong, Check } from '../ui/Icons.jsx'

const EMPTY = {
  type: APPOINTMENT_TYPES[0],
  boutique: BOUTIQUES[0],
  date: '',
  time: TIME_SLOTS[0],
  name: '',
  email: '',
  notes: '',
}

/** "Book a Private Viewing" — private salon, virtual consultation and bespoke. */
export default function AppointmentDrawer() {
  const { panel, closePanel } = useStore()
  const [form, setForm] = useState(EMPTY)
  const [done, setDone] = useState(false)
  const open = panel === 'appointment'

  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    setDone(true)
  }

  const reset = () => {
    setForm(EMPTY)
    setDone(false)
  }

  return (
    <Drawer
      open={open}
      onClose={() => {
        closePanel()
        setTimeout(reset, 320)
      }}
      eyebrow="Private viewing"
      title={done ? 'Appointment Requested' : 'Book an Appointment'}
      label="Book an appointment"
    >
      {done ? (
        <div className="booked">
          <span className="booked__mark" aria-hidden="true">
            <Check />
          </span>
          <h4 className="booked__title">Thank you, {form.name || 'friend'}.</h4>
          <p className="booked__copy">
            A private advisor will confirm your {form.type.toLowerCase()} on{' '}
            {form.date || 'your chosen date'} at {form.time}.
          </p>
          <dl className="booked__summary">
            <div>
              <dt>Boutique</dt>
              <dd>{form.boutique}</dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>{form.email}</dd>
            </div>
          </dl>
          <button type="button" className="btn btn--ghost" onClick={reset}>
            <span>Book another appointment</span>
          </button>
        </div>
      ) : (
        <form className="appt" onSubmit={submit}>
          <p className="appt__lead">
            Choose a salon or meet us online. Appointments are held for 60 minutes, with the
            pieces you select laid out on velvet.
          </p>

          <label className="field">
            <span>Appointment type</span>
            <select value={form.type} onChange={update('type')}>
              {APPOINTMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Boutique</span>
            <select value={form.boutique} onChange={update('boutique')}>
              {BOUTIQUES.map((boutique) => (
                <option key={boutique} value={boutique}>
                  {boutique}
                </option>
              ))}
            </select>
          </label>

          <div className="appt__grid">
            <label className="field">
              <span>Preferred date</span>
              <input type="date" value={form.date} onChange={update('date')} required />
            </label>
            <label className="field">
              <span>Time</span>
              <select value={form.time} onChange={update('time')}>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="field">
            <span>Your name</span>
            <input
              type="text"
              value={form.name}
              onChange={update('name')}
              placeholder="Name and surname"
              required
            />
          </label>

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={update('email')}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="field">
            <span>Pieces to prepare</span>
            <textarea
              rows="3"
              value={form.notes}
              onChange={update('notes')}
              placeholder="Solitaire rings around 2 ct, platinum settings…"
            />
          </label>

          <button type="submit" className="btn btn--solid btn--block">
            <span>Request Appointment</span>
            <ArrowLong />
          </button>
          <p className="appt__fine">
            No payment is taken. We will confirm by email within one business day.
          </p>
        </form>
      )}
    </Drawer>
  )
}
