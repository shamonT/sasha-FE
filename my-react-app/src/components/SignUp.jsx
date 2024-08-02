// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const SignupPage = () => {
//   const navigate=useNavigate()
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phoneNo: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8000/user/sign-up', formData);
//       console.log('Form data submitted:', response);

//       if (response && response.data.code === 200) {
//         toast.success('Sign up successful!');
//         navigate('/')
//       } else {
//         toast.error(response.data.message || 'Sign up failed!');
//       }
//     } catch (error) {
//       console.error('Error during sign up:', error);
//       toast.error('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '100px' }}>
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
//             required
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
//             required
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="phoneNo" style={{ display: 'block', marginBottom: '5px' }}>Phone Number:</label>
//           <input
//             type="text"
//             id="phoneNo"
//             name="phoneNo"
//             value={formData.phoneNo}
//             onChange={handleChange}
//             style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
//             required
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
//             required
//           />
//         </div>
//         <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
//           Sign Up
//         </button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default SignupPage;



import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../AuthContext';

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/user/sign-up', formData);
      console.log('Form data submitted:', response);

      if (response && response.data.code === 200) {
        toast.success('Sign up successful!');
        login();
        navigate('/');
      } else {
        toast.error(response.data.message || 'Sign up failed!');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '100px' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="phoneNo" style={{ display: 'block', marginBottom: '5px' }}>Phone Number:</label>
          <input
            type="text"
            id="phoneNo"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Sign Up
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
