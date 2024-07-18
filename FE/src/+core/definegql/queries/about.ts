import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const RenderAboutQuery = gql`
  query RenderAbout {
    renderAbout {
      main {
        title
        description
        image
      }
      child {
        title
        description
        image
      }
      qAndA {
        title
        description
        image
      }
    }
  }
`;
