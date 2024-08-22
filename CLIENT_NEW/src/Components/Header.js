// Header.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Utils/AuthContext";

const Header = () => {
  const { signOut, currentUser } = useAuth();
  console.log(currentUser);

  return (
    <header className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">MyApp</div>
        <nav className="flex space-x-4">
          {currentUser ? (
            <>
              <Link
                to="/tickets"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Tickets
              </Link>
              <Link
                to="/orders"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Orders
              </Link>
              <button
                onClick={signOut}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="sign-up"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sign Up
              </Link>
              <Link
                to="sign-in"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
