import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export const Next = ({ next = null }) => {
	const [active, setActive] = useState(false)
	useEffect(() => {
		if (next == null) {
			setActive(false)
		} else {
			setActive(true)
		}
	}, [next])

	return <div className="Next">{active ? <button>Siguientes</button> : null}</div>
}
Next.propTypes = {
	next: PropTypes.string,
}
export default Next
