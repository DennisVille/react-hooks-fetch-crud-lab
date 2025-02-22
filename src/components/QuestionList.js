import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questionsArray, handleDelete, handleUpdate}) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionsArray.map((question) =>
        (<QuestionItem key = {question.id} question = {question} handleDelete = {handleDelete} handleUpdate = {handleUpdate}/>))}</ul>
    </section>
  );
}

export default QuestionList;
