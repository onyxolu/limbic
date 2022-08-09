import React, { useState, useEffect} from 'react'
import glamorous from 'glamorous'
import * as api from '../utils/api'
import Loading from '../components/loading'


function Clients() {
    const [clients, setClients] = useState([]);
    useEffect(() => {
       const clientsList = api.clients.get();
       setClients(clientsList);
    }, []);

  return (
    <div>
        {
            clients? <div>
            <Timeline clients={clients} />
          </div>: <Loading />
        }
    </div>
  )
}

function Timeline({ clients = []}) {
  
  return (
    <div>
      {clients
        .sort(sortByLatest)
        .map(c => (
          <Post
            key={c.id}
            questions={c.questions}
            date={c.date}
          />
        ))}
    </div>
  )
}

function sortByLatest(p1, p2) {
  return p1.date > p2.date ? -1 : 1
}

const ClientContainer = glamorous.div({
  background: 'white',
  marginBottom: 20,
  padding: '20px 50px',
  borderRadius: '20px',
  boxShadow: 'var(--shadow)',
})

function Post({id, questions, date}) {
  console.log(questions)
  const { Name } = questions;

  const getQuestions = () => {
    return Object.entries(questions).map(([key, value], i) => {
			return (
        <div>
          <h2> {key} </h2>
          <p>{value}</p>
        </div>
			)
		})
  }
  useEffect( () => {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  })
  return (
    <ClientContainer>
      <button type="button" class="collapsible">{Name}</button>
      <div class="content">
        {getQuestions()}
      </div>
    </ClientContainer>
  )
}

export default Clients
