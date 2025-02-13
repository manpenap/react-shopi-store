
import ReactDOM from "react-dom"


 function Modal ({ children }){
    return ReactDOM.createPortal(
        <div>
            {children}
        </div>,
        document.getElementById('modal')
    );
 } 

 export default Modal