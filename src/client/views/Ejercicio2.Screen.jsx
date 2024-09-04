import { useEffect, useState } from 'react'

export const Ejercicio2 = () => {
	const [auto, setAuto] = useState({
		marca: 'BMW',
		modelo: '200',
		anio: '2024',
	})
	const { marca, modelo, anio } = auto

	useEffect(() => {
		setAuto({
			marca: 'BMW',
			modelo: '200',
			anio: '2024',
		})
	}, [])

	return (
		<>
			<p>Forma 1</p>
			{auto ? (
				<>
					<div>AUTO:{auto.marca}</div>
					<div>MODELO:{auto.modelo}</div>
					<div>ANIO:{auto.anio}</div>
				</>
			) : null}

			<p>Forma 2</p>
			{auto ? (
				<>
					<div>AUTO:{marca}</div>
					<div>MODELO:{modelo}</div>
					<div>ANIO:{anio}</div>
				</>
			) : null}
		</>
	)
}
export default Ejercicio2
