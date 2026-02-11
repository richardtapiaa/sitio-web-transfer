import { t } from '../../../../i18n/utils';

interface PasoContactoProps {
  datosFormulario: {
    nombre: string
    email: string
    telefono: string
  }
  manejarCambio: (e: React.ChangeEvent<HTMLInputElement>) => void
  lang: string
}

export default function PasoContacto({ datosFormulario, manejarCambio, lang }: PasoContactoProps) {
  return (
    <div className="space-y-10">
      {/* === BLOQUE: DATOS DE CONTACTO === */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
          {t(lang, 'form.contact.title')}
        </h3>

        <div className="space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t(lang, 'form.label.fullname')} <span className="text-red-500">*</span>
            </label>
            <input
              name="nombre"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#8BC34A] focus:ring-2 focus:ring-[#8BC34A]/20 transition-all"
              value={datosFormulario.nombre}
              onChange={manejarCambio}
              required
            />
          </div>

          {/* Email + Teléfono */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t(lang, 'form.label.email')} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#8BC34A] focus:ring-2 focus:ring-[#8BC34A]/20 transition-all"
                value={datosFormulario.email}
                onChange={manejarCambio}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t(lang, 'form.label.phone')} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="telefono"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#8BC34A] focus:ring-2 focus:ring-[#8BC34A]/20 transition-all"
                value={datosFormulario.telefono}
                onChange={manejarCambio}
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
