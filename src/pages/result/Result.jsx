import Repository from '../../components/Repository/Repository'
import Repositories from '../../components/Repository/Repositories/Repositories'
import Button from '../../components/Button/Button'
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlinePeopleAlt } from "react-icons/md";
import './ResultStyles.css'
import no_avatar from './assets/images/no-avatar.png'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Result() {
  
  let navigate = useNavigate();
  //Pega o :username do url, definido no main.jsx
  let params = useParams();
  
  //useState é basicamente uma variavel com um setter.
  const [username, setUsername] = useState('');
  const [name, setName] = useState('Undefined');
  const [avatarUrl, setAvatar] = useState(no_avatar);
  const [bio, setBio] = useState('A conta não tem uma bio setada.');
  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);
  
  //o useEffect vai executar ate o params mudr
  useEffect(() => {
    if (params.username) {
       setUsername(params.username);
       //alert(username)
    }    
}, [params.username]);

  let urlApiUser = `https://api.github.com/users/${username}`;
  function format(isoString) {
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }
  useEffect(() => {
    //Consulta de api normal do js.
    async function search() {
        const result = await fetch(urlApiUser)

        .then((res) => res.json())
    
        .then((data) => {
          
          setName(data.name);
          if (data.avatar_url != null) {
            setAvatar(data.avatar_url);
            //alert(data.avatar_url)
          }
          if (data.bio != null) {
            setBio(data.bio);
          }
          setFollowers(data.followers);
          setFollowing(data.following);
        });
    }
    search();
    
}, [name]);
   
  const [jsonRepo, setJsonRepo] = useState([]);
   
  useEffect(() => {
    async function search() {
      await fetch(`https://api.github.com/users/${params.username}/repos`)
      .then((res) => res.json())
      .then((json) => setJsonRepo(json))
      .catch(error => console.error('Erro:', error));
    }
    
    search()
  }, []);
  
  return (
      <div>
        <div className="container_account">
          <div className="account_info">
            <img width="200" height="200" src={avatarUrl} alt="Foto de perfil."/>
            <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener"
            >{name}</a>
            <h5>{username}</h5>
          </div>
          <div className="account_bio">
            <div>
              <label>Bio:</label>

              <div id="bio_container">
                <p>{bio}</p>
              </div>
            </div>
            <section >
               <span> <MdOutlinePeopleAlt/> Seguindo: {followers}</span>

               <span> <MdOutlinePeopleAlt/> Seguidores: {following}</span>
            </section>
            
          </div>
        </div>
        
        <div className="container_repositories">
          <h2>Repositórios</h2>
          <div className="container_repository">
            <Repositories>
              {
                jsonRepo.length > 0 ? jsonRepo.map((repo) => {

                  return <Repository 

                  key={repo.id}
                  username={username}
                  name={repo.name}
                  language={repo.language}
                  description={repo.description}
                  stars={repo.stargazers_count}
                  issues={repo.open_issues}
                  forks={repo.forks}
                  createDate={format(repo.created_at)}
                  dateModified={format(repo.updated_at)}
                  />
                }) : <p style={{
                  textAlign: 'center'
                }}>Não possui repositórios</p>
              }
            </Repositories>
            
          </div>
          
          <div className="btn_container">
            <Button click={() => navigate('/')} className="btn_exit">
              <FaArrowLeft/>
              VOLTAR
            </Button>
          </div>
        </div>
      </div>
    )
}