import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { isLoading } from '../../stores/loaderStore';
import logoEliud from '@/assets/logo/logo-eliud.png';

export default function Loader() {
    const loading = useStore(isLoading);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !loading) return null;

    return createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity duration-300">
            <div className="flex flex-col items-center">
                <img
                    src={logoEliud.src}
                    alt="Cargando..."
                    className="w-48 h-auto animate-bounce duration-1000"
                />
                <div className="mt-4 flex gap-1">
                    <div className="w-2 h-2 bg-[#8BC34A] rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-[#8BC34A] rounded-full animate-bounce delay-150"></div>
                    <div className="w-2 h-2 bg-[#8BC34A] rounded-full animate-bounce delay-300"></div>
                </div>
            </div>
        </div>,
        document.body
    );
}
