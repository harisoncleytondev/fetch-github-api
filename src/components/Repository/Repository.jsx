import './RepositoryStyles.css';
import java_icon from "./assets/java-icon.svg";
import { RiStarSFill, RiGitForkFill } from "react-icons/ri";
import { VscIssues } from "react-icons/vsc";
import { useState, useEffect } from 'react';

export default function Repository( { username, language, name, createDate, dateModified, description, stars, forks, issues, className } ) {

   //https://cdn.simpleicons.org/<language>
   function getImage() {
     if (language == 'Java') {
       return java_icon;
     } else if (language =='HTML') {
       return `https://cdn.simpleicons.org/html5`
      } else if (language == null) {
       return 'https://cdn.simpleicons.org/icloud/808080';
     } else {
       return `https://cdn.simpleicons.org/${language}`
     }
   }
   
   function getDescription() {
     if (description == null) {
       return "Sem descrição."
     } else {
       return description;
     }
   }
   
  return (
    <>
      <div className="container_repo">
        <div>
          <div className="image-language">
            <div className="image">
                <label>LINGUAGEM</label>
                <img 
                src={getImage()} 
                alt={language} />
            </div>
            <div className="date">
              <span>Ultima atualização: </span>
              <h6>{dateModified}</h6>
              <span>Data de criação: </span>
              <h6>{createDate}</h6>
            </div>

          </div>
        </div>
        
        <div>
          <div className="name-description">
            <a 
            href={`https://github.com/${username}/${name}`}
            target="_blank"
            rel="noopener"
            >{name}</a>
            <p>{getDescription()}</p>
          </div>
          
          <div className="spans"> 
            <span><RiStarSFill/> Estrelas: {stars}</span>
            <span><RiGitForkFill/> Forks: {forks}</span>
            <span><VscIssues/> Issues: {issues}</span>
            
          </div>
          
          <div>
            <a
            id="more"
            href={`https://github.com/${username}/${name}`}
            target="_blank"
            rel="noopener"
            >
              Ver mais
            </a>
          </div>
          
        </div>
        
      </div>
    </>
    )
}