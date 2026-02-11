import api from '../../../../api/axios'; // Adjust import path as needed
import { useState, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import Stepper from './Stepper'
import PasoContacto from './PasoContacto'
import PasoViaje from './PasoViaje'
import PasoDetalles from './PasoDetalles'
import ReservaConfirmacion from './ReservaConfirmacion'

import logoEliud from '@/assets/logo/logo-eliud.png';
import { t } from '../../../../i18n/utils';

interface FormularioStepperProps {
  lang: string;
}

export default function FormularioStepper({ lang }: FormularioStepperProps) {
  const [pasoActual, setPasoActual] = useState(0)
  const formRef = useRef<HTMLDivElement>(null)
  const [enviando, setEnviando] = useState(false)
  const [exito, setExito] = useState(false)

  const [datosFormulario, setDatosFormulario] = useState({
    origen: '',
    destino: '',
    fecha: '',
    hora: '',
    personas: '1',
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  })

  const pasos = [
    t(lang, 'reserva.paso1.badge'),
    t(lang, 'reserva.paso2.badge'),
    t(lang, 'reserva.paso3.badge')
  ]

  const subtitulos = [
    t(lang, 'reserva.paso1.stepperTitle'),
    t(lang, 'reserva.paso2.stepperTitle'),
    t(lang, 'reserva.paso3.stepperTitle')
  ]

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDatosFormulario({
      ...datosFormulario,
      [e.target.name]: e.target.value,
    })
  }

  const validarPaso = (paso: number): boolean => {
    switch (paso) {
      case 0: // Paso 1: Contacto
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datosFormulario.email)
        return !!(
          datosFormulario.nombre.trim() &&
          datosFormulario.email.trim() &&
          emailValido &&
          datosFormulario.telefono.trim()
        )
      case 1: // Paso 2: Viaje
        return !!(
          datosFormulario.origen.trim() &&
          datosFormulario.destino.trim() &&
          datosFormulario.fecha &&
          datosFormulario.hora &&
          datosFormulario.personas &&
          parseInt(datosFormulario.personas) > 0
        )
      case 2: // Paso 3: Detalles (opcionales)
        return true
      default:
        return false
    }
  }

  const siguiente = () => {
    if (!validarPaso(pasoActual)) {
      toast.error(t(lang, 'form.error.required'))
      return
    }
    if (pasoActual < pasos.length - 1) setPasoActual(pasoActual + 1)
  }

  const atras = () => {
    if (pasoActual > 0) setPasoActual(pasoActual - 1)
  }

  const enviarReserva = async () => {


    try {
      // Combinar fecha y hora en formato ISO
      const fechaHoraServicio = `${datosFormulario.fecha}T${datosFormulario.hora}:00`

      const payload = {
        nombre: datosFormulario.nombre,
        telefono: datosFormulario.telefono,
        correoElectronico: datosFormulario.email,
        fechaHoraServicio: fechaHoraServicio,
        lugarRecogida: datosFormulario.origen,
        destino: datosFormulario.destino,
        cantidadPersonas: parseInt(datosFormulario.personas),
        mensaje: datosFormulario.mensaje || undefined, // Solo enviar si hay mensaje
      }


      await api.post('/reservas', payload);

      setExito(true)
    } catch (err) {
      toast.error(t(lang, 'form.error.sending'))
      console.error(err)
    } finally {

      setEnviando(false);
    }
  }

  const handleReset = () => {
    setDatosFormulario({
      origen: '',
      destino: '',
      fecha: '',
      hora: '',
      personas: '1',
      nombre: '',
      email: '',
      telefono: '',
      mensaje: '',
    })
    setPasoActual(0)
    setExito(false)
  }


  useEffect(() => {
    if (formRef.current) {
      const yOffset = -100;
      const element = formRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [pasoActual]);




  return (
    <div className="max-w-6xl mx-auto" ref={formRef}>
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 md:gap-12">
        {/* Stepper */}
        <Stepper pasos={pasos} subtitulos={subtitulos} pasoActual={pasoActual} />


        <div className="w-full bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl font-sans border border-[#8BC34A]/25">
          {exito ? (
            <ReservaConfirmacion lang={lang} onClose={handleReset} />
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <img src={logoEliud.src} alt="Eliud Logo" className="h-30 w-auto" width={160} height={48} decoding="async" />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-center">
                {pasos[pasoActual]}
              </h2>
              <p className="text-gray-500 mb-8 text-center">
                {pasoActual === 0 && t(lang, 'reserva.paso1.desc')}
                {pasoActual === 1 && t(lang, 'reserva.paso2.desc')}
                {pasoActual === 2 && t(lang, 'reserva.paso3.desc')}
              </p>


              {pasoActual === 0 && (
                <PasoContacto
                  datosFormulario={datosFormulario}
                  manejarCambio={manejarCambio}
                  lang={lang}
                />
              )}

              {pasoActual === 1 && (
                <PasoViaje
                  datosFormulario={datosFormulario}
                  manejarCambio={manejarCambio}
                  setDatosFormulario={setDatosFormulario}
                  lang={lang}
                />
              )}

              {pasoActual === 2 && (
                <PasoDetalles
                  datosFormulario={datosFormulario}
                  manejarCambio={manejarCambio}
                  atras={atras}
                  enviarReserva={enviarReserva}
                  enviando={enviando}
                  lang={lang}
                />
              )}

              {/* BOTONES PARA PASO 1 Y 2 */}
              {pasoActual < 2 && (
                <div className="flex gap-3 mt-10 pt-6">
                  <button
                    onClick={siguiente}
                    className="flex-1 px-6 py-3 bg-[#8BC34A] text-white rounded-lg font-semibold hover:bg-[#8BC34A]"
                  >
                    {t(lang, 'form.btn.continue')}
                  </button>

                  {pasoActual > 0 && (
                    <button
                      onClick={atras}
                      className="px-6 py-3 bg-[#8BC34A] text-white rounded-lg font-semibold hover:bg-[#8BC34A]"
                      disabled={enviando}
                    >
                      {t(lang, 'form.btn.back')}
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
