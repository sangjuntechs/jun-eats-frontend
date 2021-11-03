import React from 'react';
import { useParams } from 'react-router-dom';

interface IParams {
    restaurantId: string;
}

export const AddDish = () => {
    const params = useParams<IParams>();
    console.log(params)
    return (
        <div>add dish</div>
    )
}