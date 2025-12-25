/**
 * Loading Spinner Component
 * Reusable loading indicator component
 */

import styled, { keyframes } from 'styled-components';
import { Theme } from '../../utils/Theme.js';

// Spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled components
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.padding || '20px'};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  height: ${props => props.fullHeight ? '100vh' : 'auto'};
`;

const Spinner = styled.div`
  border: 3px solid ${Theme.lightSoft};
  border-top: 3px solid ${Theme.highlight};
  border-radius: 50%;
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-left: 12px;
  color: ${Theme.text};
  font-size: 14px;
`;

/**
 * LoadingSpinner Component
 * @param {Object} props - Component props
 * @param {string} props.size - Size of the spinner (e.g., '20px', '40px')
 * @param {string} props.text - Loading text to display
 * @param {boolean} props.fullWidth - Whether to take full width
 * @param {boolean} props.fullHeight - Whether to take full height
 * @param {string} props.padding - Padding around the spinner
 * @returns {React.ReactElement} Loading spinner component
 */
const LoadingSpinner = ({ 
  size = '40px',
  text = '',
  fullWidth = false,
  fullHeight = false,
  padding = '20px'
}) => {
  return (
    <SpinnerContainer 
      fullWidth={fullWidth} 
      fullHeight={fullHeight}
      padding={padding}
    >
      <Spinner size={size} />
      {text && <LoadingText>{text}</LoadingText>}
    </SpinnerContainer>
  );
};

export default LoadingSpinner;