import { useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import Layout from "../../Components/Layout"
import { ShoppingCartContext } from "../../Context"
import Modal from "../../Components/Modal"

function SignIn() {
    const context = useContext(ShoppingCartContext)
    const [emailOk, setEmailOk] = useState(true)
    const [passwordOk, setPasswordOk] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const navigate = useNavigate()

    const onSubmit = (event) => {
      event.preventDefault()
      const emailList = context.users.map(user => user.email.toLowerCase())
      const indexOfUser = emailList.indexOf(context.email.toLowerCase())

      
      if (indexOfUser === -1){
        setEmailOk(false)
        return setOpenModal(true)    
      } 
      
      if (context.users[indexOfUser].password !== context.password){
        setEmailOk(true)
        setPasswordOk(false)
        return setOpenModal(true)  
      } else {
        context.setUser(context.users[indexOfUser])
        setEmailOk(true)
        setPasswordOk(true)
        context.setIsLoginOut(false)
        navigate('/')
      }
      

    }
    

    return (
      <>
        <Layout>
          <main className="flex flex-col mt-8 justify-items-center">
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                required={true}
                value={context.email}
                onChange={(e)=>context.setEmail(e.target.value)}
                className='rounded-lg border border-black w-80 h-12 p-4 focus:outline-none'
                placeholder="E-Mail"></input>
              <input
                type={"password"}
                required={true}
                value = {context.password}
                onChange={(e)=>context.setPassword(e.target.value)}
                className='rounded-lg border border-black w-80 h-12 p-4  focus:outline-none'
                placeholder="Password"></input>
              <button className='bg-black text-white rounded-lg h-8'>Sign In</button>
            </form>
            <div className="flex justify-center my-3">
              <NavLink className='text-sm text-black/60'>Recover your password</NavLink>
            </div>
            <button className="bg-gray-100 rounded-lg h-8" >
              <NavLink to='/log-in'>Log In</NavLink>
            </button>

            {openModal && (
            <Modal>
                <p className={`${!emailOk ? 'flex' : 'hidden'} mt-2 justify-center text-red-700 text-md`}>No existe usuario con este email</p>
                <p className={`${!passwordOk ? 'flex' : 'hidden'} mt-2 justify-center text-red-700 text-md`}>Password incorrecto</p>
            </Modal>
            )}
          </main> 
        </Layout>
      </>
    )
  }
  
  export default SignIn