/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useConfig } from '../contexts/Config.Context'

export const useFetchFiltradosPokemones = () => {
	const [pokemones, setPokemones] = useState([])
	const [totalPokemones, setTotalPokemones] = useState(0)
	const [loading, setLoading] = useState(true)

	const { filtroTipo, searchTerm, habilidad, rangoAtaque, rangoDefensa, rangoVelocidad } = useConfig()

	const controladorService = async () => {
		setLoading(true)

		let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000`

		if (filtroTipo && filtroTipo !== 'Todos') {
			url = `https://pokeapi.co/api/v2/type/${filtroTipo}`
		}

		try {
			const response = await fetch(url)
			const pokeData = await response.json()

			let results = filtroTipo && filtroTipo !== 'Todos' ? pokeData.pokemon.map((p) => p.pokemon) : pokeData.results

			if (searchTerm) {
				results = results.filter((poke) => poke.name.toLowerCase().includes(searchTerm.toLowerCase()))
			}

			const detailedPokemons = await Promise.all(
				results.map(async (poke) => {
					const detailResponse = await fetch(poke.url)
					return detailResponse.json()
				})
			)

			if (habilidad) {
				results = detailedPokemons.filter((poke) => Array.isArray(poke.abilities) && poke.abilities.some((ability) => ability.ability.name === habilidad))
			} else {
				results = detailedPokemons
			}

			results = results.filter((poke) => {
				const ataque = poke.stats.find((stat) => stat.stat.name === 'attack').base_stat
				const defensa = poke.stats.find((stat) => stat.stat.name === 'defense').base_stat
				const velocidad = poke.stats.find((stat) => stat.stat.name === 'speed').base_stat

				return (
					ataque >= rangoAtaque[0] &&
					ataque <= rangoAtaque[1] &&
					defensa >= rangoDefensa[0] &&
					defensa <= rangoDefensa[1] &&
					velocidad >= rangoVelocidad[0] &&
					velocidad <= rangoVelocidad[1]
				)
			})

			setTotalPokemones(results.length)
			setPokemones(results)
			setLoading(false)
		} catch (error) {
			console.error('Error en los fetch:', error)
			setLoading(false)
		}
	}

	useEffect(() => {
		controladorService()
	}, [filtroTipo, searchTerm, habilidad, rangoAtaque, rangoDefensa, rangoVelocidad])

	return { pokemones, totalPokemones, loading }
}
