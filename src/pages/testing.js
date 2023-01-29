import { useState, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
    username: "",
    password: "",
    email: "",
  });

  // Update specific input field
  const handleChange = (e) =>{
    setUser(prevState => ({...prevState, [e.target.name]: e.target.value}))
    console.log(user.firstName);
  }
    

  // Render UI
  return (
    <div className='App'>
      <form>
        <input type='text' onChange={handleChange} name='firstName' placeholder='First Name' />
        <input type='text' onChange={handleChange} name='lastName' placeholder='Last Name' />
        <input type='number' onChange={handleChange} name='age' placeholder='Age' />
        <input type='text' onChange={handleChange} name='username' placeholder='Username' />
        <input type='password' onChange={handleChange} name='password' placeholder='Password' />
        <input type='email' onChange={handleChange} name='email' placeholder='email' />
      </form>
    </div>
  );
}