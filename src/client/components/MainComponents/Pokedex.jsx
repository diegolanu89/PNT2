import { Box, Stack, CircularProgress, Divider, Typography, Pagination } from '@mui/material'
import ContenedorPokemones from './ContenedorPokemones'
import PanelLateral from './PanelLateral'
import { useDeviceType } from '../../hooks/useDeviceMui'
import { usePaginacion } from '../../hooks/usePaginacion'
import { useFetchFiltradosPokemones } from '../../hooks/useFetchFiltradosPokemones'

export const PokeDex = () => {
	const { isMobile } = useDeviceType()
	const limit = isMobile ? 6 : 10
	const { pokemones, totalPokemones, loading } = useFetchFiltradosPokemones()
	const { pagina, paginador, pokemonesAMostrar } = usePaginacion(totalPokemones, limit)

	return (
		<Box>
			<Stack direction={isMobile ? 'column' : 'row'}>
				<PanelLateral />
				{!isMobile ? <Divider orientation="vertical" flexItem /> : null}
				<Box sx={{ width: '100%', padding: '16px' }}>
					{loading ? (
						<Box display="flex" justifyContent="center" alignItems="center" height="400px">
							<CircularProgress />
						</Box>
					) : (
						<>
							{pokemones.length === 0 ? (
								<Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
									<Typography variant="h6">No se encontraron resultados.</Typography>
									<img
										src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png"
										alt="No se encontraron resultados"
										style={{ maxWidth: '300px', marginTop: '20px' }}
									/>
								</Box>
							) : (
								<>
									<ContenedorPokemones pokemones={pokemonesAMostrar(pokemones)} sx={{ padding: '16px' }} />
									<Box sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
										<Stack direction="row" sx={{ justifyContent: 'space-between' }}>
											<Pagination count={Math.ceil(totalPokemones / limit)} page={pagina} variant="outlined" onChange={paginador} />
										</Stack>
									</Box>
								</>
							)}
						</>
					)}
				</Box>
			</Stack>
		</Box>
	)
}

export default PokeDex
