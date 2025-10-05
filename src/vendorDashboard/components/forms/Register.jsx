// import React, { useState } from 'react';
// import { API_URL } from '../../data/apiPath';
// import { ThreeCircles } from 'react-loader-spinner';

// const Register = ({ showLoginHandler }) => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false); // Set loading to false initially
//   const [showPassword, setShowPassword] = useState(false);

//   const handleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Set loading to true when the request starts
//     try {
//       const response = await fetch(`${API_URL}/vendor/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, email, password })
//       });

//       const data = await response.json();
//       if (response.ok) {
//         console.log(data);
//         setUsername("");
//         setEmail("");
//         setPassword("");
//         alert("Vendor registered successfully");
//         showLoginHandler();
//       } else {
//         setError(data.error);
//         alert("Registration Failed, Contact Admin")
//       }
//     } catch (error) {
//       console.error("Registration failed", error);
//       alert("Registration failed");
//     } finally {
//       setLoading(false); 
//     }
//   };

//   return (
//     <div className="registerSection">
//      {loading && 
//       <div className="loaderSection">
//       <ThreeCircles
//         visible={loading}
//         height={100}
//         width={100}
//         color="#4fa94d"
//         ariaLabel="three-circles-loading"
//         wrapperStyle={{}}
//         wrapperClass=""
//       />
//       <p>Hi, Your Registration under process</p>
//     </div>
//      }
// {!loading &&     <form className='authForm' onSubmit={handleSubmit} autoComplete='off'>

// <h3>Vendor Register</h3>
// <label>Username</label>
// <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='enter your name' /><br />
// <label>Email</label>
// <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email' /><br />
// <label>Password</label>
// <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} name='password' placeholder='enter your password' /><br />
// <span className='showPassword'
//   onClick={handleShowPassword}
// >{showPassword ? 'Hide' : 'Show'}</span>
// <div className="btnSubmit">
//   <button type='submit'>Submit</button>
// </div>
// </form>}
  
//     </div>
//   );
// };

// export default Register;

// 

import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const Register = ({ showLoginHandler }) => {
    // ✅ CORRECT LOCATION: Hooks must be the first statements inside the component
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Changed initial state to false

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when starting the submission

        try {
            const response = await fetch(`${API_URL}/vendor/register`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();
            setLoading(false); // Set loading to false after response

            if (response.ok) {
                console.log(data);
                setUsername("");
                setEmail("");
                setPassword("");
                alert("Vendor registered sucessfully");
                showLoginHandler()

            } else {
                setError(data.message || "Registration failed");
            }
        } catch (error) {
            setLoading(false); // Set loading to false on error
            setError("Registration failed due to a network error.");
            console.error("Registration failed", error);
        }
    }

    return (
        <div className="registerSection">
            <form className="authForm" onSubmit={handleSubmit}>
                <h3>Vendor Registration</h3>

                {/* Optional: Display error message */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                <label>Username</label>
                <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Choose a username'/><br />

                <label>Email</label>
                <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email'/><br />

                <label>Password</label>
                <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password'/><br />

                <div className="btnSubmit">
                    {/* Good practice: Disable button while loading */}
                    <button type='submit' disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Register;