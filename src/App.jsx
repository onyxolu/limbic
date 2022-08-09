import React from 'react'
import glamorous from 'glamorous'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import User from './components/user'
import Loading from './components/loading'
import Editor from './screens/editor'
import ClientQuestions from 'screens/clientQuestions'
import { Home } from 'screens/home'
import { Admin } from 'screens/admin'

const Header = glamorous.div({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px 0px',
})

const TitleContainer = glamorous.div({
    display: 'flex',
    '@media only screen and (max-width: 819px)': {
        order: 0,
        width: '100%',
    },
    '& > div': {
        borderRadius: '50px',
        marginLeft: 'auto',
        marginRight: 'auto',
        // background: 'white',
        textAlign: 'center',
        padding: '30px 50px',
        boxShadow: 'var(--shadow)',
    },
})
  
const Title = glamorous.h1({
    color: 'var(--green)',
    fontSize: 50,
    lineHeight: '40px',
    textTransform: 'uppercase',
})

const UserBtnsContainer = glamorous.div({
    width: '25%',
    display: 'flex',
    justifyContent: 'center',
    '@media only screen and (max-width: 819px)': {
      order: 1,
      marginTop: 10,
      flex: 1,
    },
})

const UserBtn = glamorous.span({
    background: 'white',
    boxShadow: 'var(--shadow)',
    borderRadius: 15,
    padding: 15,
    marginLeft: 15,
    cursor: 'pointer',
    transition: '0.5s',
    ':hover': {
      boxShadow: 'var(--shadowHover)',
    },
})

const isUser = (user) => {
  console.log(user)
  return Object.keys(user).length !== 0;
}


function App() {
    return (
      <User>
        {({user, error, pending, logout, login}) =>
          pending ? (
            <Loading />
          ) : (
            <Router>
              <div>
                {error ? (
                  <pre>{JSON.stringify(error.response, null, 2)}</pre>
                ) : null}
                <Header>
                  <TitleContainer>
                    <div>
                      <Title>
                        <Link to="/">
                          LIMBIC AI
      
                        </Link>
                      </Title>
                    </div>
                  </TitleContainer>
                  <UserBtnsContainer>
                    {isUser(user) ? (
                      <div>
                        <UserBtn data-testid="username-display">
                          {user.username.split('@')[0]}
                        </UserBtn>
                        <UserBtn onClick={logout}>Logout</UserBtn>
                      </div>
                    ) : (
                      <div>
                        <UserBtn onClick={login}>Login</UserBtn>
                      </div>
                    )}
                  </UserBtnsContainer>
                </Header>

                <Routes>
                  <Route path="/" element={<Home login={login}/>} />
                  <Route path="/form" element={<ClientQuestions/>} />
  
                  {user ? (
                    <React.Fragment>
                      <Route path="/admin" element={<Admin/>} />
                      <Route
                      path="/editor"
                      element={ <Editor user={user} />}
                      />
                      <Route
                      path="/editor/:id"
                      element={<Editor user={user} />}
                      />
                    </React.Fragment>
                  ) : null}
                </Routes>
              </div>
            </Router>
          )
        }
      </User>
    )
  }
  
  export default App