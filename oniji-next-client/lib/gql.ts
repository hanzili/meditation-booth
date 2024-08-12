import { gql } from "@apollo/client";

export const PING = gql`
  {
    ONIJI_Ping
  }
`;

export const SIGNUP_BY_EMAIL = gql`
  mutation SignupByEmail($input: OnijiSignupByEmailInput!) {
    ONIJI_SignupByEmail(input: $input) {
      error_code
      error_message
      user {
        id
        email
        token
        refresh_token
      }
    }
  }
`;

export const LOGIN_BY_EMAIL = gql`
mutation ONIJI_LoginByEmail($input: OnijiLoginByEmailInput!) {
  ONIJI_LoginByEmail(input: $input) {
    error_code
    error_message
    user {
      id
      email
      token
      refresh_token
    }
  }
}
`;