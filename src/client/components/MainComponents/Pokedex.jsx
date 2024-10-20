/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import ContenedorPokemones from './ContenedorPokemones'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import Divider from '@mui/material/Divider'
import PanelLateral from './PanelLateral'
import { useDeviceType } from '../../hooks/useDeviceMui'
import { useConfig } from '../../contexts/Config.Context'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

export const PokeDex = () => {
	const { isMobile } = useDeviceType()
	const [pagina, setPagina] = useState(1) // Página actual
	const [pokemones, setPokemones] = useState([])
	const [totalPokemones, setTotalPokemones] = useState(0) // Total de Pokémon
	const [loading, setLoading] = useState(true) // Estado de carga
	const limit = isMobile ? 6 : 10 // Límite de 6 por página
	const { filtroTipo, searchTerm, habilidad } = useConfig() // Obtener filtroTipo y searchTerm del contexto

	// Función para obtener Pokémon desde la API
	const controladorService = (filtroTipo, searchTerm, habilidad) => {
		setLoading(true) // Activar el estado de carga

		let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000` // Obtener un número grande para paginar localmente

		if (filtroTipo && filtroTipo !== 'Todos') {
			url = `https://pokeapi.co/api/v2/type/${filtroTipo}`
		}

		fetch(url)
			.then((response) => response.json())
			.then(async (pokeData) => {
				// Filtrar por tipo si esta selleccionado alguno
				let results = filtroTipo && filtroTipo !== 'Todos' ? pokeData.pokemon.map((p) => p.pokemon) : pokeData.results

				// Filtrar por nombre si está definido
				if (searchTerm) {
					results = results.filter((poke) => poke.name.toLowerCase().includes(searchTerm.toLowerCase()))
				}

				// Obtener detalles de cada Pokémon para filtrar por habilidad
				const detailedPokemons = await Promise.all(
					results.map(async (poke) => {
						const detailResponse = await fetch(poke.url)
						return detailResponse.json()
					})
				)

				// Filtrar por habilidad si está definida
				if (habilidad) {
					results = detailedPokemons.filter(
						(poke) =>
							// Verifica que poke.abilities sea un array antes de usar .some
							Array.isArray(poke.abilities) && poke.abilities.some((ability) => ability.ability.name === habilidad)
					)
				} else {
					results = detailedPokemons
				}

				setTotalPokemones(results.length) // Actualizar el total con los resultados filtrados
				setPokemones(results)
				setLoading(false) // Desactivar el estado de carga cuando los datos hayan cargado
			})
			.catch((error) => {
				console.error('Error en los fetch:', error)
				setLoading(false) // Desactivar el estado de carga en caso de error
			})
	}

	// Obtener los Pokémon paginados de los resultados filtrados
	const pokemonesAMostrar = pokemones.slice((pagina - 1) * limit, pagina * limit)

	// Manejador del cambio de página
	const paginador = (event, value) => {
		setPagina(value)
	}

	useEffect(() => {
		controladorService(filtroTipo, searchTerm, habilidad) // Usar filtroTipo y searchTerm del contexto
	}, [filtroTipo, searchTerm, habilidad]) // Llamar a la API cuando cambien el tipo o el nombre

	return (
		<>
			<Box>
				<Stack direction={isMobile ? 'column' : 'row'}>
					<PanelLateral />
					{!isMobile ? <Divider orientation="vertical" flexItem /> : null}
					<Box sx={{ width: '100%', padding: '16px' }}>
						{/* Mostrar el GIF de carga mientras loading es true */}
						{loading ? (
							<Box display="flex" justifyContent="center" alignItems="center" height="400px">
								<CircularProgress /> {/* Componente de Material UI para el spinner */}
							</Box>
						) : (
							<>
								{/* Mostrar mensaje si no hay resultados */}
								{pokemones.length === 0 ? (
									<Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
										<Typography variant="h6">No se encontraron resultados.</Typography>
										{/* Imagen de pokemon cuando no hay resultados */}
										<img
											src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png"
											alt="No se encontraron resultados"
											style={{ maxWidth: '300px', marginTop: '20px' }}
											className="pulsar"
										/>
									</Box>
								) : (
									<>
										{/* Contenedor de los Pokémon */}
										<ContenedorPokemones pokemones={pokemonesAMostrar} sx={{ borderLine: '10px solid red', padding: '16px' }} />

										{/* Paginación */}
										<Box sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
											<Stack direction="row" sx={{ justifyContent: 'space-between' }}>
												<Pagination
													count={Math.ceil(totalPokemones / limit)} // Total de páginas
													page={pagina} // Página actual
													variant="outlined"
													onChange={paginador}
												/>
											</Stack>
										</Box>
									</>
								)}
							</>
						)}
					</Box>
				</Stack>
			</Box>
		</>
	)
}

export default PokeDex
