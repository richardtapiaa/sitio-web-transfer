import { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { cn } from '../../../lib/utils';
import { Marquee } from '../../common/Marquee';

const ComentariosCarrousel = ({ lang = 'es' }) => {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/comentarios?lang=${lang}`);
        console.log('Comentarios recibidos:', response.data);
        setComentarios(response.data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar comentarios:', err);
        setError('No se pudieron cargar los comentarios');
      } finally {
        setLoading(false);
      }
    };

    fetchComentarios();
  }, [lang]);

  // Renderizar estrellas según el rating (soporta decimales)
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); 
    const hasHalfStar = rating % 1 >= 0.5; 
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); 

    return (
      <div className="flex gap-0.5 justify-center items-center">
        {/* Estrellas llenas */}
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        
       
        {hasHalfStar && (
          <div className="relative w-5 h-5">
            {/* Estrella vacía de fondo */}
            <svg
              className="absolute inset-0 w-5 h-5 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          
            <svg
              className="absolute inset-0 w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              style={{ clipPath: 'inset(0 50% 0 0)' }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        )}

        {/* Estrellas vacías */}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-5 h-5 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        
        {/* Mostrar rating numérico */}
        <span className="ml-1 text-sm font-semibold text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // URL de Google Maps para el negocio
  const googleMapsUrl = 'https://www.google.com/maps/place/?q=place_id:ChIJjQK99phzoY8RzJG2XaVnvI0';

  // Componente de tarjeta de reseña
  const ReviewCard = ({ img, author, rating, text }) => {
    const [imageError, setImageError] = useState(false);

    const handleClick = () => {
      window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
    };
    
    // Agregar parámetros de tamaño a las URLs de Google para mejorar la carga
    const getOptimizedImageUrl = (url) => {
      if (!url) return null;
      // Si es una URL de Google, agregar parámetro de tamaño
      if (url.includes('googleusercontent.com') || url.includes('ggpht.com')) {
        // Agregar =s128 al final para obtener imagen de 128x128
        return url.includes('=s') ? url : `${url}=s128-c`;
      }
      return url;
    };

    const optimizedImg = getOptimizedImageUrl(img);

    return (
      <figure
        onClick={handleClick}
        className={cn(
          "relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-6",
          "border-gray-200 bg-white hover:bg-gray-50 transition-all duration-300",
          "shadow-md hover:shadow-xl hover:scale-105"
        )}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && handleClick()}
      >
        <div className="flex flex-col gap-4">
          {/* Header con foto y nombre */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              {!imageError && optimizedImg ? (
                <img
                  src={optimizedImg}
                  alt={author}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log('Error cargando imagen:', optimizedImg);
                    setImageError(true);
                  }}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                />
              ) : (
                <span className="text-white text-lg font-bold">
                  {getInitials(author)}
                </span>
              )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <figcaption className="text-base font-semibold text-gray-900 truncate">
                {author}
              </figcaption>
              <div className="mt-1">
                {renderStars(rating)}
              </div>
            </div>
          </div>

          {/* Texto del comentario */}
          <blockquote className="text-sm text-gray-600 leading-relaxed line-clamp-4">
            "{text}"
          </blockquote>

          {/* Badge de Google */}
          <div className="flex items-center gap-2 text-gray-400 text-xs mt-auto">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
              />
            </svg>
            <span>Google Reviews</span>
            <svg className="w-3 h-3 ml-auto" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
            </svg>
          </div>
        </div>
      </figure>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
      </div>
    );
  }

  if (comentarios.length === 0) {
    return (
      <div className="text-center text-gray-600 p-4">
        <p>No hay comentarios disponibles</p>
      </div>
    );
  }

  // Dividir comentarios en dos filas
  const firstRow = comentarios.slice(0, Math.ceil(comentarios.length / 2));
  const secondRow = comentarios.slice(Math.ceil(comentarios.length / 2));

  return (
    <div className="relative w-full py-12">
      {/* Título */}
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Lo que dicen nuestros clientes
      </h2>

      {/* Marquees con dos filas */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        {/* Primera fila - scroll normal */}
        <Marquee pauseOnHover className="[--duration:25s] mb-4">
          {firstRow.map((review, index) => (
            <ReviewCard
              key={`first-${index}`}
              img={review.photo}
              author={review.author}
              rating={review.rating}
              text={review.text}
            />
          ))}
        </Marquee>

        
        {secondRow.length > 0 && (
          <Marquee reverse pauseOnHover className="[--duration:25s]">
            {secondRow.map((review, index) => (
              <ReviewCard
                key={`second-${index}`}
                img={review.photo}
                author={review.author}
                rating={review.rating}
                text={review.text}
              />
            ))}
          </Marquee>
        )}

        {/* Gradientes de desvanecimiento en los bordes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white"></div>
      </div>
    </div>
  );
};

export default ComentariosCarrousel;
