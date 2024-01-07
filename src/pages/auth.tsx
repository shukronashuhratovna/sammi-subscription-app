import Head from "next/head"
import Image from "next/image"
import { useContext, useState } from "react"
import { TextField } from "src/components";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAuth } from "src/hooks/useAuth";
import { GetServerSideProps } from "next";

const Auth = () => {
    const [auth, setAuth] = useState<'Sign In' | 'Sign Up'>('Sign In');
    const { error, isLoading, signin, signup } = useAuth();

    const toggleAuth = (state: 'Sign In' | 'Sign Up') => {
        setAuth(state)
    }

    const onSubmit = async (formData: { email: string, password: string }) => {
        if (auth === 'Sign In')
            signin(formData.email, formData.password);
        else {
            signup(formData.email, formData.password);
        }
    }

    const validation = Yup.object({
        email: Yup.string().email('Enter valid email').required('Email is required'),
        password: Yup.string().min(6, '6 minimum character').required('Password is required')
    })

    return (
        <div className="relative h-screen w-screen flex flex-col md:items-center md:justify-center bg-black md:bg-transparent">
            <Head>
                <title>Auth</title>
                <meta name='decription' content="For watching movies you sgould sign to app" />
                <link rel='icon' href='/logo.svg' />
            </Head>
            <Image src={'https://rb.gy/5mny7'} alt='bg' fill
                className="object-cover -z-10 !hidden sm:!inline opacity-60" />

            <Image src={'/logo.svg'} width={70} height={70} alt="logo"
                className="absolute left-4 top-4 cursor-pointer object-contain" />

            <div className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-10">
                <h1 className="text-4xl font-semibold">{auth}</h1>
                {error && <p className="font-semibold text-red-500 text-center">{error}</p>}
                <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit} validationSchema={validation}>
                    <Form>
                        <div className="space-y-4">
                            <TextField name='email' type={'text'} placeholder={'Email'} />
                            <TextField name='password' type={'password'} placeholder={'Password'} />
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-[#E10856] py-3 font-semibold my-4 ">
                            {isLoading ? 'Loading...' : auth}
                        </button>
                        <div className="text-gray-500">{auth === 'Sign In' ? 'Not yet account? ' : 'Already have account? '}
                            <button type='button' className="text-[white] hover:underline"
                                onClick={() => { auth === 'Sign In' ? toggleAuth('Sign Up') : toggleAuth('Sign In') }}>
                                {auth === 'Sign In' ? 'Sign Up Now' : 'Sign In'}
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Auth
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const user_id = req.cookies.user_id;

    if (user_id)
        return { redirect: { destination: '/', permanent: false } }
    return { props: {} }
}
