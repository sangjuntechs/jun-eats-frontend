import { gql } from "@apollo/client";

export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantsPart on Restaurant {
    id
    name
    coverImage
    category {
      name
    }
    address
    isPromoted
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategorysPart on Category {
    id
    name
    coverImage
    slug
    restaurantCount
  }
`;

export const DISH_FRAGMENT = gql`
  fragment DishesPart on Dish {
    id
    name
    price
    photo
    description
    option {
      name
      choices {
        name
        extra
      }
      extra
    }
  }
`

export const FULL_ORDER_FRAGMENT = gql`
  fragment FullOrderParts on Order {
    id
    status
    total
    driver {
      email
    }
    customer {
      email
    }
    restaurant {
      name
      address
    }
  }
`;