import { TextField } from '@mui/material'
import { useConfig } from '../../contexts/Config.Context'

const SearchBar = () => {
	const { searchTerm, setSearchTerm } = useConfig() // Obtener y actualizar el término de búsqueda

	// Manejador del cambio en la barra de búsqueda
	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value) // Actualizar el término de búsqueda en el contexto
	}

	return (
		<TextField
			label="Buscar por nombre"
			variant="outlined"
			fullWidth
			value={searchTerm} // Usar el valor del contexto
			onChange={handleSearchChange} // Actualizar el valor en el contexto
			sx={{ mb: 2 }}
		/>
	)
}

export default SearchBar
