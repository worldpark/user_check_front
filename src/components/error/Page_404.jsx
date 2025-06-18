import React from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';

const Page_404 = () => {
    const navigate = useNavigate();

    return (
        <>
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600">404</p>
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                        페이지를 찾을 수 없습니다.
                    </h1>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="#"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            로그인 화면으로 가기
                        </a>
                        <Link to={"/"}>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Page_404;