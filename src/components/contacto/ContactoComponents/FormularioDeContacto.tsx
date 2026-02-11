import api from '../../../api/axios'; // Import axios instance
import React, { useState } from 'react'
import { toast, Toaster } from 'sonner'
import logoEliud from '@/assets/logo/logo-eliud.png';
import { t } from '../../../i18n/utils';
import CorreoConfirmacion from './CorreoConfirmacion';

// Definición del estado del formulario
type FormState = {
  nombre: string
  apellido: string
  email: string
  telefono: string
  pais: string
  message: string
  robot: boolean
}

interface Props {
  lang?: string;
}

export default function FormularioDeContacto({ lang = 'es' }: Props) {
  const [form, setForm] = useState<FormState>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    pais: '',
    message: '',
    robot: false,
  })
  const [sending, setSending] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement
    setForm((s) => ({ ...s, [name]: value }))
  }

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setForm((s) => ({ ...s, robot: checked }))
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.nombre.trim()) errs.nombre = t(lang, 'contact.form.error.firstname')
    if (!form.email.trim()) errs.email = t(lang, 'contact.form.error.email.required')
    else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!re.test(form.email)) errs.email = t(lang, 'contact.form.error.email.invalid')
    }
    if (!form.message.trim()) errs.message = t(lang, 'contact.form.error.message')
    if (!form.robot) errs.robot = t(lang, 'contact.form.error.robot')
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()


    if (!validate()) return

    setSending(true)
    try {
      const payload = {
        nombre: form.nombre,
        apellido: form.apellido,
        email: form.email,
        telefono: form.telefono,
        pais: form.pais,
        message: form.message,
      }

      await api.post('/email', payload)

      setShowConfirmation(true)
      setForm({ nombre: '', apellido: '', email: '', telefono: '', pais: '', message: '', robot: false })
      setFieldErrors({})
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || t(lang, 'contact.form.error.send'))
    } finally {
      setSending(false)
    }
  }






  return (
    <>
      <div className="w-full bg-white p-6 md:p-12 rounded-[2.5rem] shadow-2xl font-sans border border-[#8BC34A]/10">
        <div className="flex justify-center mb-4">
          <img src={logoEliud.src} alt="Eliud" className="h-20 w-auto lg:h-24" />
        </div>

        <h2 className="text-2xl font-bold mb-3 text-center text-gray-900">{t(lang, 'contact.form.title')}</h2>
        <p className="text-gray-500 mb-6 text-center text-sm">{t(lang, 'contact.form.subtitle')}</p>

        <Toaster position="top-right" />

        <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">{t(lang, 'contact.form.firstname')} <span className="text-red-500">*</span></label>
              <input name="nombre" value={form.nombre} onChange={handleChange} type="text" className="w-full px-4 py-3 lg:px-5 lg:py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#8BC34A] focus:ring-2 focus:ring-[#8BC34A]/20 transition text-base" />
              {fieldErrors.nombre && <p className="text-xs text-red-600 mt-1">{fieldErrors.nombre}</p>}
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">{t(lang, 'contact.form.lastname')}</label>
              <input name="apellido" value={form.apellido} onChange={handleChange} type="text" className="w-full px-4 py-3 lg:px-5 lg:py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#8BC34A] focus:ring-2 focus:ring-[#8BC34A]/20 transition text-base" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">{t(lang, 'contact.form.email')} <span className="text-red-500">*</span></label>
              <input name="email" value={form.email} onChange={handleChange} type="email" className="w-full px-4 py-3 lg:px-5 lg:py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#8BC34A] focus:ring-2 focus:ring-[#8BC34A]/20 transition text-base" />
              {fieldErrors.email && <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>}
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">{t(lang, 'contact.form.country')}</label>
              <input name="pais" value={form.pais} onChange={handleChange} type="text" className="w-full px-4 py-3 lg:px-5 lg:py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#8BC34A] focus:ring-2 focus:ring-[#8BC34A]/20 transition text-base" />
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">{t(lang, 'contact.form.message')} <span className="text-red-500">*</span></label>
            <textarea name="message" value={form.message} onChange={handleChange} className="w-full px-4 py-3 lg:px-5 lg:py-4 border-2 border-gray-200 rounded-lg text-base min-h-[140px] lg:min-h-[200px] resize-none focus:outline-none focus:border-[#8BC34A] focus:ring-2 focus:ring-[#8BC34A]/20 transition" />
            {fieldErrors.message && <p className="text-xs text-red-600 mt-1">{fieldErrors.message}</p>}
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
              <input checked={form.robot} onChange={handleCheckbox} type="checkbox" id="robot" className="w-5 h-5" />
              <label htmlFor="robot" className="text-sm text-gray-600">{t(lang, 'contact.form.robot')}</label>
              {fieldErrors.robot && <p className="text-xs text-red-600 ml-3">{fieldErrors.robot}</p>}
            </div>

            <button type="submit" disabled={sending} className="px-6 py-3 lg:px-7 lg:py-3 bg-[#8BC34A] text-white rounded-lg font-semibold hover:bg-[#7bb034] transition text-base disabled:opacity-60">
              {sending ? t(lang, 'contact.form.sending') : t(lang, 'contact.form.send')}
            </button>
          </div>
        </form>
      </div>

      {showConfirmation && (
        <CorreoConfirmacion
          lang={lang}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </>
  )
}

