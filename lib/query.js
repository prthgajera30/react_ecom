export const PRODUCT_QUERY = `
query {
  products{
    data{
      attributes{
        Title
        Price
        Description
        Slug
        Image{
          data{
            attributes{
              formats
            }
          }
        }
      }
    }
  }
}
`;

export const GET_PRODUCT_QUERY = `
  query getProduct($Slug: String!){
    products(filters: {Slug: {eq: $Slug}}){
      data{
        attributes{
          Title
          Slug
          Description
          Price
          Image{
            data{
              attributes{
                formats
              }
            }
          }
        }
      }
    }
  }
`;
