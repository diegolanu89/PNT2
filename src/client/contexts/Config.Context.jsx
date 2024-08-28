import * as React from 'react'
import { useContext, useState } from 'react'

export const ConfigContext = React.createContext(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useConfig = () => {
	const context = useContext(ConfigContext)
	if (!context) throw new Error('ERROR ACCEDIENDO AL CONTEXT Config')
	return context
}

export const ConfigProvider = (children) => {
	const [acount, setAcount] = useState()
	const [numberDispense, setNumberDispense] = useState(1)
	const [maxBills, setMaxBills] = useState(40)
	const [balanceAtm, setBalanceAtm] = useState(2000)

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
			}}
		>
			{children}
		</ConfigContext.Provider>
	)
}

export default ConfigProvider
