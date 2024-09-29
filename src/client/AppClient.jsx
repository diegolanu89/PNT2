import '../css/appClient.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from '../client/components/MainComponents/Home'
import { ThemeProvider } from '@mui/material/styles'
import { estiloPokemon } from './contexts/Estilo.Context'
import Header from './components/HeaderComponents/Header'

const AppClient = () => {
	return (
		<>
			<ThemeProvider theme={estiloPokemon}>
				<Header page={'Bienvenido'} />
				<BrowserRouter>
					<Routes>
						<Route path={'/'} element={<Home />}></Route>
						<Route path={'/info'} element={<div>Información</div>}></Route>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</>
	)
}
export default AppClient
