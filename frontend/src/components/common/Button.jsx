/**
 * Button Component
 * Reusable button component with different variants and states
 */

import styled from 'styled-components';
import { Theme } from '../../utils/Theme.js';
import LoadingSpinner from './LoadingSpinner.jsx';

// Button variants
const BUTTON_VARIANTS = {
  primary: {
    background: Theme.highlight,
    color: '#ffffff',
    hoverBackground: Theme.violet,
  },
  secondary: {
    background: Theme.lightSoft,
    color: Theme.text,
    hoverBackground: Theme.midsoft,
  },
  danger: {
    background: Theme.hotRed,
    color: '#ffffff',
    hoverBackground: '#cc0000',
  },
  success: {
    background: Theme.success,
    color: '#ffffff',
    hoverBackground: '#00cc0d',
  },
  outline: {
    background: 'transparent',
    color: Theme.highlight,
    border: `2px solid ${Theme.highlight}`,
    hoverBackground: Theme.highlight,
    hoverColor: '#ffffff',
  },
};

// Button sizes
const BUTTON_SIZES = {
  small: {
    padding: '8px 16px',
    fontSize: '12px',
  },
  medium: {
    padding: '12px 24px',
    fontSize: '14px',
  },
  large: {
    padding: '16px 32px',
    fontSize: '16px',
  },
};

// Styled button component
const StyledButton = styled.button`
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;
  outline: none;
  
  /* Size styles */
  padding: ${props => BUTTON_SIZES[props.size]?.padding || BUTTON_SIZES.medium.padding};
  font-size: ${props => BUTTON_SIZES[props.size]?.fontSize || BUTTON_SIZES.medium.fontSize};
  
  /* Variant styles */
  background: ${props => BUTTON_VARIANTS[props.variant]?.background || BUTTON_VARIANTS.primary.background};
  color: ${props => BUTTON_VARIANTS[props.variant]?.color || BUTTON_VARIANTS.primary.color};
  border: ${props => BUTTON_VARIANTS[props.variant]?.border || 'none'};
  
  /* Hover styles */
  &:hover:not(:disabled) {
    background: ${props => BUTTON_VARIANTS[props.variant]?.hoverBackground || BUTTON_VARIANTS.primary.hoverBackground};
    color: ${props => BUTTON_VARIANTS[props.variant]?.hoverColor || BUTTON_VARIANTS[props.variant]?.color};
    transform: translateY(-1px);
    box-shadow: 0 4px 8px ${Theme.shadow};
  }
  
  /* Active styles */
  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 4px ${Theme.shadow};
  }
  
  /* Disabled styles */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  /* Full width */
  ${props => props.fullWidth && `
    width: 100%;
  `}
`;

/**
 * Button Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button variant ('primary', 'secondary', 'danger', 'success', 'outline')
 * @param {string} props.size - Button size ('small', 'medium', 'large')
 * @param {boolean} props.loading - Whether button is in loading state
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {boolean} props.fullWidth - Whether button should take full width
 * @param {Function} props.onClick - Click handler
 * @param {string} props.type - Button type ('button', 'submit', 'reset')
 * @param {React.ReactNode} props.icon - Icon to display in button
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement} Button component
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  icon,
  className,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      className={className}
      {...rest}
    >
      {loading ? (
        <>
          <LoadingSpinner size="16px" />
          Đang xử lý...
        </>
      ) : (
        <>
          {icon && icon}
          {children}
        </>
      )}
    </StyledButton>
  );
};

export default Button;