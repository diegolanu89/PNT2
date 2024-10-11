import PokemonCard from '../CardsComponents/PokemonCard'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import BotoneraCard from '../CardsComponents/BotoneraCard'
import { useState, useEffect } from 'react'
import { useConfig } from '../../contexts/Config.Context'
import { DESIGN } from '../../controller/parameters'
export function ContenedorPokemones({ pokemones }) {
	const { filtros } = useConfig()
	const [disposicion, setDisposicion] = useState(DESIGN.ROW)

	useEffect(() => {}, [filtros])

	return (
		<Box id="contenedorPokemones" sx={{ flexDirection: disposicion }}>
			<BotoneraCard handler={setDisposicion} />
			{pokemones?.map((pokemon, i) => (
				<Card key={i + 'Card'} variant="outlined" sx={{ minWidth: 275, boxShadow: 3, marginBottom: '16px' }}>
					<PokemonCard key={i + 'PokemonCard'} pokemon={pokemon} />
				</Card>
			))}
		</Box>
	)
}

ContenedorPokemones.propTypes = {
	pokemones: PropTypes.array,
}
export default ContenedorPokemones
