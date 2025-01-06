import React, { useState, useRef } from "react";
import { level1Questions, level2Questions } from "./QuizQuestionArray";
import { MenuItem, Select } from "@mui/material";
const QuizComponent = () => {
  const [level1Answers, setLevel1Answers] = useState(
    new Array(level1Questions.length).fill(null)
  );
  const [level2Answers, setLevel2Answers] = useState(
    new Array(level2Questions.length).fill(null)
  );
  const [level1Completed, setLevel1Completed] = useState(false);
  const [level2Enabled, setLevel2Enabled] = useState(false);
  const [isLevel1Open, setIsLevel1Open] = useState(false);
  const [isLevel2Open, setIsLevel2Open] = useState(false);
  const level1Ref = useRef(null);
  const level2Ref = useRef(null);
  const handleLevel1AnswerChange = (index, answer) => {
    const newAnswers = [...level1Answers];
    newAnswers[index] = answer;
    setLevel1Answers(newAnswers);
  };
  const handleLevel2AnswerChange = (index, answer) => {
    const newAnswers = [...level2Answers];
    newAnswers[index] = answer;
    setLevel2Answers(newAnswers);
  };
  const handleSubmitLevel1 = () => {
    const allAnswered = level1Answers.every((answer) => answer !== null);
    if (allAnswered) {
      setLevel1Completed(true);
      setLevel2Enabled(true); // Enable Level 2
      setIsLevel1Open(false); // Close Level 1
    } else {
      alert("Please answer all questions in Level 1.");
    }
  };
  const handleSubmitLevel2 = () => {
    const allAnswered = level2Answers.every((answer) => answer !== null);
    if (allAnswered) {
      alert("Level 2 submitted!");
      setIsLevel2Open(false); // Close Level 2
    } else {
      alert("Please answer all questions in Level 2.");
    }
  };
  const renderQuestions = (questions, level) => {
    const handleAnswerChange =
      level === 1 ? handleLevel1AnswerChange : handleLevel2AnswerChange;
    const answers = level === 1 ? level1Answers : level2Answers;
    return questions.map((q, index) => (
      <div key={index} className="mb-4">
        <h3 className="font-semibold">{q.question}</h3>
        {q.options.map((option, idx) => (
          <label key={idx} className="block">
            <input
              type="radio"
              className="cursor-pointer"
              value={option}
              checked={answers[index] === option}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
            {option}
          </label>
        ))}
      </div>
    ));
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-center pb-8">
        <div className="mb-4 lg:mb-0">
          <h1 className="font-semibold text-2xl">Take Quiz</h1>
          <h2 className="text-md">
            Dashboard / <span className="text-gray-600">Take Quiz</span>
          </h2>
        </div>
      </div>
      <div className="mb-4 flex md:items-end md:justify-end items-center justify-center">
        {/* Search Course Input Field */}
       <div className="flex items-end justify-end lg:w-2/3 w-full md:flex-row flex-col gap-4">
        {/* Search Course Input Field */}
        <input
          type="text"
          placeholder="Search Quiz"
          className="w-full py-2 px-3 border rounded-md text-md"
        />
        {/* Department Select Dropdown */}
        <Select
          className="w-full"
          size="small"
          displayEmpty
          defaultValue=""
          variant="outlined"
        >
          <MenuItem value="">Department</MenuItem>
          <MenuItem value="It">It</MenuItem>
          <MenuItem value="Marketing">Marketing</MenuItem>
          <MenuItem value="Sales">Sales</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </Select>
        <button className="font-medium py-2 px-4 sm:px-6 bg-[#B17F27] text-white rounded-md flex justify-center items-center gap-2 h-[40px] text-sm sm:text-base hover:bg-[#A56F23] transition-all duration-200 w-full sm:flex-wrap">
          Search
        </button>
      </div>
      </div>
      {/* Level 1 Accordion */}
      <div
        ref={level1Ref}
        id="accordion-collapse"
        data-accordion="collapse"
        className={`border border-e-secondary p-4 flex justify-between rounded-md cursor-pointer`}
        onClick={(e) => {
          if (level1Ref.current && level1Ref.current.contains(e.target)) {
            setIsLevel1Open(false);
          }
        }}
      >
        <h1 className="text-2xl font-semibold text-black">Level 1</h1>
        <button
          className="bg-golden text-white rounded-md py-2 px-4"
          onClick={(e) => {
            e.stopPropagation();
            setIsLevel1Open(true);
          }}
        >
          Open Quiz
        </button>
      </div>
      {/* Level 1 Questions */}
      {isLevel1Open && (
        <div className="p-4">
          {renderQuestions(level1Questions, 1)}
          <button
            className="bg-golden text-white py-2 px-4 rounded-md"
            onClick={handleSubmitLevel1}
          >
            Submit
          </button>
        </div>
      )}
      {/* Level 2 Accordion */}
      <div
        ref={level2Ref}
        id="accordion-collapse-level2"
        data-accordion="collapse"
        className={`border border-e-secondary p-4 flex justify-between rounded-md ${
          level2Enabled ? "" : "opacity-50 cursor-not-allowed"
        }`}
        onClick={(e) => {
          if (
            level2Enabled &&
            level2Ref.current &&
            level2Ref.current.contains(e.target)
          ) {
            setIsLevel2Open(false);
          }
        }}
      >
        <h1 className="text-2xl font-semibold text-black">Level 2</h1>
        <button
          className={`bg-golden text-white rounded-md py-2 px-4 ${
            level2Enabled ? "" : "cursor-not-allowed"
          }`}
          disabled={!level2Enabled}
          onClick={(e) => {
            e.stopPropagation();
            if (level2Enabled) {
              setIsLevel2Open(true);
            }
          }}
        >
          Open Quiz
        </button>
      </div>
      {/* Level 2 Questions */}
      {isLevel2Open && level2Enabled && (
        <div className="p-4">
          {renderQuestions(level2Questions, 2)}
          <button
            className=" text-white py-2 px-4 rounded-md"
            onClick={handleSubmitLevel2}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};
export default QuizComponent;