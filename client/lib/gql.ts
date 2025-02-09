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

export const RESET_PASSWORD = gql`
  mutation ONIJI_ResetPassword($input: OnijiResetPasswordInput!) {
    ONIJI_ResetPassword(input: $input) {
      error_code
      error_message
    }
  }
`;


export const GET_USER = gql`
  query ONIJI_User {
    ONIJI_User {
      error_code
      error_message
      user {
        id
        email
        first_name
        last_name
      }
    }
  }
`;

export const CREATE_SESSION = gql`
  mutation ONIJI_CreateSession($input: OnijiCreateSessionInput!) {
    ONIJI_CreateSession(input: $input) {
      error_code
      error_message
      session {
        id
        mood
        session_type
        has_scent
        music {
          name
          duration
        }
        start_time
        end_time
      }
    }
  }
`;

export const END_SESSION = gql`
  mutation ONIJI_EndSession($input: OnijiEndSessionInput!) {
    ONIJI_EndSession(input: $input) {
      error_code
      error_message
      session {
        id
        mood
        session_type
        has_scent
        music {
          name
          duration
        }
        start_time
        end_time
        calm
      }
    }
  }
`;

export const GET_SESSIONS = gql`
  query ONIJI_GetSessions {
    ONIJI_GetSessions {
      error_code
      error_message
      sessions {
        id
        mood
        session_type
        has_scent
        music {
          name
          duration
        }
        start_time
        end_time
        calm
      }
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation ONIJI_RefreshToken($input: OnijiRefreshTokenInput!) {
    ONIJI_RefreshToken(input: $input) {
      error_code
      error_message
      user {
        id
        email
        first_name
        last_name
        token
        refresh_token
      }
    }
  }
`;

export const GET_SESSION = gql`
  query ONIJI_GetSession($input: OnijiGetSessionInput!) {
    ONIJI_GetSession(input: $input) {
      error_code
      error_message
      session {
        id
        mood
        session_type
        has_scent
        music {
          name
          duration
        }
        start_time
        end_time
        calm
      }
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation ONIJI_UpdateUser($input: OnijiUpdateUserInput!) {
    ONIJI_UpdateUser(input: $input) {
      error_code
      error_message
      user {
        id
        email
        first_name
        last_name
        token
        refresh_token
      }
    }
  }
`;

export const UPDATE_SESSION = gql`
  mutation ONIJI_UpdateSession($input: OnijiUpdateSessionInput!) {
    ONIJI_UpdateSession(input: $input) {
      error_code
      error_message
    }
  }
`;

export const UPDATE_USER = gql`
  mutation ONIJI_UpdateUser($input: OnijiUpdateUserInput!) {
    ONIJI_UpdateUser(input: $input) {
      error_code
      error_message
      user {
        id
        email
        first_name
        last_name
      }
    }
  }
`;