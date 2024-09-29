import { useEffect, useState } from 'react'
import ContenedorPokemones from './ContenedorPokemones'
import { NavButton } from './NavButton'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

export const Home = () => {
	const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?offset=6&limit=6')
	const [pokemones, setPokemones] = useState([])
	const [siguientesDisponibles, setSiguientes] = useState(null)
	const [anterioresDisponibles, setAnteriores] = useState(null)

	const controladorService = (url) => {
		fetch(url).then((response) => {
			response.json().then((data) => {
				setPokemones(data.results)
				setSiguientes(data.next ? data.next : null)
				setAnteriores(data.previous ? data.previous : null)
			})
		})
	}

	const siguientesControlador = () => {
		setUrl(siguientesDisponibles)
	}

	const anterioresControlador = () => {
		setUrl(anterioresDisponibles)
	}

	useEffect(() => {
		controladorService(url)
	}, [url])

	return (
		<>
			<Box sx={{ maxWidth: '1000px', padding: '16px' }}>
				<ContenedorPokemones pokemones={pokemones} />
				<Box sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
					<Stack direction="row" sx={{ justifyContent: 'space-between' }}>
						<NavButton texto={'Anteriores'} controlador={anterioresControlador} disponible={anterioresDisponibles} />
						<NavButton texto={'Siguientes'} controlador={siguientesControlador} disponible={siguientesDisponibles} />
					</Stack>
				</Box>
			</Box>
		</>
	)
}

export default Home
