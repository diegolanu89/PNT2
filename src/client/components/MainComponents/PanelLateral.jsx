import Box from '@mui/material/Box'
import Selector from '../FuncionalComponents/Selector'
import { useDeviceType } from '../../hooks/useDeviceMui'

export const PanelLateral = () => {
	const { isMobile } = useDeviceType()
	return (
		<Box sx={{ minWidth: !isMobile ? '10%' : 'none', padding: !isMobile ? '16px' : '8px', margin: !isMobile ? '8px' : '0px' }}>
			<Selector />
		</Box>
	)
}

export default PanelLateral
