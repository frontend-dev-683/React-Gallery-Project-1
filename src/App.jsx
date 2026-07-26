import React, { useEffect, useState } from 'react'
import axios from 'axios';

const App = () => {
  const [userData, setUserData] = useState([])
  const [index, setIndex] = useState(1)
  const [loading, setLoading] = useState(true)

  const getData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`)
      setUserData(response.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [index])

  return (
    <div className='bg-[#0a0a0c] text-white min-h-screen w-full px-4 sm:px-8 md:px-12 py-10 flex flex-col justify-between selection:bg-amber-500 selection:text-black'>
      
      {/* Header Section */}
      <div className='max-w-7xl mx-auto w-full mb-10 text-center flex flex-col items-center gap-2'>
        <span className='text-xs font-bold tracking-widest text-amber-500 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20'>
          Unsplash Showcase
        </span>
        <h1 className='text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent'>
          Visual Gallery
        </h1>
        <p className='text-zinc-400 text-sm sm:text-base max-w-md'>
          Explore high-resolution photography curated by creators worldwide.
        </p>
      </div>

      {/* Cards Grid Container */}
      <div className='max-w-7xl mx-auto w-full flex-1'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
          
          {/* Skeleton Loading State */}
          {loading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <div 
                key={i} 
                className='bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-4 flex flex-col items-center animate-pulse'
              >
                <div className='w-full aspect-square rounded-xl bg-zinc-800/60 mb-4' />
                <div className='h-4 w-3/4 bg-zinc-800/60 rounded-md' />
              </div>
            ))
          ) : (
            /* Actual Image Cards */
            userData.map((elem) => (
              <a 
                key={elem.id} 
                href={elem.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className='group relative bg-zinc-900/40 border border-zinc-800/80 hover:border-amber-500/50 rounded-2xl p-4 flex flex-col items-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.2)] backdrop-blur-sm'
              >
                {/* Image Wrapper */}
                <div className='w-full aspect-square rounded-xl overflow-hidden bg-zinc-800 relative mb-4'>
                  <img 
                    className='h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out' 
                    src={elem.download_url} 
                    alt={elem.author} 
                    loading="lazy"
                  />
                  {/* Subtle overlay on hover */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                </div>

                {/* Author Info */}
                <div className='w-full text-center'>
                  <p className='text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-0.5'>Author</p>
                  <h2 className='font-semibold text-base text-zinc-200 group-hover:text-amber-400 transition-colors truncate px-1'>
                    {elem.author}
                  </h2>
                </div>
              </a>
            ))
          )}

        </div>
      </div>

      {/* Glassmorphism Pagination Controls */}
      <div className='w-full max-w-7xl mx-auto flex items-center justify-center gap-4 sm:gap-6 pt-12 pb-4'>
        <button 
          className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
            index > 1 && !loading
              ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer' 
              : 'bg-zinc-900 border border-zinc-800 text-zinc-600 cursor-not-allowed'
          }`} 
          onClick={() => {
            if (index > 1 && !loading) setIndex(index - 1)
          }}
          disabled={index <= 1 || loading}
        >
          &larr; Prev
        </button>

        <div className='font-medium text-zinc-300 text-sm bg-zinc-900/80 border border-zinc-800 px-5 py-2.5 rounded-xl backdrop-blur-md shadow-inner flex items-center gap-2'>
          <span className='text-zinc-500'>Page</span>
          <span className='text-amber-400 font-bold text-base'>{index}</span>
        </div>

        <button 
          className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
            !loading 
              ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer'
              : 'bg-zinc-900 border border-zinc-800 text-zinc-600 cursor-not-allowed'
          }`}
          onClick={() => {
            if (!loading) setIndex(index + 1)
          }}
          disabled={loading}
        >
          Next &rarr;
        </button>
      </div>

    </div>
  )
}

export default App