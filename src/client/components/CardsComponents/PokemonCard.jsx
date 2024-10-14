/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import { primeraLetraEnMayuscula } from '../../controller/Utils'
import { useDeviceType } from '../../hooks/useDeviceMui'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { typeTextColors, typeColorsDarkMode, typeColors } from '../../controller/parameters'
import GlassCard from './Glass'

export const PokemonCard = ({ pokemon }) => {
	const [details, setDetails] = useState([])
	const { isMobile } = useDeviceType()
	const { width } = useWindowDimensions()

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
				<GlassCard>
					<Box
						sx={{
							width: isMobile ? `${width - 35}px` : '300px',
							backgroundColor: typeColorsDarkMode[details.types[0].type.name],
							border: `10px solid ${typeColors[details.types[0].type.name]}`,
							borderRadius: '5px',
						}}
					>
						<CardContent>
							<Typography variant="h4" gutterBottom sx={{ color: typeTextColors[details.types[0].type.name] }}>
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
							<Chip
								sx={{ color: typeTextColors[details.types[0].type.name], backgroundColor: typeColors[details.types[0].type.name] }}
								label="Detalles"
								onClick={() => {}}
							/>
						</CardActions>
					</Box>
				</GlassCard>
			) : null}
		</>
	)
}
PokemonCard.propTypes = {
	pokemon: PropTypes.object,
}
export default PokemonCard
