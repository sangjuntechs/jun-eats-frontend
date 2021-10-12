import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { isLoggedInVar } from '../../apollo';
import { App } from '../App';

jest.mock("../../routes/logged-out-router", () => {
    return {
        LoggedOutRouter: () => <span>logged out</span>
    }
})

jest.mock("../../routes/logged-in-router", () => {
    return {
        LoggedInRouter: () => <span>logged in</span>
    }
})

describe('<App /> 컴포넌트', () => {
    it('LoggedOutRouter 랜더링', () => {
        const { getByText } = render(<App />)
        getByText("logged out")
    })

    it('LoggedInRouter 랜더링', async () => {
        const { getByText } = render(<App />)
        await waitFor(() => {
            isLoggedInVar(true)
        })
        getByText("logged in")
    })
})