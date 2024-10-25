import { useState } from 'react'

export const usePaginacion = (totalPokemones, limit) => {
	const [pagina, setPagina] = useState(1)

	const paginador = (event, value) => {
		setPagina(value)
	}

	const pokemonesAMostrar = (pokemones) => {
		return pokemones.slice((pagina - 1) * limit, pagina * limit)
	}

	return { pagina, paginador, pokemonesAMostrar }
}
