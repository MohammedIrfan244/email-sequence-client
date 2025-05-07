import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PiSignInBold } from "react-icons/pi";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: '',
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    username: Yup.string().min(3, 'Username must be at least 3 characters').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, setErrors }: import('formik').FormikHelpers<typeof initialValues>
  ) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, values);
      console.log(res.data);
      navigate('/login');
    } catch (err: unknown) {
      setErrors({ password: 'Registration failed. Please try again.' });
      console.error('Registration error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-cyan-200 to-white flex flex-col p-10 rounded-3xl shadow-md border border-gray-100 min-w-[300px] sm:min-w-[400px]">
      <div className="flex justify-center items-center mb-4">
        <div className="flex justify-center items-center p-2 shadow-md shadow-gray-400 w-12 h-12 bg-white rounded-xl">
          <PiSignInBold />
        </div>
      </div>
      <h2 className="text-black text-2xl font-bold text-center mb-6">Create an Account</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm text-gray-700 font-bold mb-1">Email</label>
              <Field
                type="email"
                name="email"
                className="w-full px-4 py-2 rounded-lg focus:outline-none border border-gray-200 bg-gray-100"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 font-bold mb-1">Username</label>
              <Field
                type="text"
                name="username"
                className="w-full px-4 py-2 rounded-lg focus:outline-none border border-gray-200 bg-gray-100"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 font-bold mb-1">Password</label>
              <div className="relative">
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="w-full px-4 py-2 rounded-lg focus:outline-none border border-gray-200 bg-gray-100"
                />
                <div
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </div>
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black shadow-2xl shadow-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
      <p className="text-sm mt-5 text-gray-600">
  Already have an account?{' '}
  <span onClick={()=>navigate("/login")} className="underline text-black cursor-pointer hover:text-gray-800">
    Login now
  </span>
</p>
    </div>
  );
};

export default RegisterForm;
