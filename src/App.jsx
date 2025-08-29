import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Card from './components/card'

function App() {
  const apiUrl = import.meta.env.VITE_API_URL 
  
  const [character, setCharacter] = useState([])
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [films, setFilms] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [starships, setStarships] = useState([])

  useEffect(() => {
    const fetchRandomCharacters = async () => {
     const numberCharacters = 83
      const randomCharacters = new Set()

      while(randomCharacters.size < 10){
        const randomNumber = Math.floor(Math.random() * numberCharacters) + 1
        randomCharacters.add(randomNumber)
      }

      const requests = Array.from(randomCharacters).map(id =>
        axios.get(`${apiUrl}/people/${id}`)
        .then(res => res.data)
        .catch(error => console.error(error))
      )

      const results = await Promise.all(requests)
      setCharacter(results.filter(r => r !== null))
    }

    fetchRandomCharacters()

  }, [])

  useEffect(() => {
    if (selectedCharacter) {
      const filmsRequests = async () => {
        const requestsFilms = selectedCharacter.films.map(url =>
        axios.get(url)
        .then(res => res.data.title)
        .catch(error => console.error(error))
      )
      const results = await Promise.all(requestsFilms)
      setFilms(results)
      }
      filmsRequests() 
    } else {
      setFilms([])
    }

    if (selectedCharacter) {
      const vehiclesReuqests = async () => {
        const requestsVehicles = selectedCharacter.vehicles.map(url =>
          axios.get(url)
          .then(res => res.data.name)
          .catch(error => console.error(error))
        )
        const vehiclesResults = await Promise.all(requestsVehicles)
        setVehicles(vehiclesResults)
      }
      vehiclesReuqests()
    } else {
      setVehicles([])
    }

    if (selectedCharacter) {
      const startshipsRquests = async () => {
        const requestsStarships = selectedCharacter.starships.map(url =>
          axios.get(url)
          .then(res => res.data.name)
          .catch(error => console.error(error))
        )
        const startshipsResults = await Promise.all(requestsStarships)
        setStarships(startshipsResults)
      }
      startshipsRquests()
    } else {
      setStarships([])
    }

  }, [selectedCharacter])

  return(
  <>
    <div className="min-h-screen p-6">
      <h1 className="text-3xl text-center text-blue-400 font-bold mb-8">Personajes de Star Wars</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {character.map((char, index) => (
          <Card key={index} char={char} onOpen={() => setSelectedCharacter(char)}/>
        ))}
      </div>
    </div>

    {selectedCharacter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{selectedCharacter.name}</h2>
            <p>Peliculas:</p>
            {films.map((film, index) => (
              <li key={index}>{film}</li>
            ))}
            <p>Vehiculos</p>
            {vehicles.map((vehicle, index) => (
              <li key={index}>{vehicle}</li>
            ))}
            <p>naves:</p>
            {starships.map((starship, index) => (
              <li key={index}>{starship}</li>
            ))}
            <button
              onClick={() => setSelectedCharacter(null)}
              className="mt-4 bg-red-500 text-blue-500 px-4 py-2 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
  </>
)
  
}

export default App
