import React from 'react'
import { Link } from 'react-router-dom'

const EditProfileError = () => {
    return (
        <div className="absolute w-screen h-screen flex justify-center items-center top-0 bg-white flex-col">
            <h1 className="text-xl font-medium">잘못된 계정 변경 시도입니다. 😰</h1>
            <h3 className="text-sm mb-3">계정 업데이트를 다시 시도하시거나 페이지를 종료하여 주십시오.</h3>
            <Link className="hover:underline text-sm text-indigo-600" to='/'>Jun Eats 홈으로 돌아가기 &rarr;</Link>
        </div>
    )
}

export default EditProfileError;