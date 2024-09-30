/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'

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
		<>
			{details.length != 0 ? (
				<Box className="pokemonCard">
					<CardContent>
						<Typography variant="h4" gutterBottom color="primary">
							{details.id}
						</Typography>
						<Typography variant="h5" component="div">
							{primeraLetraEnMayuscula(pokemon.name)}
						</Typography>
						<Typography variant="h6" sx={{ color: 'text.secondary', mb: 1.5 }}>
							{primeraLetraEnMayuscula(details.types[0].type.name)}
						</Typography>
						<img src={details.sprites.front_default} />
						<Divider orientation="horizontal" flexItem />
					</CardContent>
					<CardActions>
						<Chip color="primary" label="Detalles" onClick={() => {}} />
					</CardActions>
				</Box>
			) : null}
		</>
	)
}
PokemonCard.propTypes = {
	pokemon: PropTypes.object,
}
export default PokemonCard
