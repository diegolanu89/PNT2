import '../css/appClient.css'
import Ejercicio1 from './views/Ejercicio1.Screen'
//import { Start } from './views/Start.Screen'
//import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
//import { ConfigProvider } from './contexts/Config.Context'

const AppClient = () => {
	return <Ejercicio1 />
}
export default AppClient

/**
 * <div id="app">
			<ConfigProvider>
				<BrowserRouter>
					<Routes>
						<Route path={'/'} element={<Navigate to={'/start'} />} replace={true} />
						<Route path={'/start'} element={<Start />} />
					</Routes>
				</BrowserRouter>
			</ConfigProvider>
		</div>
 */
