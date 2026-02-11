import { t } from '../../../../i18n/utils';

interface PasoViajeProps {
  datosFormulario: {
    origen: string
    destino: string
    fecha: string
    hora: string
    personas: string
  }
  manejarCambio: (e: React.ChangeEvent<HTMLInputElement>) => void
  setDatosFormulario: (datos: any) => void
  lang: string
}

export default function PasoViaje({ datosFormulario, manejarCambio, setDatosFormulario, lang }: PasoViajeProps) {
  return (
    <div className="space-y-10">
      {/* === BLOQUE: RUTA === */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
          {t(lang, 'form.trip.title')}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t(lang, 'form.label.pickup')} <span className="text-red-500">*</span>
            </label>
            <input
              name="origen"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#8BC34A] focus:ring-2 focus:ring-[#8BC34A]/20 transition-all"
              value={datosFormulario.origen}
              onChange={manejarCambio}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t(lang, 'form.label.destination')} <span className="text-red-500">*</span>
            </label>
            <input
              name="destino"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#8BC34A] focus:ring-2 focus:ring-[#8BC34A]/20 transition-all"
              value={datosFormulario.destino}
              onChange={manejarCambio}
              required
            />
          </div>
        </div>
      </div>


      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
          {t(lang, 'form.datetime.title')}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t(lang, 'form.label.date')} <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="fecha"
              value={datosFormulario.fecha}
              onChange={manejarCambio}
              min={new Date().toLocaleDateString('en-CA', { timeZone: 'America/Costa_Rica' })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#8BC34A] focus:ring-2 focus:ring-[#8BC34A]/20 transition-all text-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t(lang, 'form.label.time')} <span className="text-red-500">*</span>
            </label>
          
            {(() => {
              const todayCR = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Costa_Rica' });
              const timeCR = new Date().toLocaleTimeString('en-GB', { timeZone: 'America/Costa_Rica', hour: '2-digit', minute: '2-digit' });
              const isToday = datosFormulario.fecha === todayCR;
              

              return (
                <input
                  type="time"
                  name="hora"
                  value={datosFormulario.hora}
                  onChange={manejarCambio}
                  min={isToday ? timeCR : undefined}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#8BC34A] focus:ring-2 focus:ring-[#8BC34A]/20 transition-all text-gray-700"
                  required
                />
              );
            })()}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t(lang, 'form.label.passengers')} <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              name="personas"
              placeholder="Ej: 2"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#8BC34A] focus:ring-2 focus:ring-[#8BC34A]/20 transition-all"
              value={datosFormulario.personas}
              onChange={manejarCambio}
              required
            />
          </div>
        </div>
      </div>
    </div>
  )
}
