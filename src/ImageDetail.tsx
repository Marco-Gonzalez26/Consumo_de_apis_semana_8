import { useParams, Link } from 'react-router'
import { useEffect, useState } from 'react'

export default function PhotoDetail() {
  const { id } = useParams()
  const [photo, setPhoto] = useState(null)
  const [grayscale, setGrayscale] = useState(false)
  const [blur, setBlur] = useState(0)

  useEffect(() => {
    fetch(`https://picsum.photos/id/${id}/info`)
      .then((res) => res.json())
      .then((data) => setPhoto(data))
  }, [id])

  const getImageUrl = () => {
    let url = `https://picsum.photos/id/${id}/800/500`
    const params = []

    if (grayscale) params.push('grayscale')
    if (blur > 0) params.push(`blur=${blur}`)

    if (params.length) url += '?' + params.join('&')
    return url
  }

  if (!photo) return <p className='text-center mt-10'>Cargando imagen...</p>

  return (
    <div className='min-h-screen  p-6'>
      <Link to='/' className='text-white-600 hover:underline mb-4 inline-block'>
        ← Volver
      </Link>

      <div className='max-w-2xl mx-auto bg-white/50  shadow-[0_10px_30px_-5px_hsl(247,52.9%,52.8%)] rounded-lg p-4 text-center'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4'>
          <label className='flex items-center gap-2 text-sm'>
            <input
              type='checkbox'
              checked={grayscale}
              onChange={() => setGrayscale((prev) => !prev)}
              className='accent-blue-600'
            />
            Grayscale
          </label>

          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2'>
            <label htmlFor='blurSlider' className='text-sm font-medium'>
              Blur: {blur}
            </label>
            <input
              id='blurSlider'
              type='range'
              min='0'
              max='10'
              value={blur}
              onChange={(e) => setBlur(parseInt(e.target.value))}
              className='w-full sm:w-40 accent-blue-600'
            />
          </div>
        </div>
        <img
          src={getImageUrl()}
          alt={photo.author}
          className='w-full rounded mb-4'
          style={{ viewTransitionName: `photo-${photo.id}` }}
        />
        <h2 className='text-2xl font-bold text-neutral-900'>{photo.author}</h2>
        <p className='text-sm text-gray-900 mt-2 font-medium font-monospace'>
          Url de la foto original:{' '}
          <a
            href={photo.download_url}
            className='text-blue-800 hover:underline'
            target='_blank'
            rel='noreferrer'>
            {photo.download_url}
          </a>
        </p>
      </div>
    </div>
  )
}
