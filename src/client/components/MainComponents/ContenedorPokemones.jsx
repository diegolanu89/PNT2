import PokemonCard from '../CardsComponents/PokemonCard'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import BotoneraCard from '../CardsComponents/BotoneraCard'
import { useState } from 'react'
import { DESIGN } from '../../controller/parameters'
import { useDeviceType } from '../../hooks/useDeviceMui'

export function ContenedorPokemones({ pokemones }) {
	const { isMobile } = useDeviceType()
	const [disposicion, setDisposicion] = useState(DESIGN.ROW)

	return (
		<Box id="contenedorPokemones" sx={{ flexDirection: disposicion, justifyContent: isMobile ? 'center' : 'space-between' }}>
			{!isMobile ? <BotoneraCard handler={setDisposicion} /> : null}

			{pokemones?.map((pokemon, i) => (
				<Card
					key={i + 'Card'}
					variant="outlined"
					sx={{ minWidth: 275, boxShadow: 3, marginBottom: '16px', backgroundColor: 'grey', borderRadius: '5px', border: 'none' }}
				>
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
