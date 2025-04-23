import "./ButtonStyles.css";;

export default function Button({ className, click, children }) {
    
  return (
      <>
        <button className={className} onClick={click}>{children}</button>
      </>
        
    );
}