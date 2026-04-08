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
        url: "https://api.groq.com/openai/v1/chat/completions",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        data: {
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: question }],
        },
      });

      setAnswer(response.data.choices[0].message.content);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 flex flex-col items-center justify-start p-6">

      {/* Header */}
      <div className="text-center mb-8 mt-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
            <span className="text-white text-xl">✦</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Chat<span className="text-purple-400">AI</span>
          </h1>
        </div>
        <p className="text-slate-400 text-sm">Powered by LLaMA 3.3 · Groq</p>
      </div>

      {/* Input Card */}
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-6 mb-6">
        <form onSubmit={generateAnswer}>
          <label className="block text-slate-300 text-sm font-medium mb-2">
            💬 Ask anything
          </label>
          <textarea
            required
            className="w-full h-36 p-4 bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm leading-relaxed"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
          />

          <button
            type="submit"
            disabled={generatingAnswer}
            className={`mt-4 w-full py-3 px-6 rounded-xl font-semibold text-white text-sm tracking-wide transition-all duration-300
              ${generatingAnswer
                ? "bg-purple-800 opacity-60 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-lg shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98]"
              }`}
          >
            {generatingAnswer ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Generating...
              </span>
            ) : (
              "✦ Generate Answer"
            )}
          </button>
        </form>
      </div>

      {/* Answer Card */}
      {answer && (
        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">✦</span>
            </div>
            <h2 className="text-slate-300 text-sm font-semibold uppercase tracking-widest">
              Response
            </h2>
          </div>
          <div className="prose prose-invert prose-sm max-w-none text-slate-200 leading-relaxed">
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Footer */}
      <p className="text-slate-600 text-xs mt-auto pb-4">
        Built with React · Groq · LLaMA 3.3
      </p>
    </div>
  );
}

export default App;
