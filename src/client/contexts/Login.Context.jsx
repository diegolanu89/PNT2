import { createContext, useContext, useState } from 'react'

export const LoginContext = createContext(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const context = useContext(LoginContext)
	if (!context) throw new Error('ERROR ACCEDIENDO AL CONTEXT AUTH')
	return context
}

const LoginProvider = (children) => {
	const [isLogin, setLogin] = useState(false)
	const [userData, setUserData] = useState(null)
	const [lenguage, setLenguage] = useState('SPANISH')
	const [switchTranslate, setSwitch] = useState(false)

	return (
		<LoginContext.Provider
			value={{
				isLogin,
				userData,
				setUserData,
				setLogin,
				lenguage,
				setLenguage,
				switchTranslate,
				setSwitch,
			}}
		>
			{children}
		</LoginContext.Provider>
	)
}

export default LoginProvider
