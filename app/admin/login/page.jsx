"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";

import Form from "@components/admin/login/Form";

const LoginPage = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const { login } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Make a POST request to the backend API to obtain the JWT token
      const response = await fetch(`${URL}/api/users/login`, {
        method: "POST",
        body: JSON.stringify(loginCredentials),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming the token is returned in the 'token' field of the response
        const token = data.token;
        const userKey = data.userKey;
        const userId = data.userId;

        if (userKey === "Admin" || userKey === "Librarian" || userKey === "Accountant") {
          // Store the token in the context or state for authentication throughout the pages
          login(token, userKey, userId);

          // Book created successfully
          setSuccessMessage("You have successfully logged in!");

          // Redirect to the desired page after successful login
          router.push("/admin/admin-pages");
        } else {
          setErrorMessage(`You are unauthorized to log in as ${userKey}.`);
        }
      } else {
        const data = await response.json();
        // Handle login error, show appropriate error message
        setErrorMessage(`Login failed. ${data.message}`);
      }
    } catch (error) {
      // Handle network or other errors
      setErrorMessage(`An error occured during logged in. ${error.message}.`);
    }

    setSubmitting(false);
  };

  // Effect to automatically remove the success/error message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const successTimer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);

      return () => clearTimeout(successTimer);
    }

    if (errorMessage) {
      const errorTimer = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);

      return () => clearTimeout(errorTimer);
    }
  }, [successMessage, errorMessage]);

  return (
    <div>
      { successMessage && (
        <div className="bg-green-200 text-green-800 py-2 px-4 mb-4 rounded">
          { successMessage }
        </div>
      ) }
      { errorMessage && (
        <div className="bg-red-200 text-red-800 py-2 px-4 mb-4 rounded">
          { errorMessage }
        </div>
      ) }
      <Form
        type="LOGIN"
        login={ loginCredentials }
        setLogin={ setLoginCredentials }
        submitting={ submitting }
        handleSubmit={ handleLogin }
      />
    </div>
  );
};

export default LoginPage;
