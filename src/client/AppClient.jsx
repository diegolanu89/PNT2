import '../css/appClient.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from '../client/components/MainComponents/Home'
import { ThemeProvider } from '@mui/material/styles'
import { estiloPokemon } from './contexts/Estilo.Context'

const AppClient = () => {
	return (
		<>
			<ThemeProvider theme={estiloPokemon}>
				<BrowserRouter>
					<Routes>
						<Route path={'/'} element={<Home />}></Route>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</>
	)
}
export default AppClient
