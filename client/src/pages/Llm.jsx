import React, { useState } from 'react';
import axios from 'axios';
import { useTodo } from '../context/UserContext';
import Loader from '../components/Loader';

function LLM() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const {user} = useTodo();

  const handleSendMessage = async () => {
    setLoading(true);
    const Combined_Input =
      `Hello My name is ${user} and. ${userInput}. Also give some healthy tips to cure my drug addiction or help give some motivation to quit drugs. Give some good tips living healthy life.
      Also give some motivational quotes to make me feel motivated and inspired and also some resources or youtube videos that can help me in my journey.`;

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
    setLoading(false);
  };

  return (
    <div className="container flex items-center mx-auto p-4">
      <h1 className="text-3xl flex items-center font-bold mb-4">SOBRIETY BOT</h1>
      <div className="mb-4 flex  flex-col items-center">
        <label htmlFor="userInput" className="block mb-2">Your message:</label>
        <input
          type="text"
          id="userInput"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="border border-gray-300 px-4 py-2 md:w-4/5 w-3/5 rounded-md focus:outline-none focus:border-blue-500  "
        />
        <div>
        <button onClick={handleSendMessage} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
        </div>
      </div>

      {
        !loading ?(
          <div className="mb-4">
          <p
            style={{ whiteSpace: 'pre-line', color: 'black' }}
            dangerouslySetInnerHTML={{ __html: response }}
            className="whitespace-pre-line"
          ></p>
        </div>
        ) : (
          <Loader />
        )
      }
    </div>
  );
}

export default LLM;
