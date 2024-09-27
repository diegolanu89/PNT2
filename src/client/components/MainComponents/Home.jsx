import { useEffect, useState } from 'react'
import ConteinerCard from './ConteinerCard'
import Next from './Next'
import Before from './Before'

export const Home = () => {
	const [pokemones, setPokemones] = useState([])
	const [next, setNext] = useState(null)
	const [before, setBefore] = useState(null)
	const startUrl = 'https://pokeapi.co/api/v2/pokemon'

	const handlerService = (url) => {
		fetch(url).then((response) => {
			response.json().then((data) => {
				setPokemones(data.results)
				setNext(data.next ? data.next : null)
				setBefore(data.before ? data.before : null)
			})
		})
	}

	useEffect(() => {
		handlerService(startUrl)
	}, [])

	return (
		<div>
			<ConteinerCard pokemones={pokemones} />
			<Next next={next} handler={(e) => console.log(e)} />
			<Before before={before} handler={(e) => console.log(e)} />
		</div>
	)
}

export default Home
