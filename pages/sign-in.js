import Link from 'next/link';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useAuth } from 'context/AuthContext';
import withAuth from 'hocs/withAuth';
import { useEffect } from 'react';
const config = [
  {
    label: 'Email',
    type: 'email',
    name: 'email',
    placeholder: 'Enter your email',
  },

  {
    label: 'Password',
    type: 'password',
    name: 'password',
    placeholder: 'Password',
  },
];

const schema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter an email'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
});

function SignUpPage() {
  const { login, errors, logout, isAuthenticated } = useAuth();
  const handleAuth = (values) => login(values.email, values.password);

  return (
    <section className='w-full bg-white h-full'>
      <div className='mx-auto h-full'>
        <div className='flex flex-col h-full lg:flex-row'>
          <div className='hidden sm:block relative w-full bg-cover lg:w-6/12 xl:w-7/12 bg-gradient-to-r from-white via-white to-gray-100'>
            <div className='relative flex flex-col items-center justify-center w-full h-full px-10 my-20 lg:px-16 lg:my-0'>
              <div className='flex flex-col items-start space-y-8 tracking-tight lg:max-w-3xl'>
                <div className='relative'>
                  <p className='mb-2 font-medium text-gray-700 uppercase'>
                    Floordle
                  </p>
                  <h2 className='text-5xl font-bold text-gray-900 xl:text-6xl'>
                    Track NFTs with ease
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full h-full bg-white lg:w-4/12 xl:w-4/12'>
            <div className='flex flex-col items-start justify-center sm:justify-start items-center w-full h-full p-10 lg:p-16 xl:p-24'>
              <h4 className='w-full text-3xl font-bold text-center py-10'>
                Sign in
              </h4>
              {!!errors && <span className='text-red-400'>{errors}</span>}
              <div className='relative w-full mt-10 space-y-8'>
                <div className='relative'>
                  <Formik
                    initialValues={{}}
                    validationSchema={schema}
                    onSubmit={handleAuth}
                  >
                    {({
                      values,
                      handleChange,
                      handleSubmit,
                      errors,
                      touched,
                      handleBlur,
                    }) => {
                      return (
                        <Form onSubmit={handleSubmit}>
                          {config.map((item, idx) => {
                            return (
                              <div key={idx} className='py-2'>
                                <label className='font-medium text-gray-900'>
                                  {item.label}
                                </label>
                                <input
                                  {...item}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values[item.name]}
                                  className='block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50'
                                />

                                {errors[item.name] && touched[item.name] && (
                                  <span className='text-lg text-red-400'>
                                    {errors[item.name]}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                          <button
                            type='submit'
                            className='py-4 mt-5 inline-block w-full px-5 text-lg font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease'
                          >
                            Sign in
                          </button>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>

                <div className='relative'>
                  <h1 className='text-lg py-10'>
                    {"Don't have an account?"}
                    <Link passHref href='/sign-up'>
                      <a className='ml-2 cursor-pointer text-blue-600 underline decoration-blue-600 hover:decoration-blue-400 hover:text-blue:400'>
                        Sign up
                      </a>
                    </Link>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default withAuth(SignUpPage);
