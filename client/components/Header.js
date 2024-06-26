"use client";

import React from "react";
import Link from "next/link";
import axios from "axios";

const Header = ({ currentUser }) => {
  const handleSignout = async () => {
    await axios.post("api/users/signout");
  };
  return (
    <div className="flex justify-between p-4">
      <div>GitTix</div>
      <div>
        {currentUser ? (
          <h1 onClick={() => handleSignout()}>Sign out</h1>
        ) : (
          <div className="flex gap-4">
            <Link href="/signin">
              <h1>Sign in</h1>
            </Link>
            <Link href="/signup">
              <h1>Sign up</h1>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
