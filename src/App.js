import React, { useState, useEffect } from 'react'
import Loading from './components/Loading'
import Tours from './components/Tours'
import "./styles.css";

const url = 'https://course-api.com/react-tours-project'

export default function App() {
  
  const [loading,setLoading] = useState(true)
  const [tours,setTours] = useState([])

  const removeTour = (id) => {
  const newTours = tours.filter((tour)=>tour.id !== id);
setTours(newTours)
  }

const fetchTours = async () => {
  setLoading(true)
  try{
  const response = await fetch(url);
  const tours = await response.json();
  setLoading(false)
  setTours(tours)
  }catch{
    setLoading(false);
    console.log(Error)
  }
}
useEffect(() => {
  fetchTours()
},[])

  if(loading){
    return(
      <main>
        <Loading />
      </main>
    )
  }
  if (tours.length === 0){
    return(
    <main className='title'>
      <h4>no more tours left</h4>
      <button className='btn' onClick={fetchTours}>refresh</button>
    </main>
  )}
  
  return (
    <main>
    <Tours tours={tours} removeTour ={removeTour}/>
    </main>
  );
}