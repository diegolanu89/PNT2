/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { useContext, useState } from 'react'
import PropTypes from 'prop-types'

const ERROR_ACCCES_CONFIG = 'ERROR ACCEDIENDO AL CONTEXT Config'
export const ConfigContext = React.createContext(null)

export const useConfig = () => {
	const context = useContext(ConfigContext)
	if (!context) throw new Error(ERROR_ACCCES_CONFIG)
	return context
}

export const ConfigProvider = ({ children }) => {
	const [filtros, addFiltros] = useState([])
	const [screen, setScreen] = useState('')
	const [favoritos, addFavorito] = useState([])

	const setFiltros = (e) => {
		let f = []
		f.push(e)
		addFiltros(f)
	}

	const cleanFiltro = (e) => {
		addFiltros(e)
	}

	const setFavoritos = (e) => {
		let fav = favoritos
		fav.push(e)
		addFavorito(fav)
		console.log(favoritos)
	}

	return (
		<ConfigContext.Provider
			value={{
				filtros,
				setFiltros,
				cleanFiltro,
				screen,
				setScreen,
				setFavoritos,
				favoritos,
			}}
		>
			{children}
		</ConfigContext.Provider>
	)
}

ConfigProvider.propTypes = {
	children: PropTypes.node,
}

export default ConfigProvider
