import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export const Before = ({ before = null }) => {
	const [active, setActive] = useState(false)

	useEffect(() => {
		if (before == null) {
			setActive(false)
		} else {
			setActive(true)
		}
	}, [before])

	return <div className="Before">{active ? <button>Anteriores</button> : null}</div>
}
Before.propTypes = {
	before: PropTypes.string,
}
export default Before
