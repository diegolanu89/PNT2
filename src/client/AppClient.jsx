import '../css/appClient.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from '../client/components/MainComponents/Home'

const AppClient = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path={'/'} element={<Home />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}
export default AppClient
