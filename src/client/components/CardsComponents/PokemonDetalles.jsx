/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Typography, Box, Card, CardContent, Chip } from '@mui/material'
import { traducirEstadistica, traducirColor, primeraLetraEnMayuscula } from '../../controller/utils'

// Función para obtener los detalles adicionales (color, evolución, habilidades y tipos en español)
const fetchAdditionalDetails = async (pokemonSpeciesUrl, abilities, types) => {
	const response = await fetch(pokemonSpeciesUrl)
	const data = await response.json()

	const color = data.color.name // Traducir el color al español
	const evolutionUrl = data.evolution_chain.url

	// Obtener la cadena evolutiva
	const evolutionResponse = await fetch(evolutionUrl)
	const evolutionData = await evolutionResponse.json()

	// Extraer la cadena de evolución (nombres de Pokémon en la cadena evolutiva en español)
	const evolutionChain = []
	let currentEvolution = evolutionData.chain

	while (currentEvolution) {
		const speciesResponse = await fetch(currentEvolution.species.url)
		const speciesData = await speciesResponse.json()

		// Obtener el nombre en español del Pokémon en la cadena evolutiva
		const nombreEnEspanol = speciesData.names.find((name) => name.language.name === 'es').name
		evolutionChain.push(nombreEnEspanol)

		currentEvolution = currentEvolution.evolves_to[0]
	}

	// Obtener las traducciones de las habilidades
	const habilidadesTraducidas = await Promise.all(
		abilities.map(async (ability) => {
			const nombreHabilidad = await traducirHabilidad(ability.ability.url)
			return nombreHabilidad
		})
	)

	// Obtener las traducciones de los tipos
	const tiposTraducidos = await Promise.all(
		types.map(async (type) => {
			const nombreTipo = await traducirTipo(type.type.url)
			return nombreTipo
		})
	)

	return {
		color,
		evolutionChain,
		habilidadesTraducidas,
		tiposTraducidos,
	}
}

// Función para traducir tipos al español
const traducirTipo = async (tipoUrl) => {
	const response = await fetch(tipoUrl)
	const data = await response.json()

	// Buscar el nombre en español dentro de los nombres disponibles
	const nombreEnEspanol = data.names.find((name) => name.language.name === 'es').name
	return nombreEnEspanol
}

// Función para traducir habilidades al español
const traducirHabilidad = async (habilidadUrl) => {
	const response = await fetch(habilidadUrl)
	const data = await response.json()

	// Buscar el nombre en español dentro de los nombres disponibles
	const nombreEnEspanol = data.names.find((name) => name.language.name === 'es').name
	return nombreEnEspanol
}

const PokemonDetalles = ({ pokemon }) => {
	const [color, setColor] = useState('')
	const [evolutionChain, setEvolutionChain] = useState([])
	const [habilidadesTraducidas, setHabilidadesTraducidas] = useState([])
	const [tiposTraducidos, setTiposTraducidos] = useState([])

	// Al montar el componente, obtener detalles adicionales
	useEffect(() => {
		const getDetails = async () => {
			const details = await fetchAdditionalDetails(pokemon.species.url, pokemon.abilities, pokemon.types) // URL de la especie del Pokémon, habilidades y tipos
			setColor(details.color)
			setEvolutionChain(details.evolutionChain)
			setHabilidadesTraducidas(details.habilidadesTraducidas)
			setTiposTraducidos(details.tiposTraducidos)
		}

		getDetails()
	}, [pokemon])

	const {
		name,
		stats, // Un array de objetos con las estadísticas: { stat: { name }, base_stat }
		weight,
		height,
	} = pokemon

	return (
		<Card>
			<CardContent>
				{/* Contenedor para nombre y tipos */}
				<Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 3 }}>
					<Typography variant="h4" sx={{ fontWeight: 'bold', color: color.toLowerCase() }}>
						{primeraLetraEnMayuscula(name)}
					</Typography>
					<Box sx={{ display: 'flex', gap: 1 }}>
						{tiposTraducidos.map((tipo, index) => (
							<Chip key={index} label={tipo} color="primary" />
						))}
					</Box>
				</Box>
				<img src={pokemon.sprites.front_default} alt={pokemon.name} />
				{/* Peso y altura */}
				<Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 3 }}>
					<Typography variant="body1">
						<strong>Peso:</strong> {weight / 10} kg
					</Typography>
					<Typography variant="body1">
						<strong>Altura:</strong> {height / 10} m
					</Typography>
				</Box>

				{/* Habilidades */}
				<Box sx={{ mb: 3 }}>
					<Typography variant="h6">Habilidades</Typography>
					<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
						{habilidadesTraducidas.map((habilidad, index) => (
							<Chip key={index} label={habilidad} />
						))}
					</Box>
				</Box>

				{/* Estadísticas */}
				<Box sx={{ mb: 3 }}>
					{stats.map((stat, index) => (
						<Typography key={index} variant="body1">
							<strong>{traducirEstadistica(stat.stat.name)}:</strong> {stat.base_stat}
						</Typography>
					))}
				</Box>

				{/* Color y Evolución */}
				<Box sx={{ mb: 3 }}>
					<Typography variant="body1">
						<strong>Color:</strong> {traducirColor(color)}
					</Typography>
					<Typography variant="body1">
						<strong>Evolución:</strong> {evolutionChain.join(' -> ')}
					</Typography>
				</Box>
			</CardContent>
		</Card>
	)
}

export default PokemonDetalles
