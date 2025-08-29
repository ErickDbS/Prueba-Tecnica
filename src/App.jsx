import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Card from './components/card'
import SearchCharacters from './components/SearchCharacters'

function App() {
  const apiUrl = import.meta.env.VITE_API_URL 
  
  const [character, setCharacter] = useState([])
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [films, setFilms] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [starships, setStarships] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 12


useEffect(() => {
  const fetchAllCharacters = async () => {
    const characterIds = Array.from({ length: 83 }, (_, i) => i + 1).filter(id => id !== 17)

    const requests = characterIds.map(id =>
      axios.get(`${apiUrl}/people/${id}`)
        .then(res => res.data)
        .catch(error => {
          console.error(`Error al traer personaje con id ${id}:`, error)
          return null
        })
    )

    const results = await Promise.all(requests)
    const validResults = results.filter(r => r !== null)

    setCharacter(validResults)
    setSearchResult(validResults)
  }

  fetchAllCharacters()
}, [])


  const handleSearch = async (name) => {
    if(name.trim() === "") {
      setSearchResult([])
      return
    }

    const characterIds = Array.from({ length: 83 }, (_, i) => i + 1).filter(id => id !== 17)
    const requests = characterIds.map(id =>
      axios.get(`${apiUrl}/people/${id}`)
        .then(res => res.data)
        .catch(() => null)
    )

    const results = await Promise.all(requests)
    const validResults = results.filter(r => r !== null && r.name.toLowerCase().includes(name.toLowerCase()))
    setSearchResult(validResults)
  }

  const displayCharacters = searchResult.length > 0 ? searchResult : character

  const indexOfLast = currentPage * resultsPerPage
  const indexOfFirst = indexOfLast - resultsPerPage
  const currentCharacters = displayCharacters.slice(indexOfFirst, indexOfLast)

  const totalPages = Math.ceil(displayCharacters.length / resultsPerPage)

  


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

return (
  <>
    <div className="min-h-screen min-w-screen flex flex-col justify-center items-center bg-gray-950">
      <h1 className="text-3xl text-center text-blue-400 font-bold mb-8 flex justify-center">
        Enciclopedia de Star Wars
      </h1>
      <div className="w-full max-w-6xl flex flex-col items-center">
        <SearchCharacters onSearch={handleSearch} />

        <div className="flex justify-center w-full mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentCharacters.map((char, index) => (
              <Card key={index} char={char} onOpen={() => setSelectedCharacter(char)} />
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-blue-400 text-white'
                  : 'bg-gray-700 text-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>


      {selectedCharacter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-center">
              {selectedCharacter.name}
            </h2>
            <p>Películas:</p>
            <ul className="list-disc list-inside mb-2">
              {films.map((film, index) => (
                <li key={index}>{film}</li>
              ))}
            </ul>
            <p>Vehículos:</p>
            <ul className="list-disc list-inside mb-2">
              {vehicles.map((vehicle, index) => (
                <li key={index}>{vehicle}</li>
              ))}
            </ul>
            <p>Naves:</p>
            <ul className="list-disc list-inside mb-2">
              {starships.map((starship, index) => (
                <li key={index}>{starship}</li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedCharacter(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  </>
)


  
}

export default App
