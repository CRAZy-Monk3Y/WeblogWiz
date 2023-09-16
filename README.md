# WeblogWiz - Full Stack Blog App

WeblogWiz is a full-stack blog application built with React on the frontend, Express.js on the backend, and MongoDB as the database. It features JWT-based authentication for user login and registration and utilizes Tailwind CSS for UI development.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Features

- User Authentication: Secure user registration and login using JWT.
- Create and Manage Posts: Users can create, edit, and delete their blog posts.
- Responsive UI: Utilizes Tailwind CSS for a mobile-first, responsive design.
- MongoDB Integration: Store and manage blog data in a MongoDB database.
- User Profile: Display user-specific information and posts.
- Comment System: Allow users to comment on blog posts.
- Search Functionality: Search for blog posts by keywords or tags.
- Pagination: Display a limited number of posts per page for better user experience.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- MongoDB: Install MongoDB and make sure it's running on your local machine or provide the connection details to a remote MongoDB instance.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/CRAZy-Monk3Y/WeblogWiz.git
   ```

2. Navigate to the project directory:

   ```bash
   cd weblogwiz
   ```

3. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

4. Configure the server:

   - Create a `.env` file in the server directory and add the following:

   ```env
   NODE_PORT= 4000
   NODE_MONGOOSE_URL= <Mongo db URL>
   NODE_FRONTEND_URL="http://localhost:5173"
   NODE_JWT_SECRET= <Random secret string>
   ```

5. Install client dependencies:

   ```bash
   cd ../client
   npm install
   ```

6. Start the server and client:

   ```bash
   # In the server directory
   npm start

   # In the client directory
   npm start
   ```

Your WeblogWiz app should now be running. You can access it at `http://localhost:5173`.

## Usage

- Register a new user or log in with existing credentials.
- Create, edit, and delete your blog posts.
- View and edit your user profile.
- Comment on blog posts.
- Use the search functionality to find specific blog posts.
- Enjoy the full-stack blog experience!

## Folder Structure

```
weblogwiz/
├── client/                  # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── ...
│
├── api/                  # Express.js backend
│   ├── models/
│   ├── uploads/
│   ├── package.json
│   ├── ...
│
├── .gitignore
├── README.md
├── LICENSE
```

## Contributing

Contributions are welcome! Feel free to open issues or pull requests to help improve WeblogWiz.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

WeblogWiz is created by Tathagata Chakraborty.

---

© 2023 Tathagata Chakraborty
