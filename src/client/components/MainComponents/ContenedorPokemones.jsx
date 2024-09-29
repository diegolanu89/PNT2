import PokemonCard from '../CardsComponents/PokemonCard'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

export function ContenedorPokemones({ pokemones }) {
	return (
		<div id="contenedorPokemones">
			{pokemones?.map((pokemon, i) => (
				<>
					<Box key={pokemon + i} sx={{ minWidth: 275, boxShadow: 3, marginBottom: '16px' }}>
						<Card variant="outlined">
							<PokemonCard pokemon={pokemon} />
						</Card>
					</Box>
				</>
			))}
		</div>
	)
}

ContenedorPokemones.propTypes = {
	pokemones: PropTypes.array,
}
export default ContenedorPokemones
