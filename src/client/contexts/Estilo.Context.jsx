import { createTheme } from '@mui/material/styles'

export const estiloPokemon = createTheme({
	components: {
		MuiCard: {
			styleOverrides: {
				root: {},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					fontSize: '1rem',
				},
			},
		},
	},
})

export const estiloPokemonDark = createTheme({
	palette: {
		mode: 'dark',
	},
})
