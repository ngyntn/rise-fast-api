/**
 * Protected Route Component
 * Wrapper component for routes that require authentication
 */

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthenticated } from '../../stores/slices/authSlice.js';
import { ROUTES } from '../../config/constants.js';

/**
 * ProtectedRoute Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @param {string} props.redirectTo - Route to redirect to if not authenticated
 * @returns {React.ReactElement} Protected route component
 */
const ProtectedRoute = ({ 
  children, 
  redirectTo = ROUTES.LOGIN 
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location }} 
        replace 
      />
    );
  }

  return children;
};

export default ProtectedRoute;