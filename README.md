# e-commerce-
# E-website
# Modern E-commerce Platform

A full-stack e-commerce platform built with React, TypeScript, and Express.js. This project demonstrates modern web development practices including real-time search, dynamic filtering, user authentication, and a seamless shopping experience.

## 🌟 Features

### Authentication & User Management
- Secure user registration and login system
- Session-based authentication
- Protected routes for authenticated users

### Product Management
- Real-time product search
- Advanced filtering by:
  - Category
  - Price range
  - Sorting options (price low-high, high-low)
- Responsive product grid layout
- Detailed product pages with images and descriptions

### Shopping Experience
- Intuitive shopping cart
- Real-time cart updates
- Quantity management
- Smooth animations
- Mock checkout process

### Reviews & Ratings
- Star rating system
- User reviews with comments
- Average rating calculation
- Date-stamped reviews

### UI/UX Features
- Responsive design for all devices
- Modern animations and transitions
- Loading states and error handling
- Toast notifications
- Clean and intuitive navigation

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **TanStack Query** for data fetching and cache management
- **wouter** for lightweight routing
- **Framer Motion** for smooth animations
- **shadcn/ui** for beautiful UI components
- **Tailwind CSS** for styling

### Backend
- **Express.js** server
- **Passport.js** for authentication
- **Session-based** auth with secure storage
- **In-memory storage** for rapid development

### API Integration
- **Platzi Fake Store API** for product data
- Custom endpoints for user management and reviews

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash

cd ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
SESSION_SECRET=rjsharad
```

4. Start the development server:
```bash
npm run dev
```

The application will be running at `http://localhost:5000`

## 📁 Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── pages/         # Application pages
├── server/
│   ├── auth.ts            # Authentication logic
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data storage
└── shared/                # Shared TypeScript types
```

## 🌐 API Documentation

### Authentication Endpoints
- `POST /api/register` - Create new user account
- `POST /api/login` - Log in existing user
- `POST /api/logout` - Log out current user
- `GET /api/user` - Get current user information

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/:id/reviews` - Get product reviews
- `POST /api/products/:id/reviews` - Add product review

## 🔒 Security Features

- Secure password hashing using scrypt
- Session-based authentication
- CSRF protection
- Input validation and sanitization
- Protected API endpoints

## 🚀 Deployment

This application is configured for deployment on Replit:

1. Fork this repository on Replit
2. Set up the required environment variables
3. Click "Run" to start the application

The application will be automatically built and served in production mode.

## 👥 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Update documentation as needed
- Add tests for new features

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Platzi Fake Store API](https://fakeapi.platzi.com/) for product data
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations

## 📱 Screenshots


![e website1](https://github.com/user-attachments/assets/15f11167-4a5b-4c49-a65b-db62963199c5)

![e website2](https://github.com/user-attachments/assets/17a13ca5-65ad-41d8-a90c-194039865056)

![e website3](https://github.com/user-attachments/assets/3f8a888a-e99d-48ca-93d4-6416775b08ad)








Made with sharad jugadar[patil]
