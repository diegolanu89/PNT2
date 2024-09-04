/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

export const Ejercicio1 = () => {
	const [lista, setLista] = useState([]) ///<----- El state siempre tiene una variable y su setter a la derecha
	const [cont, setContador] = useState(0)

	useEffect(() => {
		console.log('SOLO AL PRINCIPIO!')
	}, []) //<-------- con esta configuración ni bien termina de renderizare el documento lanza lo que esta adentro.

	useEffect(() => {
		setLista([...lista, 'Vale', 'Diego', 'Vane', 'Guido'])
		//<------Setea la lista
	}, [cont]) // <----- Con este elemento si el state cambia, se ejecuta lo que esta adentro del useEffect.

	return (
		<>
			{lista.length != 0 ? (
				<ul>
					{lista.map((e, i) => {
						return <li key={i + 'u'}>{e}</li>
					})}
				</ul>
			) : null}
			<button
				onClick={() => {
					setContador(cont + 1)
				}}
			>
				CLICK
			</button>
		</>
	)
}
export default Ejercicio1
