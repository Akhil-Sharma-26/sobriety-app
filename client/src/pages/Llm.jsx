import React, { useState } from 'react';
import axios from 'axios';

function LLM() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSendMessage = async () => {
    const Combined_Input =
      userInput +
      ' ' +
      'Also give some healthy tips to cure my drug addiction or help give some motivation to quit drugs.';

    try {
      const response = await axios.post('http://127.0.0.1:80/llm', { Combined_Input });
      console.log(response.data); // Log the response data to the console

      // Assuming the response.data has the structure { response: "your_response_text" }
      const responseData = response.data;
      const cleanedResponse = responseData.response
        .replace(/\n/g, '<br/>')
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/\s+/g, ' ');

      setResponse(cleanedResponse);
      // setSpeakButtonDisabled(false); // Assuming this is defined somewhere else
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App" style={{ margin: '1rem' }}>
      <h1>SOBRIETY BOT</h1>
      <div>
        <label htmlFor="userInput">Your message:</label>
        <input
          type="text"
          id="userInput"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handleSendMessage}>Submit</button>
      </div>

      <div style={{ margin: '1rem' }}>
        <p
          style={{ whiteSpace: 'pre-line', color: 'black' }}
          dangerouslySetInnerHTML={{ __html: response }}
        ></p>
      </div>
    </div>
  );
}

export default LLM;
