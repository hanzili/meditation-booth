// services/graphqlService.js
import fetch from 'node-fetch';
import config from '../config/index.js';

async function sendSessionEndMutation(sessionId, calmData) {
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
      calm: JSON.stringify(calmData),
    },
  };

  try {
    const response = await fetch(config.backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation, variables }),
    });

    const responseText = await response.text();
    console.log('Raw response:', responseText);

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      throw new Error(`Invalid JSON response: ${responseText}`);
    }

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data.ONIJI_BoothEndSession;
  } catch (error) {
    console.error('Full error:', error);
    throw new Error(`GraphQL error: ${error.message}`);
  }
}

export { sendSessionEndMutation };
