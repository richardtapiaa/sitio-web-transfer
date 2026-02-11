interface StepperProps {
  pasos: string[]
  subtitulos: string[]
  pasoActual: number
}

import { motion } from 'framer-motion'

export default function Stepper({ pasos, subtitulos, pasoActual }: StepperProps) {
  return (
    <>
      {/* Stepper Horizontal (Móvil) - Solo visible en móvil */}
      <div className="flex md:hidden justify-between items-start mb-8">
        {pasos.map((paso, index) => (
          <div key={index} className="flex flex-col items-center flex-1 relative">
            {/* Círculo */}
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-md transition-all z-10 ${index <= pasoActual ? 'text-white' : 'text-gray-400'}`}
              animate={{ scale: index === pasoActual ? 1.08 : 1, backgroundColor: index <= pasoActual ? '#8BC34A' : '#FFFFFF' }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            >
              {index + 1}
            </motion.div>

            {/* Línea horizontal conectora */}
            {index < pasos.length - 1 && (
              <div className="absolute top-5 left-[50%] w-full h-0.5 flex items-center justify-center" style={{ zIndex: 0 }}>
                <div className={`h-0.5 flex-1 transition-colors ${index < pasoActual ? 'bg-[#8BC34A]' : 'bg-gray-200'}`} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${index < pasoActual ? 'bg-[#8BC34A]' : 'bg-gray-200'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M16 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M4 17h-2v-11a1 1 0 0 1 1 -1h14a5 7 0 0 1 5 7v5h-2m-4 0h-8" />
                    <path d="M16 5l1.5 7l4.5 0" />
                    <path d="M2 10l15 0" />
                    <path d="M7 5l0 5" />
                    <path d="M12 5l0 5" />
                  </svg>
                </div>
                <div className={`h-0.5 flex-1 transition-colors ${index < pasoActual ? 'bg-[#8BC34A]' : 'bg-gray-200'}`} />
              </div>
            )}

            {/* Texto */}
            <motion.div className="mt-2 text-center" animate={{ opacity: index <= pasoActual ? 1 : 0.6, y: index <= pasoActual ? 0 : 4 }} transition={{ duration: 0.25 }}>
              <p className={`font-semibold text-xs ${index <= pasoActual ? 'text-[#8BC34A]' : 'text-gray-400'}`}>{paso}</p>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Stepper Vertical (Desktop) - centered vertically */}
      <div className="hidden md:flex md:flex-col md:items-center md:justify-center md:h-full relative">
        {pasos.map((paso, index) => (
          <div key={index} className="flex gap-4 mb-12">
            {/* Círculo + línea */}
            <div className="flex flex-col items-center">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-md transition-all ${index <= pasoActual ? 'text-white' : 'text-gray-400'}`}
                animate={{ scale: index === pasoActual ? 1.06 : 1, backgroundColor: index <= pasoActual ? '#8BC34A' : '#FFFFFF' }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              >
                {index + 1}
              </motion.div>

              {index < pasos.length - 1 && (
                <div className="relative w-0.5 flex-1 mt-2 flex flex-col items-center justify-center" style={{ minHeight: '50px' }}>
                  <div className={`w-0.5 flex-1 transition-colors ${index < pasoActual ? 'bg-[#8BC34A]' : 'bg-gray-200'}`} />
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${index < pasoActual ? 'bg-[#8BC34A]' : 'bg-gray-200'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M16 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M4 17h-2v-11a1 1 0 0 1 1 -1h14a5 7 0 0 1 5 7v5h-2m-4 0h-8" />
                      <path d="M16 5l1.5 7l4.5 0" />
                      <path d="M2 10l15 0" />
                      <path d="M7 5l0 5" />
                      <path d="M12 5l0 5" />
                    </svg>
                  </div>
                  <div className={`w-0.5 flex-1 transition-colors ${index < pasoActual ? 'bg-[#8BC34A]' : 'bg-gray-200'}`} />
                </div>
              )}
            </div>

            {/* Texto */}
            <motion.div animate={{ opacity: index <= pasoActual ? 1 : 0.65, y: index <= pasoActual ? 0 : 4 }} transition={{ duration: 0.25 }}>
              <p className={`font-semibold text-base ${index <= pasoActual ? 'text-[#8BC34A]' : 'text-gray-400'}`}>{paso}</p>
              <p className={`text-sm ${index <= pasoActual ? 'text-gray-600' : 'text-gray-400'}`}>
                {subtitulos[index]}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </>
  )
}
