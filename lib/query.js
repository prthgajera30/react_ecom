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