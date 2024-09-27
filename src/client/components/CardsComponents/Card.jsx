/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export const Card = ({ pokemon }) => {
	const [details, setDetails] = useState([])

	useEffect(() => {
		fetch(pokemon.url).then((response) => {
			response.json().then((data) => {
				setDetails(data)
			})
		})
	}, [])

	return (
		<div className="Card">
			{details.length != 0 ? (
				<>
					<img src={details.sprites.front_default} />
					<div>{pokemon.name}</div>
				</>
			) : null}
		</div>
	)
}
Card.propTypes = {
	pokemon: PropTypes.object,
}
export default Card
