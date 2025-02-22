import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionsArray, setQuestionsArray] = useState([]);

  useEffect(()=> {
    fetch("http://localhost:4000/questions")
    .then((response) => response.json())
    .then((data) => {
      console.log (data);
      setQuestionsArray(data);
    })
    .catch((error) => console.error("Error in fetching:", error));
  }, []);

  function questionFormSubmit(newQuestion){
    fetch(`http://localhost:4000/questions`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    } )
    .then((response) => response.json())
    .then((updatedQuestion) => setQuestionsArray([...questionsArray, updatedQuestion]));
  }

  function onDeleteQuestion(question){
    const updatedQuestionsList = questionsArray.filter((q) => q.id !== question.id);
    setQuestionsArray(updatedQuestionsList);
  }
  function handleUpdateCorrectIndex(question){
    const updatedQuestions = questionsArray.map((q) => {
      if (q.id === question.id) {
        return question;
      } else {
        return q;
      }
    });
    setQuestionsArray(updatedQuestions);

  }
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm handleFormSubmit = {questionFormSubmit}/> : <QuestionList questionsArray = {questionsArray} handleDelete = {onDeleteQuestion} handleUpdate = {handleUpdateCorrectIndex}/>}
    </main>
  );
}

export default App;
