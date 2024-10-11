import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useConfig } from '../../contexts/Config.Context'
import { useAuth } from '../../contexts/Login.Context'

export default function AppBarPokemon() {
	const { screen } = useConfig()
	const { user, logout } = useAuth()

	const handleLogout = async () => {
		try {
			await logout()
		} catch (error) {
			console.error(error.message)
		}
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						{screen}
					</Typography>
					{user !== null ? (
						<Button color="inherit" onClick={() => handleLogout()}>
							Close Session
						</Button>
					) : null}
				</Toolbar>
			</AppBar>
		</Box>
	)
}
