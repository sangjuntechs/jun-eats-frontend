import { gql, useQuery } from '@apollo/client';
import React from 'react'
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import { restaurant, restaurantVariables } from '../../__generated__/restaurant';

interface IRestaurantProps {
    id: string;
}

const RESTAURANT_QUERY = gql`
    query restaurant($input: RestaurantInput!) {
        restaurant(input: $input) {
            ok
            error
            restaurant {
                ...RestaurantsPart
            }
        }
    }
    ${RESTAURANT_FRAGMENT}
`;

const RestaurantDetail = () => {
    const params = useParams<IRestaurantProps>();
    const { data } = useQuery<restaurant, restaurantVariables>(RESTAURANT_QUERY, {
        variables: {
            input: {
                restaurantId: +params.id
            }
        }
    })
    const ResName = data?.restaurant.restaurant?.name;

    return (
    <div>
        <Helmet><title>{`${ResName} : Jun Eats`}</title></Helmet>
        <header>
            <div className="w-full py-40 bg-center bg-cover" style={{backgroundImage: `url(${data?.restaurant?.restaurant?.coverImage})`}}>
                <div className='items-start w-4/12 py-12 pl-44 bg-white'>
                    <h2 className='font-semibold text-2xl mb-3'>{data?.restaurant.restaurant?.name}</h2>
                    <h3 className="text-sm text-gray-500">{data?.restaurant.restaurant?.address}</h3>
                    <h4 className="text-sm text-gray-500">{data?.restaurant.restaurant?.category?.name}</h4>
                </div>
            </div>
        </header>
    </div>
    )
    
}

export default RestaurantDetail;