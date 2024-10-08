/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { useContext, useState } from 'react'
import PropTypes from 'prop-types'

export const ConfigContext = React.createContext(null)

export const useConfig = () => {
	const context = useContext(ConfigContext)
	if (!context) throw new Error('ERROR ACCEDIENDO AL CONTEXT Config')
	return context
}

export const ConfigProvider = ({ children }) => {
	const [acount, setAcount] = useState()
	const [numberDispense, setNumberDispense] = useState(1)
	const [maxBills, setMaxBills] = useState(40)
	const [balanceAtm, setBalanceAtm] = useState(2000)
	const [filtros, addFiltros] = useState([])

	const setFiltros = (e) => {
		addFiltros(e)
	}

	return (
		<ConfigContext.Provider
			value={{
				maxBills,
				setMaxBills,
				acount,
				setAcount,
				setNumberDispense,
				numberDispense,
				balanceAtm,
				setBalanceAtm,
				filtros,
				setFiltros,
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
