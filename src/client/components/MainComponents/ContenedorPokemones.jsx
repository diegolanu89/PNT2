import PokemonCard from '../CardsComponents/PokemonCard'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import BotoneraCard from '../CardsComponents/BotoneraCard'
export function ContenedorPokemones({ pokemones }) {
	return (
		<Box id="contenedorPokemones">
			<BotoneraCard />
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
