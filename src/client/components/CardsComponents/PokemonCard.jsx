/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'

const primeraLetraEnMayuscula = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const PokemonCard = ({ pokemon }) => {
	const [details, setDetails] = useState([])

	useEffect(() => {
		fetch(pokemon.url).then((response) => {
			response.json().then((data) => {
				setDetails(data)
			})
		})
	}, [pokemon])

	return (
		<div className="pokemonCard">
			{details.length != 0 ? (
				<>
					<CardContent>
						<Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
							{details.id}
						</Typography>
						<Typography variant="h5" component="div">
							{primeraLetraEnMayuscula(pokemon.name)}
						</Typography>
						<Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{details.types[0].type.name}</Typography>
						<img src={details.sprites.front_default} />
						<Divider orientation="horizontal" flexItem />
					</CardContent>
					<CardActions>
						<Chip color="primary" label="Detalles" onClick={() => {}} />
					</CardActions>
				</>
			) : null}
		</div>
	)
}
PokemonCard.propTypes = {
	pokemon: PropTypes.object,
}
export default PokemonCard
