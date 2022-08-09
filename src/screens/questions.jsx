import React, { useState, useEffect} from 'react'
import glamorous from 'glamorous'
import * as api from '../utils/api'
import Loading from './../components/loading'
import { useNavigate, Link } from 'react-router-dom';

const NewPostBtn = glamorous.span({
  background: 'var(--green)',
  boxShadow: 'var(--shadow)',
  color: 'white',
  fontSize: 40,
  borderRadius: 15,
  padding: 15,
  lineHeight: 0.5,
  transition: '0.5s',
  cursor: 'pointer',
  position: 'fixed',
  bottom: 10,
  right: 10,
  ':hover': {
    boxShadow: 'var(--shadowHover)',
  },
})


function Questions() {
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
       const questionsList = api.appService.questions.get();
       console.log(questionsList)
       setQuestions(questionsList);
    }, []);

  return (
    <div>
        {
            questions? <div>
            <Timeline questions={questions} />
          </div>: <Loading />
        }
          <NewPostBtn>
            <Link to="/editor">
              <span>+</span>
            </Link>
          </NewPostBtn>
    </div>
  )
}

function Timeline({ questions = []}) {
  return (
    <div>
      {questions
        .sort(sortByLatest)
        .map(c => (
          <Post
            key={c.id}
            post={c}
            author={c.author}
          />
        ))}
    </div>
  )
}

function sortByLatest(p1, p2) {
  return p1.date > p2.date ? -1 : 1
}

const QuestionContainer = glamorous.div({
  background: 'white',
  marginBottom: 20,
  padding: '30px 50px',
  borderRadius: '50px',
  boxShadow: 'var(--shadow)',
  cursor: 'pointer'
})

const QuestionTitle = glamorous.h2({
  color: 'var(--green)',
})

const QuestionSeparator = glamorous.hr({
  border: 0,
  borderRadius: 10,
  height: 5,
  width: 30,
  margin: '0 0 10px 0',
  background: 'var(--green)',
})

const Tag = glamorous.span({
  background: 'var(--green)',
  color: 'white',
  padding: 5,
  marginRight: 5,
  borderRadius: 5,
})
function Post({post: {title, content, id, tags, author: username}}) {
    let navigate = useNavigate();
    const onQuestionClick = (id) => {
        console.log(id);
        navigate(`/editor/${id}`);
    }
  return (
    <QuestionContainer onClick={ () => onQuestionClick(id)}>
      <QuestionTitle data-testid="post-title">{title}</QuestionTitle>
      <h4 data-testid="post-author-username">by {username}</h4>
      <QuestionSeparator />
      <p data-testid="post-content">{content}</p>
      <div>
        {tags.map((t, i) => (
          <Tag key={t} data-testid={`post-tag-${i}`}>
            {t}
          </Tag>
        ))}
      </div>
    </QuestionContainer>
  )
}

export default Questions;
