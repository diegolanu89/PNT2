/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fab from '@mui/material/Fab'
import SearchIcon from '@mui/icons-material/Search'
import { useDeviceType } from '../../hooks/useDeviceMui'
import SearchBar from '../FuncionalComponents/Search'
import SelectorTipo from '../FuncionalComponents/SelectorTipo'
import SelectorHabilidad from '../FuncionalComponents/SelectorHabilidad'
import FiltroBoton from '../FuncionalComponents/FiltroBoton'
import { FiltroEstadisticas } from '../FuncionalComponents/FiltroEstadisticas'
import { Button, Typography } from '@mui/material'
import SelectorGeneracion from '../FuncionalComponents/SelectorGeneracion'
import { useConfig } from '../../contexts/Config.Context'
import SelectorColor from '../FuncionalComponents/SelectorColor'
import SelectorEvoluciones from '../FuncionalComponents/SelectorEvoluciones'

// Estilos del modal
const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '85%',
	bgcolor: 'background.paper',
	borderRadius: '8px',
	boxShadow: 24,
	transition: '0.7s',
	p: 4,
}

export const PanelLateral = () => {
	const { isMobile } = useDeviceType() // Para verificar si es dispositivo móvil
	const [open, setOpen] = useState(false) // Estado del modal
	const { initFiltros } = useConfig()

	const handleOpen = () => setOpen(true) // Función para abrir el modal
	const handleClose = () => setOpen(false) // Función para cerrar el modal

	useEffect(() => {
		setOpen(!open)
	}, [initFiltros])

	return (
		<>
			{/* Si es móvil, muestra el botón flotante y el modal */}
			{isMobile ? (
				<>
					{/* Botón flotante que abre el modal */}
					<Fab
						color="primary"
						aria-label="open"
						onClick={handleOpen}
						sx={{
							position: 'fixed',
							bottom: '16px',
							right: '16px',
						}}
					>
						<SearchIcon />
					</Fab>

					{/* Modal que se abre en dispositivos móviles */}
					<Modal open={open} onClose={handleClose} aria-labelledby="modal-panel-lateral" aria-describedby="modal-panel-lateral-description">
						<Box sx={modalStyle}>
							{/* Contenido del panel lateral dentro del modal */}
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<SearchBar />
								<SelectorTipo />
								<SelectorHabilidad />
								<SelectorGeneracion />
								<SelectorColor />
								<SelectorEvoluciones />
								<FiltroEstadisticas />
								<FiltroBoton />
								{/* Botón de "Ir" para cerrar el modal */}
								<Button
									variant="contained"
									color="primary"
									onClick={handleClose} // Cerrar el modal al hacer clic en "Ir"
									sx={{ mt: 2 }}
								>
									Ir
								</Button>
							</Box>
						</Box>
					</Modal>
				</>
			) : (
				// Si no es móvil, muestra el panel lateral directamente
				<Box
					sx={{
						width: '300px',
						padding: '16px',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<SearchBar />
					{/* Texto "Filtros" entre SearchBar y SelectorTipo */}
					<Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
						Filtros
					</Typography>
					<SelectorTipo />
					<SelectorHabilidad />
					<SelectorGeneracion />
					<SelectorColor />
					<SelectorEvoluciones />
					<FiltroEstadisticas />
					<FiltroBoton />
				</Box>
			)}
		</>
	)
}

export default PanelLateral
