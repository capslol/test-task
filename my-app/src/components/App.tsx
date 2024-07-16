import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    const registerUser = async () => {
      try {
        const response = await axios.post('http://localhost:1337/api/auth/local/register', {
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'password123',
        });
        console.log('User created:', response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    registerUser();
  }, []);

  return (
      <div className="App">
      </div>
  );
}

export default App;
