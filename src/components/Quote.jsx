import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { contact, quoteRooms, wa } from '../data/site'
import { useLang } from '../i18n/LanguageContext'
import { ArchImage, Marker, WhatsAppIcon } from './ui'
import { Magnetic, Reveal, SplitText } from '../fx'
import { swingChair } from '../data/site'

<<<<<<< HEAD
/**
 * The one form on the page — and it does not post anywhere.
 *
 * There is no backend here and there should not be one: a landing page that
 * swallows a lead into a database nobody at Heaven checks is worse than no
 * form at all. Instead the fields compose a message and hand it to WhatsApp or
 * the mail client already written, so the enquiry lands in the same inbox the
 * showroom already answers on their phone.
 *
 * That also means nothing can be lost. The visitor sees exactly what is about
 * to be sent, in their own messaging app, and can edit it before it goes.
 *
 * Only name and phone are required. Every extra field a first-time buyer has
 * to fill in is a reason to close the tab, and Heaven can ask the rest in the
 * conversation this form is only trying to start.
 */
=======
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
export default function Quote() {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', phone: '', room: '', detail: '' })
  const [touched, setTouched] = useState(false)

  const set = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))

  const ready = form.name.trim().length > 1 && form.phone.trim().length > 5

  const message = useMemo(() => {
    const lines = ['Hello Heaven Furniture Mart, I would like to request a design consultation.', '']
    if (form.name.trim()) lines.push(`Name: ${form.name.trim()}`)
    if (form.phone.trim()) lines.push(`Phone: ${form.phone.trim()}`)
    if (form.room) lines.push(`Looking for: ${form.room}`)
    if (form.detail.trim()) lines.push('', form.detail.trim())
    lines.push('', 'Could you let me know what is possible and roughly what it would cost?')
    return lines.join('\n')
  }, [form])

  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(
    'Design consultation request',
  )}&body=${encodeURIComponent(message)}`

  const send = (event) => {
    event.preventDefault()
    setTouched(true)
    if (!ready) return
    window.open(wa(message), '_blank', 'noopener')
  }

  const field =
<<<<<<< HEAD
    'w-full rounded-xl border bg-ivory/60 px-4 py-3.5 text-[0.95rem] text-ink transition-colors duration-300 placeholder:text-walnut/45 focus:border-gold focus:outline-none'
=======
    'w-full rounded-xl border bg-ivory/60 px-4 py-3.5 text-[1.02rem] text-ink transition-colors duration-300 placeholder:text-walnut/65 focus:border-gold focus:outline-none'
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)

  const invalid = (value, min) => touched && value.trim().length <= min

  return (
    <section id="quote" className="py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Marker>{t('quoteMarker')}</Marker>
            </Reveal>
            <SplitText
              as="h2"
              text={t('quoteTitle')}
              className="balance mt-6 block font-display text-[length:var(--text-display)] leading-[1.02]"
            />
            <Reveal delay={0.1}>
<<<<<<< HEAD
              <p className="pretty mt-7 max-w-lg text-lg leading-relaxed text-walnut/85">
=======
              <p className="pretty mt-7 max-w-lg text-lg leading-relaxed text-walnut/92">
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
                {t('quoteBody')}
              </p>
            </Reveal>

            <div className="mt-10 hidden max-w-sm lg:block">
              <ArchImage
                src={swingChair}
                alt={t('quoteImageAlt')}
                w={872}
                h={1192}
                shape="low"
                drift={7}
                focus="center"
                className="aspect-[4/3] w-full"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <form
                onSubmit={send}
                noValidate
                className="rounded-[2rem] border border-walnut/15 bg-linen/50 p-6 sm:p-9"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
<<<<<<< HEAD
                    <label htmlFor="q-name" className="text-[0.9rem] text-walnut/75">
=======
                    <label htmlFor="q-name" className="text-[0.96rem] text-walnut/88">
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
                      {t('quoteName')}
                    </label>
                    <input
                      id="q-name"
                      value={form.name}
                      onChange={set('name')}
                      autoComplete="name"
                      placeholder={t('quoteNamePlaceholder')}
                      aria-invalid={invalid(form.name, 1)}
                      className={`mt-2 ${field} ${
                        invalid(form.name, 1) ? 'border-red-700/50' : 'border-walnut/20'
                      }`}
                    />
                  </div>

                  <div>
<<<<<<< HEAD
                    <label htmlFor="q-phone" className="text-[0.9rem] text-walnut/75">
=======
                    <label htmlFor="q-phone" className="text-[0.96rem] text-walnut/88">
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
                      {t('quotePhone')}
                    </label>
                    <input
                      id="q-phone"
                      value={form.phone}
                      onChange={set('phone')}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="01XXXXXXXXX"
                      aria-invalid={invalid(form.phone, 5)}
                      className={`mt-2 ${field} ${
                        invalid(form.phone, 5) ? 'border-red-700/50' : 'border-walnut/20'
                      }`}
                    />
                  </div>
                </div>

                <fieldset className="mt-6">
<<<<<<< HEAD
                  <legend className="text-[0.9rem] text-walnut/75">{t('quoteRoom')}</legend>
=======
                  <legend className="text-[0.96rem] text-walnut/88">{t('quoteRoom')}</legend>
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {quoteRooms.map((room) => {
                      const active = form.room === room.value
                      return (
                        <motion.button
                          key={room.value}
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              room: prev.room === room.value ? '' : room.value,
                            }))
                          }
                          aria-pressed={active}
                          whileTap={{ scale: 0.94 }}
                          whileHover={{ y: -2 }}
                          transition={{ type: 'spring', stiffness: 420, damping: 26 }}
<<<<<<< HEAD
                          className={`rounded-full border px-4 py-2 text-[0.9rem] transition-colors duration-300 ${
=======
                          className={`rounded-full border px-4 py-2 text-[0.96rem] transition-colors duration-300 ${
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
                            active
                              ? 'border-forest bg-forest text-ivory'
                              : 'border-walnut/25 text-walnut hover:border-gold-deep hover:text-ink'
                          }`}
                        >
                          {t(room.label)}
                        </motion.button>
                      )
                    })}
                  </div>
                </fieldset>

                <div className="mt-6">
