import React, {useEffect} from 'react';

function App() {

  useEffect(() => {
    fetch('http://localhost:1337/auth/local/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
      }),
    })
        .then(response => response.json())
        .then(data => {
          console.log('User created:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  }, [])

  return (
    <div className="App">
    </div>
  );
}

export default App;
