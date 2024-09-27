import Card from '../CardsComponents/Card'
import PropTypes from 'prop-types'

export function ConteinerCard({ pokemones }) {
	return (
		<div id="conteinerCard">
			{pokemones?.map((pokemon, i) => (
				<Card key={i} pokemon={pokemon}></Card>
			))}
		</div>
	)
}

ConteinerCard.propTypes = {
	pokemones: PropTypes.array,
}
export default ConteinerCard
