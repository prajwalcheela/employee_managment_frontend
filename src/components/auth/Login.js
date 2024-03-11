
import './Login.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()


  const handleLogin = async () => {
    console.log(password)
    console.log(username)
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login',{
        f_userName:username,
        f_pwd:password
    });
      if (response.data.accessToken) {
        console.log(response.data.accessToken)
        localStorage.setItem('userName', username);
        localStorage.setItem('token', response.data.accessToken)
        navigate('/home')
      } else {
        alert('Invalid login credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='log'>
      <h2>Login Page</h2>
      <input className='d-block' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /> <br/>
      <input className='d-block' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />  <br/>
      <button onClick={handleLogin}>Login</button>
    </div>

  
  );
}

export default Login;