import glamorous from "glamorous";
import React from "react"
import { useNavigate } from "react-router-dom";

const LoginBtn = glamorous.span({
    background: 'var(--green)',
    boxShadow: 'var(--shadow)',
    color: 'white',
    fontSize: 18,
    borderRadius: 15,
    padding: 15,
    lineHeight: 0.5,
    transition: '0.5s',
    marginRight: "20px",
    cursor: 'pointer',
    ':hover': {
      boxShadow: 'var(--shadowHover)',
    },
})

const AnswerBtn = glamorous.span({
    background: 'var(--green)',
    boxShadow: 'var(--shadow)',
    color: 'white',
    fontSize: 18,
    borderRadius: 15,
    padding: 15,
    lineHeight: 0.5,
    transition: '0.5s',
    cursor: 'pointer',
    ':hover': {
      boxShadow: 'var(--shadowHover)',
    },
})

const Container = glamorous.section({
    textAlign: "center",
    paddingTop: "20rem",
})

export const Home = (props) => {

    const navigate = useNavigate();

    const loginClick = () => {
        // do login
        props.login();
        navigate(`/admin`);
    }

    const answerQuestionsClick = () => {
        navigate(`/form`);
    }
    
    return(
        <Container>
            <LoginBtn onClick={loginClick}> Login as Admin</LoginBtn>
            <AnswerBtn onClick={answerQuestionsClick}> Answer Questions </AnswerBtn>
        </Container>
    );
}