import { useEffect, useState } from 'react'

export const FetchExample = () => {
	const [albums, setAlbums] = useState([])

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/albums')
			.then((response) => response.json())
			.then((json) => {
				console.log(json)
				setAlbums(json)
			})
	}, [])

	return (
		<>
			<p>FETH EJEMPLO</p>
			<div id="conteinerAlbum">
				{albums.map((e, i) => {
					return (
						<div className="card" key={i + 'album'}>
							<p>{e.id}</p>
							<p>{e.userId}</p>
							<p>{e.title}</p>
						</div>
					)
				})}
			</div>
		</>
	)
}
export default FetchExample
