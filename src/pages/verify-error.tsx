import React from 'react'
import { Link } from 'react-router-dom'

const VerifyError = () => {
    return (
        <div className="absolute w-screen h-screen flex justify-center items-center top-0 bg-white flex-col">
            <h1 className="text-xl font-medium">올바르지 않은 메일 인증입니다. 😰</h1>
            <h3 className="text-sm mb-3">인증을 다시 시도하시거나 페이지를 종료하여 주십시오.</h3>
            <Link className="hover:underline text-sm text-indigo-600" to='/'>Jun Eats 홈으로 돌아가기 &rarr;</Link>
        </div>
    )
}

export default VerifyError