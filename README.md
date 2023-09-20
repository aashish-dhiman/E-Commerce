
# Flipkart Clone - MERN eCommerce Project

This is a Flipkart clone eCommerce project developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It's designed to demonstrate the functionality and features of a modern eCommerce website. 

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- **User Authentication and Authorization:** Implement user registration, login, and JWT-based authorization for secure access to user-specific data.

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

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/e-commerce.git
   ```

2. Navigate to the project directory:

   ```bash
   cd e-commerce
   ```

3. Install server dependencies:

   ```bash
   npm install
   ```

4. Navigate to the client directory:

   ```bash
   cd client
   ```

5. Install client dependencies:

   ```bash
   npm install
   ```

6. Create a `.env` file in the project root and add your environment variables:

   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   STRIPE_API_KEY=your_stripe_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

7. Return to the project root:

   ```bash
   cd ..
   ```

## Usage

1. Start the server:

   ```bash
   npm run server
   ```

2. Start the client:

   ```bash
   npm run client
   ```

3. Visit `http://localhost:3000` in your browser to access the Flipkart clone.

4. You can access the admin panel at `http://localhost:3000/dashboard/admin` (login required).

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve this project.
