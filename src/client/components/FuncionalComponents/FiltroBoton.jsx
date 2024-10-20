import { Button } from '@mui/material'
import { useConfig } from '../../contexts/Config.Context' // Usar el contexto

const FiltroBoton = () => {
	const { filtroTipo, habilidad, searchTerm, limpiarFiltros } = useConfig() // Obtener los filtros y la función de limpiar

	// Verificar si hay algún filtro aplicado
	const hayFiltrosAplicados = filtroTipo !== '' || habilidad !== '' || searchTerm !== ''

	return (
		<>
			{hayFiltrosAplicados && (
				<Button variant="outlined" color="secondary" onClick={limpiarFiltros}>
					Limpiar Filtros
				</Button>
			)}
		</>
	)
}

export default FiltroBoton
