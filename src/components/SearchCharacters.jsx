import { useState } from "react"

export default function SearchCharacters({ onSearch }) {
  const [searchCharacter, setSearchCharacter] = useState("")

  const handleChange = (e) => {
    const value = e.target.value
    setSearchCharacter(value)
    onSearch(value)
  }

  return (
    <input
      type="text"
      placeholder="Buscar personaje..."
      value={searchCharacter}
      onChange={handleChange}
      className="border p-2 mb-4 rounded w-full"
    />
  )
}
