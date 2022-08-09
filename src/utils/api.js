import defaultQuestions from "./questions.json"
import defaultClients from "./clients.json"
let api, isLoggedIn

const getData = res => res.data

const requests = {
  delete: url => api.delete(url).then(getData),
  get: url => api.get(url).then(getData),
  put: (url, body) => api.put(url, body).then(getData),
  post: (url, body) => api.post(url, body).then(getData),
}

const auth = {
  me() {
    if (!isLoggedIn) {
      return Promise.resolve({user: null})
    }
    return requests.get('/auth/me').catch(error => {
      if (error.response.status === 401) {
        logout()
        return {user: null}
      }
      return Promise.reject(error)
    })
  },
  logout: () => {
    logout()
    return Promise.resolve({user: null})
  },
  login: form =>
    requests.post('/auth/login', form).then(data => {
      login({token: data.user.token})
      return data
    }),
  register: form =>
    requests.post('/auth/register', form).then(data => {
      login({token: data.user.token})
      return data
    }),
}

const users = {
  delete: id => requests.delete(`/users/${id}`),
  get: id => requests.get(id ? `/users/${id}` : '/users'),
  update: (id, updates) => requests.put(`/users/${id}`, updates),
  create: user => requests.post('/users', user),
}

const clients = {
  get: () =>  _getClients(),
  create: client => createClient(client),
}

const questions = {
    delete: id => _deleteById(id),
    getById: (id) =>  _getQuestionById(id),
    get: () => _getQuestions(),
    update: (question) => _updateQuestion(question),
  }

function logout() {
  window.localStorage.removeItem('token');
  init({token: null})
}

function login({token}) {
  window.localStorage.setItem('token', token);
  init({token})
}

function init({
  token = window.localStorage.getItem('token'),
} = {}) {
  isLoggedIn = Boolean(token)
}

const _getQuestions = () => {
    const questions = _getData("questions", defaultQuestions)
    return questions;
}

const _getClients = () => {
  const clients = _getData("clients", defaultClients)
  return clients;
}

const _getData = (dataKey, defaultData) => {
  let data = window.localStorage.getItem(dataKey);
  if (data){
      return JSON.parse(data)
  } else {
      localStorage.setItem(dataKey, JSON.stringify(defaultData));
      return defaultData
  }
}

const _updateQuestion = (question) => {
    let questions = _getQuestions();    
    var foundIndex = questions.findIndex(x => x.id === question.id);
    if (foundIndex !== -1) {
        console.log(foundIndex, "found")
        questions[foundIndex] = question;
    }else {
        console.log("else")
        questions.push(question)
    }
    console.log(questions, "updated")
    localStorage.setItem("questions", JSON.stringify(questions));
}

const createClient = (client) => {
  let clients = _getClients();    
  clients.push(client)
  localStorage.setItem("clients", JSON.stringify(clients));
}

const _getQuestionById = (id) => {
    const questions = _getQuestions();
    var foundIndex = questions.findIndex(x => x.id === id);
    if (foundIndex >=  0) {
        return questions[foundIndex];
    } else {
        console.log("not found")
    }
}

const _deleteById = (id) => {
    const questions = _getQuestions();
    console.log(id)
    const newArray = questions.filter(obj => obj.id !== id);
    localStorage.setItem("questions", JSON.stringify(newArray));
}

const appService = {
    clients, 
    questions
}

export {init, users, clients, appService, auth}
