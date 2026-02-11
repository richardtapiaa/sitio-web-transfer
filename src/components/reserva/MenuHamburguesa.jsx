import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';

export default function MenuHamburguesa({ items, lang, alternateUrl, currentLang, flagSrc, logoSrc }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const bgRef = useRef(null);
    const linksRef = useRef([]);
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const line3Ref = useRef(null);
    const tl = useRef(null);

    // Estado para saber si estamos en el cliente y podemos usar portal
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Animación usando GSAP Timeline
        const ctx = gsap.context(() => {
            tl.current = gsap.timeline({ paused: true, reversed: true });

            // Animación del botón hamburguesa a X
            tl.current
                .to(line2Ref.current, { scaleX: 0, duration: 0.15 }, 0)
                .to(line1Ref.current, { y: 8, rotate: 45, duration: 0.2 }, 0.1)
                .to(line3Ref.current, { y: -8, rotate: -45, duration: 0.2 }, 0.1)

                // Animación del fondo del menú
                .to(bgRef.current, {
                    x: '0%',
                    duration: 0.4,
                    ease: 'power3.out'
                }, 0);

        });

        return () => ctx.revert();
    }, [mounted]);

    const toggleMenu = () => {
        if (!tl.current) return;

        if (tl.current.reversed()) {
            tl.current.timeScale(1).play();
            setIsOpen(true);
            document.body.style.overflow = 'hidden';
        } else {
            tl.current.timeScale(2.5).reverse();
            setIsOpen(false);
            document.body.style.overflow = '';
        }
    };

    return (
        <>
            <div ref={menuRef} className="lg:hidden">
                {/* Botón Hamburguesa Original (Navbar) */}
                <button
                    onClick={toggleMenu}
                    className="relative z-[60] w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none group"
                    aria-label="Toggle menu"
                >
                    <span ref={line1Ref} className="w-7 h-0.5 bg-gray-800 rounded-full origin-center transition-colors group-hover:bg-[#8BC34A]"></span>
                    <span ref={line2Ref} className="w-7 h-0.5 bg-gray-800 rounded-full origin-center transition-colors group-hover:bg-[#8BC34A]"></span>
                    <span ref={line3Ref} className="w-7 h-0.5 bg-gray-800 rounded-full origin-center transition-colors group-hover:bg-[#8BC34A]"></span>
                </button>
            </div>

            {/* Overlay del Menú - Usando Portal */}
            {mounted && createPortal(
                <div
                    ref={bgRef}
                    className="fixed inset-0 bg-white z-[9999] flex flex-col justify-center items-center translate-x-full overflow-hidden"
                >
                    {/* Botón de Cerrar (Visible DENTRO del Portal) */}
                    <button
                        onClick={toggleMenu}
                        className="absolute top-6 right-6 w-12 h-12 flex justify-center items-center z-[10000] focus:outline-none bg-gray-50 rounded-full hover:bg-gray-100 transition-all shadow-sm active:scale-95"
                        aria-label="Close menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>

                    <nav className="flex flex-col gap-6 text-center pt-4 relative z-10">

                        {/* Logo en la parte superior del menú móvil */}
                        <div ref={el => linksRef.current[0] = el} className="mb-6 flex justify-center">
                            <img src={logoSrc} alt="Eliud Transport" className="h-32 w-auto object-contain" />
                        </div>

                        {items.map((item, index) => (
                            <a
                                key={index}
                                ref={el => linksRef.current[index + 1] = el}
                                href={item.href}
                                onClick={toggleMenu}
                                className="text-3xl font-bold text-gray-800 hover:text-[#8BC34A] transition-colors font-sans"
                            >
                                {item.label}
                            </a>
                        ))}

                        {/* Selector de idioma móvil */}
                        <div ref={el => linksRef.current[items.length + 1] = el} className="mt-8 pt-8 border-t border-gray-100 w-full flex justify-center">
                            <a
                                href={alternateUrl}
                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-50 hover:bg-gray-100 transition lang-switch"
                            >
                                <img
                                    src={flagSrc}
                                    alt="Switch Language"
                                    className="w-6 h-4 rounded shadow-sm object-cover"
                                />
                                <span className="text-lg font-medium text-gray-700">
                                    {currentLang === 'es' ? 'English' : 'Español'}
                                </span>
                            </a>
                        </div>
                    </nav>

                    {/* Background Decorations (MUCHO MAS VERDE, sin barra inferior) */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#8BC34A]/80 rounded-bl-full pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#8BC34A]/80 rounded-tr-full pointer-events-none"></div>
                </div>,
                document.body
            )}
        </>
    );
}
