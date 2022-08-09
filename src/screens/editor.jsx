
import React, { useState, useEffect} from 'react'
import { v4 as uuid } from 'uuid';
import Form from '../components/form'
import {  TextArea} from '../components/inputs'
import "regenerator-runtime/runtime";
import Dropdown from 'components/dropdown'; 
import Downshift from 'downshift'
import { useNavigate, useParams } from 'react-router-dom';
import { appService } from 'utils/api';

const items = [{name: "Text Input", id: "text-input"}, {name: "TextArea Input", id: "textarea-input"}, {name: "Dropdown", id: "dropdown"}];

export default function Editor(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemsToShow, setItemsToShow] = useState([]);
  const [question, setQuestion] = useState("")
  const [selectedItem, setSelectedItem] = useState("")
  const {id} = useParams(); 
  const navigate = useNavigate();

  const backClick = () => {
    navigate(-1)
  }

  const getItemsToShow = (value) => {
    return items
  }

  const itemToString = (i) => {
    return i ? i.name : ''
  }

  const handleChange = (selectedItem, downshiftState) => {
    if (selectedItem){
      setSelectedItem(selectedItem.name)
    }
  }

  const handleStateChange = (changes, downshiftState) => {
    if (changes.hasOwnProperty('isOpen')) {
      let isOpenVal = isOpen;
      let itemsToShowVal = itemsToShow;
      isOpenVal =
      changes.type === Downshift.stateChangeTypes.mouseUp
        ? isOpenVal
        : changes.isOpen
      if (isOpenVal) {
        itemsToShowVal = getItemsToShow(downshiftState.inputValue)
      }
      setIsOpen(isOpenVal);
      setItemsToShow(itemsToShowVal);
    } else if (changes.hasOwnProperty('inputValue')) {
      setItemsToShow(getItemsToShow(downshiftState.inputValue));
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    const newQuestion = {
      author: "Olumide.",
      title: question,
      date: new Date().toISOString(),
      content: `last update: ${new Date().toISOString()}`,
      tags: [selectedItem],
      authorId: props.user.id,
    }
    if (id){
      newQuestion["id"] = id;
    }
    else{
      newQuestion["id"] = uuid();
    }
    appService.questions.update(newQuestion);
    navigate(`/questions`);
  }

  const onQuestionChange = (e) => {
    setQuestion(e.target.value)
  }

  const deleteClick = (e) => {
    e.preventDefault()
    if(id){
      appService.questions.delete(id);
      navigate(`/questions`);
    }
  }

  useEffect(() => {
    if (id){
      const question = appService.questions.getById(id);
      if (question){
        const {title, tags} = question;
        setQuestion(title)
        setSelectedItem(tags[0])
      }
    }
  }, [id]);

  return (
    <div>
                      <div onClick={backClick} className="prev">Back to Previous Page</div>
      <Form onSubmit={handleSubmit} showDelete={true} onDeleteClick={deleteClick}>

        <label
          style={{justifySelf: 'right', alignSelf: 'baseline', width: '240px', fontSize: '16px'}}
          htmlFor="content-input"
        >
          Question
        </label>
        <TextArea value={question} onChange={onQuestionChange} id="content-input" placeholder="Content" name="content" />
        <label style={{justifySelf: 'right'}} htmlFor="tags-input">
          Answer Type
        </label>
        <Dropdown
          onStateChange={handleStateChange}
          isOpen={isOpen}
          onChange={handleChange}
          items={itemsToShow}
          itemToString={itemToString}
          inputValue={selectedItem}
        />
      </Form>
    </div>
  )

}