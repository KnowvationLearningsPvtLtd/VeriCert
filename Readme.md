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

### Backend Test Structure
```
tests/
├── unit/           # Unit tests for individual components
├── integration/    # API and service integration tests
├── validations/    # Input validation tests
├── utils/          # Utility function tests
└── fixtures/       # Test data and mock objects
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
