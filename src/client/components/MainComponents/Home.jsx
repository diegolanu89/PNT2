import { useEffect, useState } from 'react'
import ContenedorPokemones from './ContenedorPokemones'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import Divider from '@mui/material/Divider'
import PanelLateral from './PanelLateral'

export const Home = () => {
	const [pagina, setPagina] = useState('https://pokeapi.co/api/v2/pokemon?offset=0&limit=6')
	const [pokemones, setPokemones] = useState([])

	const controladorService = (pagina) => {
		fetch(pagina).then((response) => {
			response.json().then((data) => {
				setPokemones(data.results)
			})
		})
	}

	const paginador = (event, pagina) => {
		setPagina(`https://pokeapi.co/api/v2/pokemon?offset=${pagina * 6 - 6}&limit=6`)
	}

	useEffect(() => {
		controladorService(pagina)
	}, [pagina])

	return (
		<>
			<Box id="home">
				<Stack direction="row" sx={{ justifyContent: 'space-between' }}>
					<Divider orientation="vertical" flexItem />
					<PanelLateral />
					<Box sx={{ maxWidth: '1000px', padding: '16px' }}>
						<Divider orientation="horizontal" flexItem sx={{ marginBottom: '16px' }} />
						<ContenedorPokemones pokemones={pokemones} sx={{ borderLine: '10px solid red', padding: '16px' }} />
						<Box sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
							<Stack direction="row" sx={{ justifyContent: 'space-between' }}>
								<Pagination count={217} variant="outlined" onChange={paginador} />
							</Stack>
						</Box>
					</Box>
				</Stack>
			</Box>
		</>
	)
}

export default Home
