# Product Management App

A modern, full-stack product management application built with Next.js, Redux Toolkit, MongoDB, and TypeScript. Features user authentication, product CRUD operations, and responsive design.
## Live Link : https://product-management-with-next-js-2ek.vercel.app/products
#### Login: mail: admin@gmail.com password: admin
## 🚀 Features

### 🔐 Authentication & User Management
- **User Registration**: Create account with name, email, and password
- **User Login**: Secure authentication with JWT tokens
- **Persistent Sessions**: Login state persists across page refreshes
- **Password Security**: Bcrypt hashing for secure password storage
- **User Attribution**: Track who created each product

### 📦 Product Management
- **Create Products**: Add new products with name, price, category, SKU, and description
- **View Products**: Beautiful, responsive product cards with hover effects
- **Edit Products**: Update product information (only for product owners)
- **Delete Products**: Remove products (only for product owners)
- **Search & Filter**: Real-time search across product names, categories, and SKUs
- **Pagination**: Efficient product listing with page navigation

### 🎨 User Interface & Experience
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Modern UI**: Clean, professional design with smooth animations
- **Dark Theme**: Beautiful dark color scheme with gradient accents
- **Toast Notifications**: Real-time feedback for all user actions
- **Loading States**: Smooth loading animations and skeleton screens
- **Error Handling**: User-friendly error messages and validation

### 🔒 Access Control & Security
- **User-Based Permissions**: Users can only edit/delete their own products
- **Server-Side Validation**: API endpoints validate user ownership
- **Secure Authentication**: JWT tokens with proper validation
- **Input Validation**: Client and server-side form validation

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Redux Toolkit**: State management with RTK Query
- **Tailwind CSS**: Utility-first CSS framework
- **Sonner**: Toast notifications
- **React Hook Form**: Form handling with validation
- **Zod**: Schema validation

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **MongoDB**: NoSQL database for data storage
- **JWT**: JSON Web Tokens for authentication
- **Bcryptjs**: Password hashing
- **MongoDB Driver**: Database connectivity

### Development Tools
- **ESLint**: Code linting and formatting
- **TypeScript**: Static type checking
- **Tailwind CSS**: Styling and responsive design

## 📱 Mobile Responsiveness

### Mobile Optimizations
- **Responsive Navbar**: Compact logo and icon-only buttons on mobile
- **Touch-Friendly**: Proper button sizes for mobile interaction
- **Flexible Layout**: Adapts to all screen sizes
- **Mobile-First Design**: Optimized for mobile devices

### Key Mobile Features
- **Compact Logo**: "PMA" instead of full app name on mobile
- **Icon Navigation**: Products (📦) and Logout (🚪) icons
- **User Avatar**: First letter of name in a circle
- **Responsive Cards**: Product cards adapt to screen size
- **Mobile Search**: Full-width search input with proper spacing

## 🎯 Key Features Implemented

### 1. Authentication System
- ✅ User registration with name, email, password
- ✅ Secure login with JWT tokens
- ✅ Persistent authentication across page refreshes
- ✅ Password hashing with bcrypt
- ✅ User session management

### 2. Product Management
- ✅ Create, read, update, delete products
- ✅ User-based access control (own products only)
- ✅ Real-time search functionality
- ✅ Pagination for large product lists
- ✅ Product ownership tracking

### 3. User Interface
- ✅ Responsive design for all devices
- ✅ Modern dark theme with gradients
- ✅ Smooth animations and transitions
- ✅ Toast notifications for user feedback
- ✅ Loading states and error handling

### 4. Mobile Optimization
- ✅ Responsive navbar with mobile-specific elements
- ✅ Touch-friendly button sizes
- ✅ Icon-based navigation on mobile
- ✅ Compact layout for small screens
- ✅ Proper spacing and typography

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd product-mgr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/product_mgr
   MONGODB_DB=product_mgr
   JWT_SECRET=your-secret-key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
product-mgr/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── products/      # Product CRUD endpoints
│   ├── login/             # Login page
│   ├── products/          # Product pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── NavBar.tsx         # Navigation bar
│   ├── Footer.tsx         # Footer component
│   ├── ProductForm.tsx    # Product form
│   └── RequireAuth.tsx    # Auth wrapper
├── lib/                   # Utility libraries
│   ├── jwt.ts            # JWT utilities
│   ├── mongo.ts          # MongoDB connection
│   └── validation.ts     # Zod schemas
├── store/                 # Redux store
│   ├── index.ts          # Store configuration
│   ├── slices/           # Redux slices
│   └── services/          # RTK Query services
└── public/               # Static assets
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth` - User login/registration
  - Body: `{ email, password, name?, action? }`
  - Returns: `{ token, name, email }`

### Products
- `GET /api/products` - List products with search and pagination
- `POST /api/products` - Create new product
- `GET /api/products/[id]` - Get product by ID
- `PUT /api/products/[id]` - Update product (owner only)
- `DELETE /api/products/[id]` - Delete product (owner only)

## 🎨 Design System

### Color Palette
- **Background**: Dark blue (`#13212F`)
- **Surface**: Darker blue (`#1B2C3D`)
- **Accent**: Green (`#4E6E5D`)
- **Warning**: Orange (`#AD8A64`)
- **Danger**: Red (`#A44A3F`)
- **Text**: Light gray (`#EFF1F3`)

### Typography
- **Font**: Inter, system fonts
- **Sizes**: Responsive text sizing
- **Weights**: Regular, medium, semibold, bold

### Components
- **Buttons**: Multiple variants (primary, secondary, danger)
- **Cards**: Rounded corners with shadows
- **Forms**: Consistent input styling
- **Navigation**: Responsive navbar with mobile optimization

## 📱 Mobile Features

### Responsive Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 768px (md)
- **Desktop**: > 768px (lg)

### Mobile-Specific Features
- **Compact Logo**: "PMA" abbreviation
- **Icon Navigation**: Emoji and SVG icons
- **Touch Targets**: Minimum 44px touch targets
- **Flexible Layout**: Adapts to screen orientation
- **Optimized Typography**: Readable text sizes

## 🔒 Security Features

### Authentication Security
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: Bcrypt with salt rounds
- **Session Persistence**: LocalStorage for client-side persistence
- **Token Validation**: Server-side token verification

### Access Control
- **Product Ownership**: Users can only modify their own products
- **API Protection**: Server-side ownership validation
- **Input Validation**: Client and server-side validation
- **Error Handling**: Secure error messages

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `MONGODB_DB`: Database name
- `JWT_SECRET`: Secret key for JWT signing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**ASIF** - Full Stack Developer

---

## 🎯 Recent Fixes & Improvements

### Mobile Responsiveness
- ✅ Fixed navbar responsiveness for mobile devices
- ✅ Added proper mobile logout button with SVG icon
- ✅ Implemented touch-friendly button sizes
- ✅ Optimized layout for small screens

### User Experience
- ✅ Added toast notifications for all actions
- ✅ Implemented smooth loading states
- ✅ Created beautiful product view pages
- ✅ Added user-based access control

### Design Improvements
- ✅ Modern dark theme with gradients
- ✅ Consistent spacing and typography
- ✅ Responsive card layouts
- ✅ Professional color scheme

### Security Enhancements
- ✅ User-based product ownership
- ✅ Server-side access validation
- ✅ Secure password hashing
- ✅ JWT token authentication

This Product Management App provides a complete, modern solution for managing products with user authentication, responsive design, and secure access control.