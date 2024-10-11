import '../css/appClient.css'
import Box from '@mui/material/Box'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from '../client/components/MainComponents/Home'
import { ThemeProvider } from '@mui/material/styles'
import { estiloPokemonDark } from './contexts/Estilo.Context'
import AppBarPokemon from './components/HeaderComponents/AppBarPokemon'
import Paper from '@mui/material/Paper'
import { ConfigProvider } from './contexts/Config.Context'
import { ProtectedRoute } from './components/FuncionalComponents/ProtectedRoute'
import { AuthProvider } from './contexts/Login.Context'
import { Login } from './components/MainComponents/Login'
import { Register } from './components/MainComponents/Register'
import { Screen } from './components/MainComponents/Screen'
import { PATHS, LABELS } from './controller/parameters'

const AppClient = () => {
	return (
		<>
			<AuthProvider>
				<ConfigProvider>
					<ThemeProvider theme={estiloPokemonDark}>
						<Box sx={{ padding: '8px' }}>
							<Paper elevation={1}>
								<AppBarPokemon />
								<BrowserRouter>
									<Routes>
										<Route
											path={PATHS.HOME}
											element={
												<ProtectedRoute>
													<Screen label={LABELS.LABEL_HOME}>
														<Home />
													</Screen>
												</ProtectedRoute>
											}
										></Route>
										<Route
											path={PATHS.INFO}
											element={
												<ProtectedRoute>
													<Screen label={LABELS.LABEL_INFO}>
														<div>INFORMACION</div>
													</Screen>
												</ProtectedRoute>
											}
										></Route>
										<Route
											path={PATHS.LOGIN}
											element={
												<Screen label={LABELS.LABEL_LOGIN}>
													<Login />
												</Screen>
											}
										/>
										<Route
											path={PATHS.REGISTER}
											element={
												<Screen label={LABELS.LABEL_REGISTER}>
													<Register />
												</Screen>
											}
										/>
									</Routes>
								</BrowserRouter>
							</Paper>
						</Box>
					</ThemeProvider>
				</ConfigProvider>
			</AuthProvider>
		</>
	)
}
export default AppClient
