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

### Backend Testing
```bash
cd Backend
pnpm test
```

### Frontend Testing
```bash
cd React-TS-BoilerPlate
pnpm test
```

## 📁 Project Structure

### Backend
```
Backend/
├── src/
│   ├── controllers/     # Business logic
│   ├── routes/         # API endpoints
│   ├── models/         # Database schemas
│   ├── middlewares/    # Auth & validation
│   ├── utils/          # Helper functions
│   ├── validations/    # Input validation
│   └── config/         # Configuration files
```

### Frontend
```
React-TS-BoilerPlate/
├── src/
    ├── components/     # Reusable UI components
    ├── pages/         # Route components
    ├── hooks/         # Custom React hooks
    ├── utils/         # Helper functions
    ├── types/         # TypeScript definitions
    ├── validation/    # Form validation
    └── tests/         # Unit tests
```

## 🔒 Security Features

- JWT-based authentication
- Role-based access control (Admin, Organization, User)
- Secure password handling
- Protected routes
- Input validation and sanitization
- TypeScript type safety

## 🚦 Development Workflow

1. Code Quality
   - ESLint for code linting
   - Prettier for code formatting
   - TypeScript strict mode
   - Husky for pre-commit hooks

2. Version Control
   - Conventional commit messages
   - Branch management
   - Pull request workflow

3. Development
   - Hot reload for development
   - Environment-specific configurations
   - Docker support for containerization

## 🏗️ Build and Deployment

### Backend
```bash
cd Backend
pnpm build
pnpm start
```

### Frontend
```bash
cd React-TS-BoilerPlate
pnpm build
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
