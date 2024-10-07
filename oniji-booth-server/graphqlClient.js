// graphqlClient.js
import fetch from 'node-fetch';
import config from './config.js';

const sendSessionEndMutation = async (sessionId, calmData) => {
  const mutation = `
    mutation EndSession($input: OnijiBoothEndSessionInput!) {
      ONIJI_BoothEndSession(input: $input) {
        error_code
        error_message
        session {
          id
          end_time
          calm
        }
      }
    }
  `;

  const variables = {
    input: {
      id: sessionId,
      calm: JSON.stringify(calmData)
    }
  };

  try {
    const response = await fetch(config.backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
        variables: variables
      })
    });

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data.ONIJI_BoothEndSession;
  } catch (error) {
    console.error('Error sending session end mutation:', error);
    throw error;
  }
};

export { sendSessionEndMutation };