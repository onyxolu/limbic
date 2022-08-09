
import React, { useState, useEffect} from 'react'
import { v4 as uuid } from 'uuid';
import Form from '../components/form'
import {  Input, TextArea} from '../components/inputs'
import "regenerator-runtime/runtime";
import {  Link } from 'react-router-dom';
import { appService } from 'utils/api';


export default function ClientQuestions(props) {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [clientQuestions, setClientQuestions] = useState([])
  const [formData, setFormData] = useState({})

  const handleSubmit = e => {
    e.preventDefault();
    if (formData){
      const newClient = {
        id: uuid(),
        date: new Date().toISOString(),
        questions: {...formData}
      }
      appService.clients.create(newClient);
      setFormSubmitted(true);
    }
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    const clientQuestions = appService.questions.get();
    setClientQuestions(clientQuestions)
    console.log(clientQuestions)
  }, []);

  return (
    <div>
      {
        formSubmitted? <div className="thank-you">Thank you for submitting this form <Link to="/admin"> Go to Admin Login </Link></div>:
        <Form onSubmit={handleSubmit} >
        {
          clientQuestions.map( question => (<QuestionContainer onChange={onChange} {...question}/>))
        }
      </Form>
      }
    </div>
  )

}

const QuestionContainer = (props) => {
  const {tags, title, onChange} = props;
  const getQuestion = () => {
    switch (tags[0]) {
      case "TextArea Input":
        return <TextArea onChange={onChange}  id="content-input" placeholder="Content" name={title} />
      
        case "Text Input":
          return <Input onChange={onChange} id="title-input" placeholder="Title" name={title} />
      default:
        break;
    }
  } 
  return (
    <>
      <label
          style={{justifySelf: 'right', alignSelf: 'baseline', width: '240px', fontSize: '16px'}}
          htmlFor="content-input"
        >
          {props.title}
      </label>
      {
        getQuestion()
      }
    </>
  )
}