import '../css/appClient.css'
import Ejercicio1 from './views/Ejercicio1.Screen'
import Ejercicio2 from './views/Ejercicio2.Screen'
import Ejercicio3 from './views/Ejercicio3.Screen'
import FetchExample from './views/FetchExample'
import { useState } from 'react'
//import { Start } from './views/Start.Screen'
//import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
//import { ConfigProvider } from './contexts/Config.Context'

const AppClient = () => {
	const [ejercicio, setEjercicio] = useState(<Ejercicio1 />)

	const options = {
		['Ejercicio1']: <Ejercicio1 />,
		['Ejercicio2']: <Ejercicio2 />,
		['Ejercicio3']: <Ejercicio3 />,
		['Fetch']: <FetchExample />,
	}

	return (
		<>
			<nav className="menu">
				<ul>
					<li>
						<a
							href="#"
							onClick={() => {
								setEjercicio(options['Ejercicio1'])
							}}
						>
							Ejercicio1
						</a>
					</li>
					<li>
						<a
							href="#"
							onClick={() => {
								setEjercicio(options['Ejercicio2'])
							}}
						>
							Ejercicio2
						</a>
					</li>
					<li>
						<a
							href="#"
							onClick={() => {
								setEjercicio(options['Ejercicio3'])
							}}
						>
							Ejercicio3
						</a>
					</li>
					<li>
						<a
							href="#"
							onClick={() => {
								setEjercicio(options['Fetch'])
							}}
						>
							Fetch
						</a>
					</li>
				</ul>
			</nav>
			{ejercicio}
		</>
	)
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
