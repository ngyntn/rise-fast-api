# Development Guide - React Base Project

## 📁 Cấu trúc dự án chuẩn hóa

```
src/
├── apis/                 # API services
│   ├── authApi.js       # Authentication APIs
│   └── singleUserApi.js # User-related APIs
├── components/          # React components
│   ├── common/         # Reusable components
│   │   ├── Button.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ProtectedRoute.jsx
│   └── examples/       # Example components
│       └── UserProfileExample.jsx
├── config/             # Configuration files
│   └── constants.js    # Application constants
├── hooks/              # Custom React hooks
│   ├── useApi.js      # API handling hook
│   └── useAuth.js     # Authentication hook
├── stores/             # Redux store
│   ├── slices/        # Redux slices
│   │   ├── authSlice.js
│   │   └── userSlice.js
│   └── store.js       # Store configuration
├── utils/              # Utility functions
│   ├── apiClient.js   # HTTP client
│   ├── helpers.js     # Common helpers
│   ├── storage.js     # LocalStorage utilities
│   └── Theme.js       # Theme configuration
└── assets/             # Static assets
```

## 🎯 1. Component Standards

### Component Structure Template
```jsx
/**
 * Component Name
 * Brief description of what this component does
 */

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Theme } from '../../utils/Theme.js';

// Styled Components (nếu cần)
const Container = styled.div`
  // styles here
`;

/**
 * ComponentName
 * @param {Object} props - Component props
 * @param {string} props.title - Title prop
 * @returns {React.ReactElement} Component JSX
 */
const ComponentName = ({ title, ...props }) => {
  // 1. Redux hooks
  const dispatch = useDispatch();
  const data = useSelector(selectData);

  // 2. Local state
  const [localState, setLocalState] = useState(initialValue);

  // 3. Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // 4. Event handlers
  const handleClick = () => {
    // Handler logic
  };

  // 5. Render helpers (nếu cần)
  const renderContent = () => {
    // Render logic
  };

  // 6. Return JSX
  return (
    <Container>
      {/* Component content */}
    </Container>
  );
};

export default ComponentName;
```

### Naming Conventions
- **Components**: PascalCase (`UserProfile.jsx`)
- **Files**: camelCase (`userApi.js`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS`)
- **Functions**: camelCase (`getUserProfile`)
- **Variables**: camelCase (`userData`)

## 🔄 2. API Flow Standards

### API Client Usage
```javascript
// ✅ Correct way
import { apiClient } from '../utils/apiClient.js';
import { API_ENDPOINTS } from '../config/constants.js';

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.USERS.GET_PROFILE}/${userId}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

### Error Handling Pattern
```javascript
// API calls should always handle errors consistently
try {
  const result = await dispatch(apiAction(data)).unwrap();
  // Success handling
} catch (error) {
  // Error handling
  console.error('API Error:', error);
}
```

## 🏪 3. Redux Toolkit Standards

### Slice Structure Template
```javascript
import { createSlice } from "@reduxjs/toolkit";
import { COMPONENT_STATES } from "../../config/constants.js";

const initialState = {
  data: null,
  status: COMPONENT_STATES.IDLE,
  error: null,
  message: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    resetState: (state) => {
      state.status = COMPONENT_STATES.IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncAction.pending, (state) => {
        state.status = COMPONENT_STATES.LOADING;
        state.error = null;
      })
      .addCase(asyncAction.fulfilled, (state, { payload }) => {
        state.status = COMPONENT_STATES.SUCCESS;
        state.data = payload.data;
        state.message = payload.message;
      })
      .addCase(asyncAction.rejected, (state, { payload }) => {
        state.status = COMPONENT_STATES.ERROR;
        state.error = payload;
      });
  }
});

// Export actions
export const { resetState } = dataSlice.actions;

// Export selectors
export const selectData = (state) => state.data.data;
export const selectDataStatus = (state) => state.data.status;
export const selectDataError = (state) => state.data.error;

export default dataSlice.reducer;
```

## 🔐 4. Authentication & Protection

### Protected Route Usage
```jsx
import ProtectedRoute from '../components/common/ProtectedRoute.jsx';

// Wrap protected components
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

### useAuth Hook Usage
```jsx
import useAuth from '../hooks/useAuth.js';

const Component = () => {
  const { isAuthenticated, user, login, logout } = useAuth();
  
  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
    } catch (error) {
      // Handle login error
    }
  };
};
```

## 🛠️ 5. Utility Functions

### Common Helpers Usage
```javascript
import { 
  formatDate, 
  formatCurrency, 
  debounce, 
  isEmpty,
  isValidEmail 
} from '../utils/helpers.js';

// Format date
const formattedDate = formatDate(new Date(), 'long');

// Debounce search
const debouncedSearch = debounce((query) => {
  // Search logic
}, 300);

// Validate email
if (!isValidEmail(email)) {
  setError('Email không hợp lệ');
}
```

### Storage Utilities
```javascript
import { saveToStorage, getFromStorage, STORAGE_KEYS } from '../utils/storage.js';

// Save data
saveToStorage(STORAGE_KEYS.USER_PROFILE, userData);

// Get data
const userData = getFromStorage(STORAGE_KEYS.USER_PROFILE);
```

## 🌐 6. Environment Variables

### Configuration Management
```javascript
// constants.js
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
};

// Usage in components
import { API_CONFIG } from '../config/constants.js';
```

### Environment Files
- `.env.example` - Template file
- `.env` - Local development (git ignored)
- `.env.production` - Production environment

## 📝 Best Practices

### 1. Component Guidelines
- Một component chỉ làm một việc
- Props phải có type checking (PropTypes hoặc TypeScript)
- Sử dụng memo() cho components không cần re-render thường xuyên
- Tách logic phức tạp ra custom hooks

### 2. State Management
- Chỉ lưu global state những gì thực sự cần share
- Local state cho UI state đơn giản
- Sử dụng selectors để access Redux state

### 3. Performance
- Lazy load components khi cần thiết
- Debounce user inputs
- Memoize expensive calculations
- Optimize re-renders với useCallback, useMemo

### 4. Error Handling
- Luôn handle errors trong API calls
- Hiển thị error messages user-friendly
- Log errors cho debugging
- Fallback UI cho error states

### 5. Code Organization
- Import order: React → Third-party → Local
- Group related functions together
- Use absolute imports với alias
- Consistent file naming

## 🚀 Getting Started

1. Copy `.env.example` to `.env` và cập nhật values
2. Xem `UserProfileExample.jsx` để hiểu patterns
3. Sử dụng các utility functions trong `utils/`
4. Follow component structure template
5. Implement authentication với `useAuth` hook

## 📚 Examples

Xem folder `src/components/examples/` để có các ví dụ cụ thể về:
- Component structure
- Redux integration
- API calls
- Form handling
- Error handling
- Loading states