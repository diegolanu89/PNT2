import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/Login.Context'
import { Starting } from './Starting'
import PropTypes from 'prop-types'

export const ProtectedRoute = ({ children }) => {
	const { user, loading } = useAuth()
	if (loading) return <Starting />
	if (!user) return <Navigate to="/login" />

	return <>{children}</>
}

ProtectedRoute.propTypes = {
	children: PropTypes.node,
}
export default ProtectedRoute
