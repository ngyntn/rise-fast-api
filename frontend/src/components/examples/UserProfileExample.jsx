/**
 * User Profile Example Component
 * Example component demonstrating best practices for:
 * - Component structure and organization
 * - State management with Redux
 * - API calls with custom hooks
 * - Loading states and error handling
 * - Styled components usage
 */

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Theme } from '../../utils/Theme.js';
import { 
  getUserProfile, 
  updateUserProfile 
} from '../../apis/singleUserApi.js';
import {
  selectUser,
  selectUserStatus,
  selectUserError,
  selectIsUserLoading,
  resetUserState
} from '../../stores/slices/userSlice.js';
import { COMPONENT_STATES } from '../../config/constants.js';
import Button from '../common/Button.jsx';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import { formatDate, isValidEmail } from '../../utils/helpers.js';

// Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  background: ${Theme.header};
  border-radius: 8px;
  box-shadow: 0 2px 8px ${Theme.shadow};
`;

const Title = styled.h2`
  color: ${Theme.text};
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: ${Theme.text};
  font-weight: 500;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid ${Theme.border};
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${Theme.highlight};
  }
  
  &:disabled {
    background: ${Theme.lightSoft};
    cursor: not-allowed;
  }
  
  ${props => props.error && `
    border-color: ${Theme.hotRed};
  `}
`;

const ErrorMessage = styled.span`
  color: ${Theme.hotRed};
  font-size: 12px;
  margin-top: 4px;
`;

const SuccessMessage = styled.div`
  background: ${Theme.success};
  color: white;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

/**
 * UserProfileExample Component
 * Demonstrates proper component structure and patterns
 */
const UserProfileExample = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const status = useSelector(selectUserStatus);
  const error = useSelector(selectUserError);
  const isLoading = useSelector(selectIsUserLoading);

  // Local state for form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  /**
   * Load user profile on component mount
   */
  useEffect(() => {
    dispatch(getUserProfile());
    
    // Cleanup function
    return () => {
      dispatch(resetUserState());
    };
  }, [dispatch]);

  /**
   * Update form data when user data changes
   */
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  /**
   * Show success message when update succeeds
   */
  useEffect(() => {
    if (status === COMPONENT_STATES.SUCCESS) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  /**
   * Handle input changes
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Validate form data
   * @returns {boolean} True if form is valid
   */
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Tên không được để trống';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email không được để trống';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Email không hợp lệ';
    }
    
    if (formData.phone && !isValidPhone(formData.phone)) {
      errors.phone = 'Số điện thoại không hợp lệ';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await dispatch(updateUserProfile(formData)).unwrap();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  /**
   * Handle form reset
   */
  const handleReset = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
    setFormErrors({});
  };

  // Loading state
  if (status === COMPONENT_STATES.LOADING && !user) {
    return (
      <Container>
        <LoadingSpinner 
          text="Đang tải thông tin người dùng..." 
          fullWidth 
        />
      </Container>
    );
  }

  // Error state
  if (status === COMPONENT_STATES.ERROR && !user) {
    return (
      <Container>
        <Title>Lỗi</Title>
        <ErrorMessage>{error}</ErrorMessage>
        <Button 
          onClick={() => dispatch(getUserProfile())}
          variant="primary"
        >
          Thử lại
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Thông tin cá nhân</Title>
      
      {showSuccess && (
        <SuccessMessage>
          Cập nhật thông tin thành công!
        </SuccessMessage>
      )}
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Họ và tên *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            error={!!formErrors.name}
            placeholder="Nhập họ và tên"
          />
          {formErrors.name && (
            <ErrorMessage>{formErrors.name}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!formErrors.email}
            placeholder="Nhập địa chỉ email"
          />
          {formErrors.email && (
            <ErrorMessage>{formErrors.email}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            error={!!formErrors.phone}
            placeholder="Nhập số điện thoại"
          />
          {formErrors.phone && (
            <ErrorMessage>{formErrors.phone}</ErrorMessage>
          )}
        </FormGroup>

        {user?.createdAt && (
          <FormGroup>
            <Label>Ngày tạo tài khoản</Label>
            <Input
              value={formatDate(user.createdAt, 'long')}
              disabled
            />
          </FormGroup>
        )}

        <ButtonGroup>
          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            disabled={isLoading}
          >
            Cập nhật
          </Button>
          
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            disabled={isLoading}
          >
            Đặt lại
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default UserProfileExample;