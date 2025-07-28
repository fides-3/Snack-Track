'use client'
import {Search} from 'lucide-react'
import BottomNav from '@/components/BottomNav'
import {useState} from 'react'



export default function Recipes(){
const[error,setError]=useState('')
const[loading,setLoading]=useState(false)
const[query,setQuery]=useState('')
const[results,setResults]=useState<any[]>([])


const handleSearch=async()=>{
  if(!query.trim()){
    return
  }
  setLoading(true)
  setError('')

  try{
    const res=await fetch(`/api/recipes?query=${query}`)
    const data=await res.json()

    if(data.error){
      setError(data.error)
      setResults([])
    }
    else{
      setResults(data.results || [])
    }

  }catch(err){
    console.error(err)
    setError('Something went wrong.Try again')
  }finally{
    setLoading(false)
  }

}
const handleKeyDown=(e: React.KeyboardEvent<HTMLInputElement>)=>{
  if(e.key=='Enter'){
    handleSearch()
  }
}



    return(

      <div className="bg-[url('/backgroundimage.jpg')] bg-cover bg-center h-screen ">
       <div className="relative w-full pt-20  max-w-md mt-0 flex justify-center items-center   mx-auto">
        <div className='relative w-full '>
      <Search className="absolute left-3  top-1/2 transform -translate-y-1/2 w-5 h-5" />
      <input
        type="text"
        value={query}
        placeholder="Search for recipes"
        className="w-full pl-10 py-2 border border-blue-300 shadow-2xl  rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
        onChange={(e)=>setQuery(e.target.value)}
      />
      </div>
      </div>
      <div className='flex items-center pt-4 justify-center'>
      <button onClick={handleSearch} className='text-white hover:bg-blue-500  bg-blue-400 text-sm w-34 font-semibold rounded-lg px-6 py-2'>
        SEARCH
      </button>
      </div>

      {error && <p className='text-red-400 mt -4font-semibold text-sm'>{error}</p>}

      {loading && <div className='text-white mt-4 animate-pulse '>Loading recipes...</div>}

      {!loading && results.length>0 &&(
        <div className='mt-6 space-y-4 '>
          {/* {results.map((recipe)=>(
            <div
            key={recipe.id}
            className='bg-white bg-opacity-80 rounded-xl p-4 shadow-md'
            >
              <h2 className='font-semibold text-black'>{recipe.title}</h2>
              {recipe.image && (
                <img src={recipe.image} alt={recipe.title} className='mt-2 w-full rounded'/>
              )}
          
      
        </div>
          ))} */}

          {results.map((recipe) => (
  <div key={recipe.id} className='bg-blue-100 bg-opacity-80 rounded-xl  p-4 shadow-2xl'>
    <h2 className='font-semibold text-blue-800'>{recipe.title}</h2>
    {recipe.image && (
      <img src={recipe.image} alt={recipe.title} className='mt-2 w-90  h-90 rounded' />
    )}
    <div className='mt-2 text-blue-800'>
      <h3 className='font-semibold'>Ingredients:</h3>
      <ul className='list-disc list-inside'>
        {recipe.ingredients?.map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3 className='font-semibold mt-2'>Instructions:</h3>
      <p dangerouslySetInnerHTML={{ __html: recipe.instructions || 'No instructions available.' }} />
    </div>
  </div>
))}


        </div>
      )}
          
        
          {!loading && query && results.length === 0 && !error && (
          <p className="mt-4 text-white text-center">No recipes found for "{query}".</p>
        )}
      <BottomNav/>
      
</div>
     
      )} 
    
         
