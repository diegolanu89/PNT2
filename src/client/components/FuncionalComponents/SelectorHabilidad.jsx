import { MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import { useConfig } from '../../contexts/Config.Context'
import { useEffect, useState } from 'react'
export const tiposUrl = 'https://pokeapi.co/api/v2/ability/'

const SelectorHabilidad = () => {
	const [tiposHabilidades, setHabilidadesTodas] = useState([])
	const { habilidad, setHabilidad } = useConfig() // Obtener y actualizar la habilidad desde el contexto

	useEffect(() => {
		fetch(tiposUrl).then((response) => {
			response.json().then((data) => {
				let habilidades = data.results.map((e) => e.name)
				setHabilidadesTodas(habilidades)
			})
		})
	}, [])

	const handleHabilidadChange = (event) => {
		setHabilidad(event.target.value) // Actualizar la habilidad en el contexto
	}

	return (
		<FormControl fullWidth sx={{ mb: 2 }}>
			<InputLabel id="habilidad-label">Habilidad</InputLabel>
			<Select
				labelId="habilidad-label"
				value={habilidad} // Usar el valor del contexto
				label="Habilidad"
				onChange={handleHabilidadChange} // Actualizar el valor en el contexto
			>
				{tiposHabilidades?.map((e, i) => (
					<MenuItem key={e + i} value={e}>
						<em>{e}</em>
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default SelectorHabilidad
