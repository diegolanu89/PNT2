import * as React from 'react'
import ViewListIcon from '@mui/icons-material/ViewList'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export default function BotoneraCard() {
	const [view, setView] = React.useState('list')

	const handleChange = (event, nextView) => {
		setView(nextView)
	}

	return (
		<ToggleButtonGroup orientation="horizontal" value={view} exclusive onChange={handleChange} id="botoneraCard">
			<ToggleButton value="list" aria-label="list">
				<ViewListIcon />
			</ToggleButton>
			<ToggleButton value="module" aria-label="module">
				<ViewModuleIcon />
			</ToggleButton>
			<ToggleButton value="quilt" aria-label="quilt">
				<ViewQuiltIcon />
			</ToggleButton>
		</ToggleButtonGroup>
	)
}
