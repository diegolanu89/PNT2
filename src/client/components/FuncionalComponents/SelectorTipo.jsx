import { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useConfig } from '../../contexts/Config.Context'

export const tiposUrl = 'https://pokeapi.co/api/v2/type/'

const SelectorTipo = () => {
	const [tiposPokemon, setTiposPokemon] = useState([])
	const { filtroTipo, setFiltroTipo } = useConfig()

	useEffect(() => {
		fetch(tiposUrl).then((response) => {
			response.json().then((data) => {
				let tipos = data.results.map((e) => e.name)
				tipos.unshift('Todos')
				setTiposPokemon(tipos)
			})
		})
	}, [])

	const handleTipoChange = (event) => {
		setFiltroTipo(event.target.value) // Actualizar la habilidad en el contexto
	}

	return (
		<>
			<FormControl fullWidth sx={{ mb: 2 }}>
				<InputLabel id="tipo-label">Tipo</InputLabel>
				<Select
					labelId="tipo-label"
					value={filtroTipo} // Usar el valor del contexto
					label="Tipo"
					onChange={handleTipoChange} // Actualizar el valor en el contexto
				>
					{tiposPokemon?.map((e, i) => (
						<MenuItem key={e + i} value={e}>
							<em>{e}</em>
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</>
	)
}
export default SelectorTipo
