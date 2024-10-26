/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react'
import { useConfig } from '../contexts/Config.Context'
import { useDebounce } from '../hooks/useDebounce'

const DELAY_BUSQUEDA = 2000
const ERROR_DE_DISPOSICION_DE_DATOS = 'Error en la solicitud de datos:'
const ERROR_AL_OBTENER_DETALLES = 'Error al obtener detalles del Pokémon:'
const ERROR_SOLICITUD = 'Error en la solicitud principal de Pokémon.'
const ERROR_DETALLES = 'Error al obtener detalles para '
const ERROR_FINAL = 'Ocurrió un error al obtener los Pokémon. Intenta nuevamente más tarde.'

const CACHE_TTL = 60000 * 60 // Tiempo de vida de la caché en milisegundos
const pokemonCache = {}

// Definir los rangos de ID para cada generación
const GENERATION_RANGES = {
	1: [1, 151], // Generación 1: del 1 al 151
	2: [152, 251], // Generación 2: del 152 al 251
	3: [252, 386], // Generación 3: del 252 al 386
	4: [387, 493], // Generación 4: del 387 al 493
	5: [494, 649], // Generación 5: del 494 al 649
	6: [650, 721], // Generación 6: del 650 al 721
	7: [722, 809], // Generación 7: del 722 al 809
	8: [810, 898], // Generación 8: del 810 al 898
}

// Verificar si el cache cumple con el tiempo de vida establecido
const isCacheValid = (cacheTimestamp) => {
	const ahora = new Date().getTime()
	return ahora - cacheTimestamp < CACHE_TTL
}

// Función para filtrar Pokémon por estadísticas
const filtrarPorEstadisticas = (pokemones, rangoAtaque, rangoDefensa, rangoVelocidad) => {
	return pokemones.filter((poke) => {
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
}

// Función para filtrar Pokémon por generación según su rango
const filtrarPorGeneracion = (pokemones, generacion) => {
	if (!generacion || !GENERATION_RANGES[generacion]) {
		return pokemones // Si no hay generación seleccionada, devolvemos todos
	}
	const [minId, maxId] = GENERATION_RANGES[generacion]
	return pokemones.filter((poke) => {
		const pokeId = poke.id // ID del Pokémon
		return pokeId >= minId && pokeId <= maxId
	})
}

export const useFetchFiltradosPokemones = () => {
	const [pokemones, setPokemones] = useState([])
	const [totalPokemones, setTotalPokemones] = useState(0)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const { filtroTipo, searchTerm, habilidad, rangoAtaque, rangoDefensa, rangoVelocidad, generacion } = useConfig()

	// Debounce del término de búsqueda
	const debouncedSearchTerm = useDebounce(searchTerm, DELAY_BUSQUEDA)

	// Función para traer los detalles de los pokemones
	const fetchPokemonDetails = async (poke) => {
		if (pokemonCache[poke.url] && isCacheValid(pokemonCache[poke.url].timestamp)) {
			return pokemonCache[poke.url].data // Usar caché si está disponible y es válido
		}

		try {
			const detailResponse = await fetch(poke.url)
			if (!detailResponse.ok) {
				throw new Error(`${ERROR_DETALLES} ${poke.name} - ${detailResponse.status}`)
			}

			const pokeDetail = await detailResponse.json()
			pokemonCache[poke.url] = { data: pokeDetail, timestamp: new Date().getTime() } // Almacenar en caché con timestamp
			return pokeDetail
		} catch (detailError) {
			console.error(ERROR_AL_OBTENER_DETALLES, detailError)
			return null // No almacenar en caché si ocurre un error
		}
	}

	const controladorService = useCallback(async () => {
		setLoading(true)
		setError(null)

		let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000` // Usar el endpoint principal de Pokémon

		try {
			const response = await fetch(url)
			if (!response.ok) {
				throw new Error(`${ERROR_SOLICITUD} - ${response.status}`)
			}

			const pokeData = await response.json()
			let results = pokeData.results // Lista de todos los Pokémon

			// Filtrar por término de búsqueda (debounced)
			if (debouncedSearchTerm) {
				results = results.filter((poke) => poke.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
			}

			// Obtener detalles de los Pokémon y usar caché
			const detallesPokemones = await Promise.all(results.map(fetchPokemonDetails)).then((data) => data.filter(Boolean)) // Filtrar valores nulos o indefinidos

			// Filtrar por generación
			let pokemonesFiltrados = filtrarPorGeneracion(detallesPokemones, generacion)

			// Filtrado por habilidad
			if (habilidad) {
				pokemonesFiltrados = pokemonesFiltrados.filter(
					(poke) => Array.isArray(poke.abilities) && poke.abilities.some((ability) => ability.ability.name === habilidad)
				)
			}

			// Filtrado por estadísticas
			pokemonesFiltrados = filtrarPorEstadisticas(pokemonesFiltrados, rangoAtaque, rangoDefensa, rangoVelocidad)

			// Actualizar los estados
			setTotalPokemones(pokemonesFiltrados.length)
			setPokemones(pokemonesFiltrados)
		} catch (error) {
			console.error(ERROR_DE_DISPOSICION_DE_DATOS, error)
			setError(ERROR_FINAL)
		} finally {
			setLoading(false)
		}
	}, [filtroTipo, debouncedSearchTerm, habilidad, rangoAtaque, rangoDefensa, rangoVelocidad, generacion])

	useEffect(() => {
		controladorService()
	}, [controladorService])

	return { pokemones, totalPokemones, loading, error }
}
