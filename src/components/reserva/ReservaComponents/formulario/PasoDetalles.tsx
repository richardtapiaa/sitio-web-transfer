
import { t } from '../../../../i18n/utils';

interface PasoDetallesProps {
  datosFormulario: {
    origen: string
    destino: string
    fecha: string
    hora: string
    personas: string
    nombre: string
    email: string
    telefono: string
    mensaje: string
  }
  manejarCambio: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  atras: () => void
  enviarReserva: () => void
  enviando: boolean
  lang: string
}

export default function PasoDetalles({
  datosFormulario,
  manejarCambio,
  atras,
  enviarReserva,
  enviando,
  lang
}: PasoDetallesProps) {
  return (
    <div className="space-y-8">

      {/* Textarea para mensaje */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          {t(lang, 'form.label.message')}
        </label>
        <textarea
          name="mensaje"
          rows={6}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#8BC34A] focus:ring-2 focus:ring-[#8BC34A]/20 transition-all resize-none"
          value={datosFormulario.mensaje}
          onChange={manejarCambio}
        />
        <p className="text-xs text-gray-500">
          {t(lang, 'form.details.messageHint')}
        </p>
      </div>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <button
          onClick={atras}
          disabled={enviando}
          className="px-6 py-3 rounded-xl font-semibold text-gray-500 hover:bg-gray-100 transition disabled:opacity-50"
        >
          {t(lang, 'form.btn.back')}
        </button>

        <button
          onClick={enviarReserva}
          disabled={enviando}
          className="flex-1 px-6 py-3 rounded-xl font-semibold text-white bg-[#8BC34A] hover:bg-[#8BC34A] transition disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg shadow-green-100"
        >
          {enviando ? t(lang, 'form.status.sending') : t(lang, 'form.btn.confirm')}
        </button>
      </div>
    </div>
  )
}
