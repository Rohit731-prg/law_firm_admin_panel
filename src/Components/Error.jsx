import React from 'react'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react';
import error from "../assets/error.json";

function Error() {
    const navigate = useNavigate();
    return (
        <main className='flex flex-row min-h-screen items-center justify-center gap-10'>
            <section>
                <h1 className='text-4xl font-semibold'>404</h1>
                <h2 className='text-2xl font-semibold mt-5'>Page Not Found</h2>

                <p className='text-md mb-5'>The page you are looking for does not exist</p>
                <button
                    onClick={() => navigate('/')}
                    className='mt-3 px-10 py-2 bg-black text-white hover:bg-white hover:text-black hover:border-black border-2 transition-all cursor-pointer font-semibold'>
                    Back to Home
                </button>
            </section>

            <section>
                <Lottie animationData={error} />
            </section>
        </main>
    )
}

export default Error