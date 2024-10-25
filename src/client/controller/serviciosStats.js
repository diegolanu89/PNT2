export const getMaximoStat = async (cualidad) => {
	let maxStat = 0

	// Aquí harás varias llamadas a la API, por ejemplo, a los primeros 150 Pokémon
	for (let i = 1; i <= 1000; i++) {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
		const data = await response.json()

		// Encuentra la estadística de la cualidad que le paso
		const cualidadStat = data.stats.find((stat) => stat.stat.name === cualidad)

		if (cualidadStat && cualidadStat.base_stat > maxStat) {
			maxStat = cualidadStat.base_stat
		}
	}

	return maxStat
}
