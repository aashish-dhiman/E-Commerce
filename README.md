# Flickart - MERN eCommerce Project (Flipkart Clone)

This is a Flipkart clone eCommerce project developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It's designed to demonstrate the functionality and features of a modern eCommerce website.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [Environment Variables](#environment-variables)

## Test Users

- **USER**
  - Email: test@test.com
  - Password: test123

- **ADMIN**
  - Email: store@flipkart.com
  - Password: admin123

## Features

- **User Authentication and Authorization:** Implemented user registration, login, and JWT-based authorization for secure access to user-specific data.
- **Product Catalog:** Display products with categories and provide a search functionality for users to find products easily.
- **Shopping Cart Management:** Allow users to add and remove products from their shopping carts, view cart contents, save later, and proceed to checkout.
- **Secure Payment Processing (Stripe Integration):** Implement Stripe payment gateway for secure and convenient online payments. Users can complete purchases using credit/debit cards.
- **User Order History and Order Management:** Store user order history and provide a user-friendly interface for order management, including order status and tracking.
- **Admin Panel for Product Management:** Admin users can manage product listings, categories, and view orders. Accessible via `/dashboard/admin` route (login required).
- **Responsive Design with Tailwind CSS and Material UI:** Utilize Tailwind CSS and Material UI for responsive and visually appealing user interfaces on both mobile and desktop devices.
- **Password Encryption using Bcrypt:** Securely store user passwords by hashing and salting them using the bcrypt library.
- **Image Storage with Cloudinary:** Store and manage product images using Cloudinary for efficient image storage and retrieval.

## Requirements

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB instance (local or remote)
- Stripe API key (for payment processing)
- Cloudinary account and API credentials

## Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/aashish-dhiman/E-Commerce.git
   cd E-Commerce
   ```

2. **Setup the Backend:**
   - Navigate to the backend directory:
     ```sh
     cd backend
     ```
   - Create a `.env` file and add your environment variables (see the example below).
   - Install the dependencies:
     ```sh
     npm install
     ```
   - Start the backend server:
     ```sh
     npm run dev
     ```

3. **Setup the Frontend:**
   - Navigate to the frontend directory:
     ```sh
     cd ../client
     ```
   - Create a `.env` file and add your environment variables (see the example below).
   - Install the dependencies:
     ```sh
     npm install
     ```
   - Start the frontend development server:
     ```sh
     npm run dev
     ```

4. **Access the Application:**
   - Visit `http://localhost:5173` in your browser to access the Flipkart clone.
   - You can access the admin panel at `http://localhost:5173/dashboard/admin` (login required).

## Environment Variables

### Backend (.env)

```plaintext
PORT=8080
MONGODB_URI=YOUR_MONGODB_BASE_URI/database_name
JWT_SECRET=RANDOM_STRING
CLOUD_NAME=CLOUDINARY_CLOUD_NAME
CLOUD_API_KEY=CLOUDINARY_API_KEY
CLOUD_SECRET=CLOUDINARY_SECRET_KEY
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
```

### Frontend (.env)

```plaintext
VITE_API=http://localhost:8080
VITE_STRIPE_PUBLISH_KEY=YOUR_STRIPE_PUBLISH_KEY
VITE_STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
VITE_SERVER_URL=SERVER_BASE_URL_WITHOUT_TRAILING_SLASH (in case you want deployed server url- https://e-commerce-mgtd.onrender.com without any / at end)
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve this project.
