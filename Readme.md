# VeriCert - Digital Certificate Management System

VeriCert is a modern web application for managing digital certificates, built with TypeScript using React for the frontend and Express.js for the backend. The system enables secure certificate generation, verification, and distribution with QR code integration.

## 🚀 Features

- **Certificate Management**
  - Create and store digital certificates
  - Generate unique QR codes for verification
  - Batch processing capabilities
  - Template-based certificate generation

- **Email Integration**
  - Automated certificate distribution
  - QR code attachments
  - Customizable email templates

- **Security**
  - JWT-based authentication
  - Role-based access control
  - Secure certificate verification

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- React Router for navigation

### Backend
- Node.js with Express
- TypeScript
- MongoDB for data storage
- JWT authentication
- QR code generation
- Email service integration

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- pnpm (recommended) or npm

### Backend Setup
```bash
cd Backend
pnpm install
cp .env.example .env  # Configure your environment variables
pnpm run dev
```

### Frontend Setup
```bash
cd React-TS-BoilerPlate
pnpm install
pnpm run dev
```

## 🔑 Environment Variables

### Backend (.env)
```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

## 🌐 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### Issuer Operations
- `PUT /issuer/profile` - Update issuer profile
- `POST /issuer/certificates` - Store new certificates
- `GET /issuer/certificates/:id` - Get certificate by ID
- `GET /issuer/certificates/:id/qr` - Generate QR code and send certificate
- `POST /issuer/certificates/send-batch` - Send batch certificates

### Public Routes
- `GET /public/verify-certificate/:id` - Verify certificate authenticity

### User Management
- `GET /api/users/admin` - Admin-only access
- `GET /api/users/organization` - Organization access
- `GET /api/users/user` - General user access

## 🧪 Testing

The project includes comprehensive testing covering units, integrations, and validations.

### Test Structure
```
tests/
├── unit/           # Unit tests for individual components
├── integration/    # API and service integration tests
├── validations/    # Input validation tests
├── utils/          # Utility function tests
└── fixtures/       # Test data and mock objects
```

### Running Tests
```bash
cd Backend
pnpm test                 # Run all tests
pnpm test:unit           # Run unit tests only
pnpm test:integration    # Run integration tests only
pnpm test:coverage       # Generate coverage report
```

### Frontend Testing
```bash
cd React-TS-BoilerPlate
pnpm test                # Run all tests
pnpm test:watch         # Run tests in watch mode
pnpm test:coverage      # Generate coverage report
```

### Test Coverage

#### 1. Authentication Tests
- User Registration
  - ✅ Valid registration with complete data
    - Input: {username: "john_doe", email: "john@example.com", password: "Pass123!", role: "user"}
    - Output: User object with 201 status
  - ❌ Invalid registration with duplicate email
    - Input: Existing email
    - Output: 400 status with duplicate error
  - ❌ Invalid registration with weak password
    - Input: Password without special chars/numbers
    - Output: 400 status with password requirements
  - ❌ Invalid registration with missing fields
    - Input: Missing required fields
    - Output: 400 status with field requirements

- User Login
  - ✅ Valid login with correct credentials
    - Input: {email: "john@example.com", password: "Pass123!"}
    - Output: JWT token and user details
  - ❌ Invalid login attempts
    - Input: Wrong password (3 attempts)
    - Output: Account temporary lock

#### 2. Certificate Management Tests
- Certificate Creation
  - ✅ Single Certificate
    - Input: {templateId: "temp1", name: "John Doe", course: "Web Dev"}
    - Output: Certificate with QR code
  - ✅ Batch Certificates
    - Input: Array of certificate data
    - Output: Success count and failure details
  - ❌ Validation Failures
    - Missing template
    - Invalid recipient email
    - Duplicate certificate ID

- Certificate Verification
  - ✅ Public Access
    - Input: Valid certificate ID
    - Output: Certificate details with verification status
  - ✅ QR Code Scanning
    - Input: QR code scan
    - Output: Verification page with certificate
  - ❌ Security Checks
    - Tampered certificate data
    - Expired certificates
    - Invalid QR codes

#### 3. Email Service Tests
- Email Delivery
  - ✅ Single Email
    - Input: Certificate with recipient email
    - Output: Delivery confirmation
  - ✅ Batch Emails
    - Input: Multiple certificates
    - Output: Success/failure report
  - ❌ Error Handling
    - Invalid email format
    - SMTP server issues
    - Attachment size limits

#### 4. Input Validation Tests
- Schema Validation
  - ✅ User Data
    - Username: 3-30 chars, alphanumeric
    - Email: Valid format
    - Password: Min 8 chars, mixed case, numbers
  - ✅ Certificate Data
    - Required fields
    - Date formats
    - File size limits
  - ❌ Edge Cases
    - Special characters
    - Empty strings
    - Whitespace handling

#### 5. Security Tests
- Authentication
  - ✅ Token Validation
    - Valid JWT format
    - Expiration check
    - Signature verification
  - ❌ Security Breaches
    - Expired tokens
    - Invalid signatures
    - Token tampering

- Authorization
  - ✅ Role Permissions
    - Admin access
    - Organization access
    - User access
  - ❌ Access Control
    - Unauthorized routes
    - Cross-role access attempts

## 📚 API Documentation

### Authentication API
- POST `/auth/register`
  ```
  Request:
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "admin|organization|user"
  }
  Response:
  {
    "user": {user_object},
    "token": "JWT_token"
  }
  ```

- POST `/auth/login`
  ```
  Request:
  {
    "email": "string",
    "password": "string"
  }
  Response:
  {
    "token": "JWT_token",
    "user": {user_details}
  }
  ```

### Certificate API
- POST `/issuer/certificates`
  ```
  Request:
  {
    "templateId": "string",
    "certificates": [{
      "name": "string",
      "email": "string",
      "course": "string",
      "date": "string"
    }]
  }
  Response:
  {
    "success": true,
    "certificates": [array_of_certificates]
  }
  ```

- GET `/issuer/certificates/:id/qr`
  ```
  Response:
  {
    "certificateId": "string",
    "qrCode": "base64_string",
    "verificationUrl": "string"
  }
  ```

### Public API
- GET `/public/verify-certificate/:id`
  ```
  Response:
  {
    "verified": boolean,
    "certificate": {
      "id": "string",
      "recipient": "string",
      "course": "string",
      "issueDate": "string",
      "issuer": "string"
    }
  }
  ```

### Error Responses
```
400 Bad Request:
{
  "error": "Validation error",
  "details": [validation_errors]
}

