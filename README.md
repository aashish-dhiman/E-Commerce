
# Flipkart Clone - MERN eCommerce Project

This is a Flipkart clone eCommerce project developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It's designed to demonstrate the functionality and features of a modern eCommerce website. 

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)

## Test Users

-> USER
   - test@test.com
   - test123

-> ADMIN
   - store@flipkart.com
   - admin123

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


3. Visit `http://localhost:3000` in your browser to access the Flipkart clone.

4. You can access the admin panel at `http://localhost:3000/dashboard/admin` (login required).

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve this project.
