# RoomVista - Airbnb Clone

RoomVista is a full-stack web application that mimics the core functionality of Airbnb. It allows users to create, manage, buy, and rate hotel listings. Users can sign up, log in, view detailed hotel listings, and leave ratings and reviews. Additionally, users can view the location of each hotel on an interactive map. The application uses **Passport.js** for user authentication and **EJS** for dynamic front-end rendering.

## **Key Features**

- **User Authentication**:
  - Sign up and log in to access your personal account using **Passport.js** for secure authentication.
  - Manage your session using JWT (JSON Web Tokens).
  
- **Hotel Listings**:
  - **Create**, **update**, and **delete** hotel listings.
  - **Browse** and **search** for listings based on location, price, and amenities.
  - **View detailed information** about each listing, including its name, price, description, and amenities.

- **Ratings and Reviews**:
  - Rate hotel listings based on your experience.
  - Leave detailed reviews for each listing.

- **Hotel Purchase**:
  - Users can "buy" available hotel listings (simulated feature).

- **Interactive Map**:
  - View hotel locations on an interactive map integrated with **Google Maps API** (or another mapping service).
  - See the precise location of hotels and get directions.

- **User Dashboard**:
  - View and manage your created listings, ratings, and other account details.

## **Tech Stack**

- **Frontend**:
  - HTML5, CSS3, JavaScript
  - **EJS** (Embedded JavaScript) for dynamic server-side rendering.
  - **Leaflet.js** or **Google Maps API** for displaying interactive maps.

- **Backend**:
  - **Node.js** and **Express.js** for server-side logic and routing.
  - **MongoDB** for data storage.
  - **Mongoose** for MongoDB object modeling.
  
- **Authentication**:
  - **Passport.js** for implementing secure user authentication with various strategies.

- **Mapping**:
  - **Leaflet.js** (or **Google Maps API**) for integrating maps and displaying hotel locations.

- **Version Control**:
  - Git and GitHub for version control.

## **Installation**

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/roomvista.git