<<<<<<< HEAD
                  <label htmlFor="q-detail" className="text-[0.9rem] text-walnut/75">
=======
                  <label htmlFor="q-detail" className="text-[0.96rem] text-walnut/88">
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
                    {t('quoteDetail')}
                  </label>
                  <textarea
                    id="q-detail"
                    value={form.detail}
                    onChange={set('detail')}
                    rows={4}
                    placeholder={t('quoteDetailPlaceholder')}
                    className={`mt-2 resize-none border-walnut/20 ${field}`}
                  />
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  <Magnetic className="block w-full sm:w-auto">
                    <button
                      type="submit"
                      className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-forest px-8 py-4 font-medium text-ivory transition-colors duration-500 hover:text-forest-deep sm:w-auto"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                      />
                      <span className="relative flex items-center gap-2.5">
                        <WhatsAppIcon />
                        {t('quoteSend')}
                      </span>
                    </button>
                  </Magnetic>

<<<<<<< HEAD
                  <p className="text-[0.85rem] leading-relaxed text-walnut/60">
=======
                  <p className="text-[0.92rem] leading-relaxed text-walnut/75">
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
                    {t('quoteNote')}{' '}
                    <a
                      href={mailto}
                      className="border-b border-walnut/30 pb-0.5 text-walnut transition-colors hover:border-gold-deep hover:text-gold-deep"
                    >
                      {t('quoteEmailInstead')}
                    </a>
                  </p>

                  {touched && !ready && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
<<<<<<< HEAD
                      className="text-[0.85rem] text-red-800"
=======
                      className="text-[0.92rem] text-red-800"
>>>>>>> 9df94b3 (Fixed all issues and improve the ui)
                    >
                      {t('quoteError')}
                    </motion.p>
                  )}
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
