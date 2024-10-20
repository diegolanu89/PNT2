import Box from '@mui/material/Box'
import { useDeviceType } from '../../hooks/useDeviceMui'
import SearchBar from '../FuncionalComponents/Search'
import SelectorTipo from '../FuncionalComponents/SelectorTipo'
import SelectorHabilidad from '../FuncionalComponents/SelectorHabilidad'
import FiltroBoton from '../FuncionalComponents/FiltroBoton'

export const PanelLateral = () => {
	const { isMobile } = useDeviceType()
	return (
		<Box
			sx={{
				width: !isMobile ? '300px' : '100%',
				padding: !isMobile ? '16px' : '8px',
				margin: !isMobile ? '8px' : '0px',
				display: isMobile ? 'flex' : 'block',
				flexDirection: isMobile ? 'column' : '',
				marginTop: isMobile ? '16px' : '',
			}}
		>
			<SearchBar />
			<SelectorTipo />
			<SelectorHabilidad />
			<FiltroBoton />
		</Box>
	)
}

export default PanelLateral
