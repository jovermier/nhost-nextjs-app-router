import { gql } from '@apollo/client';

export const TodosQueryDocument = gql`
  query getTodos($limit: Int, $offset: Int) {
    todos(limit: $limit, offset: $offset, order_by: { createdAt: desc }) {
      id
      title
      done
      attachment {
        id
      }
    }
  }
`;

export const TodosSubscriptionDocument = gql`
  subscription subTodos($limit: Int, $offset: Int) {
    todos(limit: $limit, offset: $offset, order_by: { createdAt: desc }) {
      id
      title
      done
      attachment {
        id
      }
    }
  }
`;

export const TodosCountSubscriptionDocument = gql`
  subscription subTodos {
    todos_aggregate {
      aggregate {
        count
      }
    }
  }
`;
