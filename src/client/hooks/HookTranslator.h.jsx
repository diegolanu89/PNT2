import { useEffect, useState } from 'react'
import { TEXT, TEXT_ENG, TEXT_SPA } from '../Model/Parameters.m'
import { useAuth } from '../contexts/Login.Context'

const LENGUAGE_OPTIONS = {
	[TEXT.SPANISH]: TEXT_SPA,
	[TEXT.ENGLISH]: TEXT_ENG,
}

export const getTraslate = (word, lenguage) => {
	const translator = Object.values(LENGUAGE_OPTIONS)[Object.keys(LENGUAGE_OPTIONS).indexOf(lenguage)]
	return Object.values(translator)[Object.keys(translator).indexOf(word)]
}

export default function useTraslate(word) {
	const [trad, setTranslate] = useState('')
	const { lenguage } = useAuth()

	const translate = (word) => {
		setTranslate(getTraslate(word, lenguage))
	}

	useEffect(() => {
		translate(word)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lenguage])

	return trad
}
