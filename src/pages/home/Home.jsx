import Button from '../../components/Button/Button';
import './HomeStyles.css';
import { FaSearch } from "react-icons/fa";
import { useRef } from 'react';
import { useNavigate } from "react-router-dom"

export default function Home() {
  
  const navigate = useNavigate();
  const input_ref = useRef('undefined');
  //useRef pega a referencia de um elemento.
  
  const getInput = async () => {
    let value = input_ref.current.value;
    if (value == undefined || value == null || value == '') return alert('Não houve um username informado.');
    
     const name = await getUserName(value);
    
     if (!name) {
       //alert(name)
        alert('Ocorreu um erro! Talvez essa pessoa não exista.')
      return;
    } else {
      navigate(`resultado/${value}`);
    }
  }
  
  const getUserName = async (name) => {
    try {
      const res = await fetch(`https://api.github.com/users/${name}`)
      //propriedade .ok verifica se a req foi feita com sucesso.
      if (res.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(`Erro: ${error}`)
    }
  }
  
  return (
    <div className="App">
      
      <div className="container">
        <h2>Buscar Perfil</h2>
        <div>
          <div >
            <input 
            ref={input_ref}
            type="text"
            name="name"
            placeholder="harisoncleytondev"/>
          </div>
          <div id="container_button">
            <Button className="btn" click={getInput}>
              <FaSearch/>
              <span>Pesquisar</span>
            </Button>
          </div>

        </div>
      </div>
    </div>
    
    )
}