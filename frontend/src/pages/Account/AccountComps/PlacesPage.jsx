import axios from 'axios'
import React, { useEffect, useState } from 'react'

const PlacesPage = () => {
    const [places, setPlaces] = useState([])

    useEffect(()=>{
      axios.get("/places").then(({data})=> setPlaces(data))
    }, [])

  return (
    <div className='w-full text-start mt-4'>
        {places?.map((place)=>(
            <div className='bg-gray-200 p-4 rounded-2xl flex gap-4 mt-4 w-full'>
                <div className='min-w-32 max-w-32 h-24 bg-gray-300 grow'>
                    {place?.photos?.length > 0 && (
                        <img src={ "http://localhost:3000/uploads/"  + place.photos[0]} alt="image" className='object-cover grow '/>
                    )}
                </div>
                <div className='shrink grow-0'> 
                <h2 className='text-xl font-semibold'>{place.title}</h2>
                <p className='text-sm mt-2'>{place.description.slice(0,100)} <b>...more</b></p>
                </div>
                
            </div>
        ))}
    </div>
  )
}

export default PlacesPage