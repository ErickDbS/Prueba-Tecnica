import axios from "axios"
import { useEffect, useState } from "react"

export default function Card({ char, onOpen}) {

    const [planetName, setPlanetName] = useState(null)

    useEffect(() => {
        axios.get(char.homeworld)
        .then(res => setPlanetName(res.data.name))
        .catch(error => console.error(error))
    }, [])

  return (
    <div className="bg-gray-900 text-gray-100 rounded-xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-200">
      <h2 className="text-center text-xl font-bold text-blue-400 mb-4">{char.name}</h2>
      <ul className="space-y-2">
        <li><span className="text-yellow-400 font-semibold">Altura:</span> {char.height} cm</li>
        <li><span className="text-yellow-400 font-semibold">Peso:</span> {char.mass} kg</li>
        <li><span className="text-yellow-400 font-semibold">Cabello:</span> {char.hair_color}</li>
        <li><span className="text-yellow-400 font-semibold">Piel:</span> {char.skin_color}</li>
        <li><span className="text-yellow-400 font-semibold">Ojos:</span> {char.eye_color}</li>
        <li><span className="text-yellow-400 font-semibold">Año nacimiento:</span> {char.birth_year}</li>
        <li><span className="text-yellow-400 font-semibold">Género:</span> {char.gender}</li>
        <li><span className="text-yellow-400 font-semibold">Lugar nacimiento:</span> {planetName}</li>
        <button className="text-blue-500" onClick={onOpen}>Ver mas</button>
      </ul>
    </div>



  )
}
