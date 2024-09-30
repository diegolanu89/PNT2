import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'

export default function ControlledOpenSelect() {
	const [tipo, setTipo] = React.useState('')
	const [open, setOpen] = React.useState(false)

	const handleChange = (event) => {
		setTipo(event.target.value)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleOpen = () => {
		setOpen(true)
	}

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
					<MenuItem value="">
						<em>Todos</em>
					</MenuItem>
					<MenuItem value={10}>Agua</MenuItem>
					<MenuItem value={20}>Tierra</MenuItem>
					<MenuItem value={30}>Fuego</MenuItem>
				</Select>
			</FormControl>
		</div>
	)
}
