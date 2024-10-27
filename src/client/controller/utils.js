export const primeraLetraEnMayuscula = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const fetchTipoEnEspañol = async (id) => {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/type/${id}`)
		const data = await response.json()

		// Buscar la traducción en español dentro del array `names`
		const tradEspaniol = data.names.find((name) => name.language.name === 'es')

		if (tradEspaniol) {
			return tradEspaniol.name
		} else {
			return null
		}
	} catch (error) {
		console.error('Error al obtener el tipo:', error)
	}
}

export const fetchHabilidadesEnEspañol = async (id) => {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/ability/${id}`)
		const data = await response.json()

		const tradEspaniol = data.names.find((name) => name.language.name === 'es')

		if (tradEspaniol) {
			return tradEspaniol.name
		} else {
			return null
		}
	} catch (error) {
		console.error('Error al obtener la habilidad:', error)
	}
}

export const traducirColor = (color) => {
	const traducciones = {
		red: 'Rojo',
		blue: 'Azul',
		green: 'Verde',
		yellow: 'Amarillo',
		black: 'Negro',
		white: 'Blanco',
		brown: 'Marrón',
		purple: 'Morado',
		pink: 'Rosa',
		gray: 'Gris',
	}

	return traducciones[color] || color
}

export const traducirEstadistica = (statName) => {
	const traducciones = {
		hp: 'Puntos de salud',
		attack: 'Ataque',
		defense: 'Defensa',
		['special-attack']: 'Ataque especial',
		['special-defense']: 'Defensa especial',
		speed: 'Velocidad',
	}

	return traducciones[statName] || statName
}
