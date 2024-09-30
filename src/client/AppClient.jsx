import '../css/appClient.css'
import Box from '@mui/material/Box'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from '../client/components/MainComponents/Home'
import { ThemeProvider } from '@mui/material/styles'
import { estiloPokemon } from './contexts/Estilo.Context'
import AppBarPokemon from './components/HeaderComponents/AppBarPokemon'
import Paper from '@mui/material/Paper'

const AppClient = () => {
	return (
		<>
			<ThemeProvider theme={estiloPokemon}>
				<Box sx={{ padding: '8px' }}>
					<Paper elevation={1}>
						<AppBarPokemon page={'Pokemon'} />
						<BrowserRouter>
							<Routes>
								<Route path={'/'} element={<Home />}></Route>
								<Route path={'/info'} element={<div>Información</div>}></Route>
							</Routes>
						</BrowserRouter>
					</Paper>
				</Box>
			</ThemeProvider>
		</>
	)
}
export default AppClient
