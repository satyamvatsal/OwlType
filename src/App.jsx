import { useState, useEffect } from "react";
import { generate } from "random-words";
import { useRef } from "react";

function App() {
  const [userText, setUserText] = useState("");
  const [gameRunning, setGameRunning] = useState(true);
  const [correctWords, setCorrectWords] = useState(0);
  const [generatedWords, setGeneratedWords] = useState(generate(10));
  const [elapsedTime, setElapsedTime] = useState(null);
  const [startTime, setStartTime] = useState(null);

  const handleUserTextChange = (e) => {
    const typedText = e.target.value;
    if (typedText.length == 1) {
      console.log("test started");
      setStartTime(Date.now());
    }
    setUserText(typedText);
    if (typedText.split(" ").length > generatedWords.length) {
      console.log("test ended");
      setCorrectWords(countEqualWords(userText.split(" "), generatedWords));
      setElapsedTime((Date.now() - startTime) / 1000);
      setGameRunning(false);
    }
  };
  const getFormattedText = () => {
    const typedWords = userText.split(" ");
    return generatedWords.map((word, index) => {
      const typedWord = typedWords[index] || "";

      const formattedWord = word.split("").map((char, charIndex) => {
        if (typedWord[charIndex] === char) {
          return (
            <span key={index + "." + charIndex} style={{ color: "grey" }}>
              {word[charIndex]}
            </span>
          );
        } else if (typedWord[charIndex] !== undefined) {
          return (
            <span key={index + "." + charIndex} style={{ color: "red" }}>
              {word[charIndex]}
            </span>
          );
        } else {
          return (
            <span key={index + "." + charIndex} style={{ color: "white" }}>
              {word[charIndex]}
            </span>
          );
        }
      });
      return <span key={index}>{formattedWord} </span>;
    });
  };

  return (
    <div className="main">
      <Header />
      <Control
        setGeneratedWords={setGeneratedWords}
        setUserText={setUserText}
        setGameRunning={setGameRunning}
      />
      {gameRunning ? (
        <Game
          getFormattedText={getFormattedText}
          userText={userText}
          handleUserTextChange={handleUserTextChange}
          setGeneratedWords={setGeneratedWords}
          setUserText={setUserText}
        />
      ) : (
        <Result
          correctWords={correctWords}
          totalWords={generatedWords.length}
          elapsedTime={elapsedTime}
          setGameRunning={setGameRunning}
          setGeneratedWords={setGeneratedWords}
          setUserText={setUserText}
        />
      )}
    </div>
  );
}

function countEqualWords(typed, generated) {
  return generated.filter((word, index) => word == typed[index]).length;
}
function Game({
  getFormattedText,
  userText,
  handleUserTextChange,
  setGeneratedWords,
  setUserText,
}) {
  const textAreaRef = useRef(null);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);
  return (
    <div className="text">
      <p className="textToType">{getFormattedText()}</p>
      <div className="text-display" onClick={() => textAreaRef.current.focus()}>
        <span>{userText} </span>
        <span className="cursor"></span>
      </div>
      <textarea
        ref={textAreaRef}
        value={userText}
        className="userInput"
        onChange={handleUserTextChange}
        style={{
          position: "absolute",
          opacity: 0,
          left: "-9999px", // Move off-screen
        }}
      ></textarea>
    </div>
  );
}

function Result({
  correctWords,
  totalWords,
  elapsedTime,
  setGameRunning,
  setGeneratedWords,
  setUserText,
}) {
  return (
    <div className="result-head">
      <p>
        wpm:{" "}
        <span className="result">
          {Math.floor((correctWords * 60) / elapsedTime)}
        </span>{" "}
      </p>
      <p>
        accuracy:{" "}
        <span className="result">
          {Math.floor((correctWords * 100) / totalWords)}%
        </span>{" "}
      </p>
      <p>
        time: <span className="result"> {elapsedTime.toFixed(2)}s</span>
      </p>
      <p>
        correct words: <span className="result">{correctWords} </span>
      </p>
      <p>
        total words: <span className="result"> {totalWords} </span>
      </p>
      <button
        className="btn"
        onClick={() => {
          setGameRunning(true);
          setGeneratedWords(generate(10));
          setUserText("");
        }}
      >
        {" "}
        Start Again{" "}
      </button>
    </div>
  );
}
function Header() {
  return (
    <>
      <div className="header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="50"
        >
          <image href="/icon.svg" width="100" />
        </svg>
        <p>
          <a href="/">OwlType</a>
        </p>
      </div>
    </>
  );
}

function Control({ setGeneratedWords, setUserText, setGameRunning }) {
  return (
    <>
      <div className="control-head">
        <span id="words"> words </span>
        <button
          className="btn"
          onClick={() => {
            setGeneratedWords(generate(10));
            setUserText("");
            setGameRunning(true);
          }}
        >
          10
        </button>
        <button
          className="btn"
          onClick={() => {
            setGeneratedWords(generate(25));
            setGameRunning(true);
            setUserText("");
          }}
        >
          25
        </button>
        <button
          className="btn"
          onClick={() => {
            setGeneratedWords(generate(50));
            setUserText("");
            setGameRunning(true);
          }}
        >
          50
        </button>
        <button
          className="btn"
          onClick={() => {
            setGeneratedWords(generate(100));
            setUserText("");
            setGameRunning(true);
          }}
        >
          100
        </button>
      </div>
    </>
  );
}
export default App;
