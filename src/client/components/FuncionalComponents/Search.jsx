import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search' // Un ícono de búsqueda para el adornment
import { useConfig } from '../../contexts/Config.Context'

const SearchBar = () => {
	const { searchTerm, setSearchTerm, aplicarFiltros } = useConfig() // Obtener y actualizar el término de búsqueda

	// Manejador del cambio en la barra de búsqueda
	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value) // Actualizar el término de búsqueda en el contexto
	}

	// Función para manejar la tecla presionada
	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			aplicarFiltros() // Llamar a la función que aplica los filtros
		}
	}

	return (
		<TextField
			label="Buscar por nombre"
			variant="outlined"
			fullWidth
			value={searchTerm} // Usar el valor del contexto
			onChange={handleSearchChange} // Actualizar el valor en el contexto
			onKeyDown={handleKeyDown} // Detectar la presión de una tecla
			sx={{ mb: 2 }}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchIcon /> {/* Ícono de búsqueda */}
					</InputAdornment>
				),
			}}
		/>
	)
}

export default SearchBar
