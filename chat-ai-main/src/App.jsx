import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take up to 10 seconds");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <>
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen p-4 flex flex-col justify-center items-center">
        <form
          onSubmit={generateAnswer}
          className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105"
        >
          <a
            href="https://github.com/Vishesh-Pandey/chat-ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h1 className="text-4xl font-bold text-blue-600 mb-6 animate-pulse">
              Chat AI
            </h1>
          </a>
          <textarea
            required
            className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow duration-300"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything..."
          ></textarea>
          <button
            type="submit"
            className={`mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:bg-blue-700 ${
              generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={generatingAnswer}
          >
            {generatingAnswer ? "Generating..." : "Generate Answer"}
          </button>
        </form>
        <div className="w-screen md:w-3/4 lg:w-1/2 xl:w-1/3  rounded-lg  mt-6 p-6 transition-transform transform hover:scale-105">
          <ReactMarkdown className="prose max-w-none">{answer}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}

export default App;
