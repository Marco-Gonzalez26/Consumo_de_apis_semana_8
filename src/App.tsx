import { useEffect, useState } from 'react'
import { Link } from 'react-router'

export default function App() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [grayscale, setGrayscale] = useState(false)
  const [blur, setBlur] = useState(false)

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?limit=100')
      .then((res) => res.json())
      .then((data) => {
        setImages(data)
        setLoading(false)
      })
  }, [])

  const getImageUrl = (id) => {
    let url = `https://picsum.photos/id/${id}/500/300`
    const params = []
    if (grayscale) params.push('grayscale')
    if (blur) params.push('blur=2')
    if (params.length) url += '?' + params.join('&')
    return url
  }

  if (loading)
    return (
      <p className='text-center mt-10 text-indigo-500 text-5xl font-bold'>
        Cargando imágenes...
      </p>
    )

  return (
    <div className='min-h-screen bg-gray-900 p-6'>
      <h1 className='text-3xl font-bold text-center mb-8'>Galería de Fotos</h1>
      <p className='text-center text-sm text-gray-400 mb-4'>
        Esta es una aplicación de ejemplo para consumir una API de
        https://picsum.photos/
      </p>
      <p className='text-center text-sm text-gray-400 mb-4'>
        Esta API tiene una API de ejemplo que genera imágenes aleatorias
      </p>
      <p className='text-center text-sm text-gray-400 mb-4'>
        Hecho con ❤️ por Marco, Emily y Doris
      </p>
      <div className='flex justify-center gap-6 mb-8'>
        <label className='flex items-center gap-2 text-sm'>
          <input
            type='checkbox'
            checked={grayscale}
            onChange={() => setGrayscale((p) => !p)}
            className='accent-blue-600'
          />
          Grayscale
        </label>
        <label className='flex items-center gap-2 text-sm'>
          <input
            type='checkbox'
            checked={blur}
            onChange={() => setBlur((p) => !p)}
            className='accent-blue-600'
          />
          Blur
        </label>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
        {images.map((img) => (
          <Link
            key={img.id}
            to={`/image/${img.id}`}
            className='group transition-all duration-300 rounded shadow-[0_0_0_0_hsl(220,14%,94%)] hover:shadow-[0_10px_30px_-5px_hsl(247,52.9%,52.8%)] hover:scale-[1.02] overflow-hidden'
            style={{ viewTransitionName: `photo-${img.id}` }}>
            <img
              src={getImageUrl(img.id)}
              alt={`Foto de ${img.author}`}
              className='w-full h-auto object-cover'
            />
            <div className='p-4 bg-black/50 text-white text-center'>
              <h2 className='font-semibold text-lg'>{img.author}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
