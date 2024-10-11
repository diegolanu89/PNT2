import { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import { useConfig } from '../../contexts/Config.Context'

export const tiposUrl = 'https://pokeapi.co/api/v2/type/'

export default function Selector() {
	const [tipo, setTipo] = useState('')
	const [open, setOpen] = useState(false)
	const [tiposPokemon, setTiposPokemon] = useState([])
	const { setFiltros } = useConfig()

	const handleChange = (event) => {
		setTipo(event.target.value)
		setFiltros(event.target.value)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleOpen = () => {
		setOpen(true)
	}

	useEffect(() => {
		fetch(tiposUrl).then((response) => {
			response.json().then((data) => {
				setTiposPokemon(data.results)
			})
		})
	}, [])

	return (
		<div>
			<Button sx={{ display: 'block', mt: 2 }} onClick={handleOpen}>
				Filtros
			</Button>
			<FormControl sx={{ m: 1, minWidth: 120 }}>
				<InputLabel id="demo-controlled-open-select-label">Tipo</InputLabel>
				<Select
					labelId="demo-controlled-open-select-label"
					id="demo-controlled-open-select"
					open={open}
					onClose={handleClose}
					onOpen={handleOpen}
					value={tipo}
					label="Age"
					onChange={handleChange}
				>
					{tiposPokemon?.map((e, i) => (
						<MenuItem key={e.name + i} value={e.name}>
							<em>{e.name}</em>
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}