401 Unauthorized:
{
  "error": "Authentication required"
}

403 Forbidden:
{
  "error": "Insufficient permissions"
}

404 Not Found:
{
  "error": "Resource not found"
}

500 Server Error:
{
  "error": "Internal server error",
  "message": "Error details"
}
```

## 📁 Project Structure

### Backend
```
```

## 📱 Frontend Structure

### Pages
```
src/pages/
├── Authentication
│   ├── LoginPage.tsx        # User login interface
│   └── SignupPage.tsx       # New user registration
├── Dashboard
│   ├── UserDashboard.tsx    # Regular user dashboard
│   └── IssuerDashboard.tsx  # Certificate issuer dashboard
├── Certificate Management
│   ├── IssuerCertificates.tsx    # Certificate listing and management
│   ├── CertificateSettings.tsx   # Certificate template settings
│   └── IssuerApprovals.tsx       # Certificate approval workflow
├── User Management
│   ├── Profile.tsx              # User profile management
│   ├── IssuerProfile.tsx        # Issuer profile settings
│   └── Settings.tsx             # Application settings
└── Analytics
    ├── Analytics.tsx            # Usage statistics and reports
    └── Notifications.tsx        # System notifications
```

### Components
```
src/components/
├── Certificate
│   ├── VerifyCertificate.tsx    # Certificate verification widget
│   ├── CertificateDetails.tsx   # Certificate display component
│   └── certificate-editor/       # Certificate template editor
└── ui/                          # Reusable UI components
```

### Features by Role

#### Public Access
- Certificate verification through QR code
- View certificate details
- User registration
- Login interface

#### Regular User
- View received certificates
- Download certificates
- Share certificates
- Profile management
- Notification preferences

#### Certificate Issuer
- Create certificate templates
- Issue single/batch certificates
- Manage issued certificates
- View analytics
- Approval workflows
- Profile management

#### Administrator
- User management
- System settings
- Analytics dashboard
- Template management
- Role management

### UI Components

#### Certificate Management
- Certificate Template Editor
  - Drag-and-drop interface
  - Dynamic field configuration
  - Preview functionality
  - Template versioning

- Certificate Verification
  - QR code scanner
  - Public verification page
  - Certificate authenticity check
  - Download options

#### User Interface
- Responsive Dashboard
  - Activity summary
  - Recent certificates
  - Quick actions
  - Statistics overview

- Profile Management
  - Profile information editor
  - Security settings
  - Notification preferences
  - API key management

### Frontend Libraries
```json
{
  "dependencies": {
    "@headlessui/react": "Latest",     // Accessible UI components
    "@heroicons/react": "Latest",      // Icon set
    "react-query": "Latest",           // Data fetching
    "tailwindcss": "Latest",           // Styling
    "zod": "Latest",                   // Form validation
    "react-hook-form": "Latest",       // Form handling
    "qrcode.react": "Latest",          // QR code generation
    "react-router-dom": "Latest"       // Routing
  }
}
```

### State Management

#### Global State
```typescript
// Using Jotai for atomic state management
src/store/
├── authAtom.ts          # Authentication state
└── profileAtoms.ts      # User profile state
```

- **Authentication State**
  - User session management
  - JWT token handling
  - Role-based access control
  - Login/logout state

- **Profile State**
  - User information
  - Preferences
  - Settings
  - Notifications

#### Local State Management
- React Query for server state
  - Certificate data caching
  - Optimistic updates
  - Background refetching
  - Error handling

- React Hook Form for form state
  - Form validation
  - Error handling
  - Field management
  - Form submission

### Frontend Testing Strategy

#### Unit Tests
- Component Testing
  ```bash
  # Run component tests
  pnpm test:components
  ```
  - Render testing
  - Event handling
  - State changes
  - Props validation

- Hook Testing
  ```bash
  # Run hook tests
  pnpm test:hooks
  ```
  - Custom hooks
  - State management
  - Side effects
  - Error scenarios

#### Integration Tests
```bash
# Run integration tests
pnpm test:integration
```
- User flows
- API integration
- State management
- Route transitions

#### E2E Testing
```bash
# Run E2E tests
pnpm test:e2e
```
- User journeys
- Cross-browser testing
- Performance testing
- Security testing

### UI/UX Design Principles

#### Design System
- **Colors**
  ```css
  --primary: #2563eb;    /* Blue */
  --secondary: #4f46e5;  /* Indigo */
  --accent: #0ea5e9;     /* Sky */
  --success: #22c55e;    /* Green */
  --warning: #eab308;    /* Yellow */
  --error: #ef4444;      /* Red */
  ```

- **Typography**
  ```css
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  ```

- **Spacing**
  ```css
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
  ```

#### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Color contrast ratios
- Focus management

#### Responsive Design
- Mobile-first approach
- Breakpoints:
  ```css
  sm: '640px'
  md: '768px'
  lg: '1024px'
  xl: '1280px'
  2xl: '1536px'
  ```

#### Performance Optimization
- Code splitting
- Lazy loading
- Image optimization
- Bundle size monitoring
- Performance metrics tracking

### Development Guidelines

#### Component Structure
```typescript
// Component template
import React from 'react';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';

interface Props {
  // Props interface
}

export const Component: React.FC<Props> = ({ ...props }) => {
  // Component logic
  return (
    // JSX
  );
};
```

#### State Management Rules
1. Use Jotai for global state
2. React Query for server state
3. Local state for component-specific data
4. Context for theme/localization

#### Code Quality
- ESLint rules
- Prettier configuration
- TypeScript strict mode
- Unit test coverage > 80%

#### Performance Guidelines
1. Memoization for expensive calculations
2. Virtual scrolling for long lists
3. Image lazy loading
4. Route-based code splitting
