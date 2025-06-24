import React, { useContext, useState } from 'react';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {
  const [currState, setCurrState] = useState('Sign up'); // or 'Login'
  const [step, setStep] = useState(1); // Step 1: name/email/password, Step 2: bio
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');

  const { login } = useContext(AuthContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Step 1 complete: go to bio input
    if (currState === 'Sign up' && step === 1) {
      setStep(2);
      return;
    }

    // Form final submission
    const route = currState === 'Sign up' ? 'signup' : 'login';

    const payload = {
      fullName,
      email,
      password,
      bio,
    };

    try {
      await login(route, payload);
      // redirect or show success handled in AuthContext
    } catch (err) {
      console.error('Login/Signup failed:', err);
    }
  };

  const switchMode = () => {
    setCurrState((prev) => (prev === 'Sign up' ? 'Login' : 'Sign up'));
    setStep(1); // Reset to first step
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* Logo */}
      <img src={assets.logo_big} alt="Logo" className="w-[min(30vw,250px)]" />

      {/* Form */}
      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg min-w-[300px]"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          {currState === 'Sign up' && step === 2 && (
            <img
              onClick={() => setStep(1)}
              src={assets.arrow_icon}
              alt="Back"
              className="w-5 cursor-pointer"
            />
          )}
        </h2>

        {/* Inputs */}
        {currState === 'Sign up' && step === 1 && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            placeholder="Full Name"
            required
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
          />
        )}

        {(currState === 'Login' || step === 1) && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none"
            />
          </>
        )}

        {currState === 'Sign up' && step === 2 && (
          <textarea
            rows={4}
            placeholder="Provide a short bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
          ></textarea>
        )}

        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
        >
          {currState === 'Sign up'
            ? step === 1
              ? 'Next'
              : 'Create Account'
            : 'Login Now'}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <input type="checkbox" required />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className="text-sm text-gray-400">
          {currState === 'Sign up' ? (
            <p>
              Already have an account?{' '}
              <span
                onClick={switchMode}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create an account?{' '}
              <span
                onClick={switchMode}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
















// import React, { useContext } from 'react';
// import { useState } from 'react';
// import assets from '../assets/assets';
// import { AuthContext } from '../../context/AuthContext';

// const LoginPage = () => {

//   const [currState, setCurrState] = useState('Sign up');
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [bio, setBio] = useState('');
//   const [isDataSubmitted, setIsDataSubmitted] = useState(false);

//   const {login} = useContext(AuthContext);
  
//   const onSubmitHandler = (event) => {
//     event.preventDefault();

//     if (currState === 'Sign up' && !isDataSubmitted) {
//       setIsDataSubmitted(true);
//       return;
//     } 
//     login(currState === "Sign up" ? "signup" : "login", {fullName, email, password, bio})
//   }


//   return (
//     <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
//       {/* left  */}
//       <img src={assets.logo_big} alt='' className='w-[min(30vw,250px)]' />

//       {/* right */}

//       <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
//         <h2 className='font-medium text-2xl flex justify-between items-center'>
//           {currState}
//           {isDataSubmitted &&
//           <img onClick={() => setIsDataSubmitted(false)} src={assets.arrow_icon} alt='' className='w-5 cursor-pointer' />
//           }
//         </h2>
//         {currState === 'Sign up' && !isDataSubmitted && (
//           <input onChange={(e) => setFullName(e.target.value)} type='text' className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' value={fullName} required />
//         )}

//         {
//           !isDataSubmitted && (
//             <>
//               <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder='Email Address' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />
//               <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='Password' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />
//             </>
//           )
//         }

//         {
//           currState === 'Sign up' && isDataSubmitted && (
//             <textarea rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder="provide a short bio..." onChange={(e) => setBio(e.target.value)} value={bio} required></textarea>
//           )
//         }
//         <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
//           {currState === 'Sign up' ? "Create Account" : "Login Now"}
//         </button>

//         <div className='flex items-center gap-2 text-sm text-gray-500'>
//           <input type='checkbox' />
//           <p>Agree to the terms of use & privacy policy.</p>
//         </div>

//         <div className='flex flex-col gap-2'>
//           {currState === 'Sign up' ? (
//             <p className='text-sm text-gray-600'>Already have an account? <span onClick={() => {setCurrState("Login"); setIsDataSubmitted(false)}} className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>
//           ) : (
//             <p className='text-sm text-gray-600'>Create an account <span onClick={() => setCurrState("Sign up")} className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>
//           )}
//         </div>

//       </form>


//     </div>
//   );
// }

// export default LoginPage;