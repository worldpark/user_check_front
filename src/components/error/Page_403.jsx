import React from 'react';
import { useNavigate } from 'react-router-dom';

const Page_403 = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', padding: '50px', height: '100rem'}}>
            <h1>403 - 접근 권한이 없습니다</h1>
            <p>요청하신 페이지에 접근할 권한이 없습니다.</p>
            <button onClick={() => navigate('/')}
                    style={{ marginTop: '20px' }}
                    className="w-full py-2 px-4 bg-sky-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                로그인 페이지로 이동
            </button>
        </div>
    );
};

export default Page_403;