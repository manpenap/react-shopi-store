import { useContext, useState } from "react"
import Layout from "../../Components/Layout"
import { ShoppingCartContext } from "../../Context"
import  Modal  from "../../Components/Modal"
import { useNavigate } from "react-router-dom"

function LogIn() {
    const context = useContext(ShoppingCartContext)
    const [openModal, setOpenModal] = useState(false)
    const [isPasswordWrong, setIsPasswordWrong] = useState(false)
    const [emailCreated, setEmailCreated] = useState(false)
    const navigate = useNavigate()
    
    const saveUser = (newUser) => {
        localStorage.setItem('USERS_DATA',JSON.stringify(newUser))
        context.setUsers(newUser)
    }
      
    const addUser = (name, email, password) => {
    const newUsers = [...context.users]
    newUsers.push({
        name,
        email,
        password,
        orders:[]
    })
    
    saveUser(newUsers) 
    }


    const logInUser = (event)=>{
        event.preventDefault()
        const emailList = context.users.map(user => user.email.toLowerCase())
        const isEmailCreated = emailList.includes(context.emailLogIn.toLowerCase())
        

        if (isEmailCreated){
            setEmailCreated(true)
            return setOpenModal(true)    
        } else setEmailCreated(false)
        
        if (!(context.password1LogIn === context.password2LogIn)){
            setIsPasswordWrong(true)
            return setOpenModal(true)
        } else setIsPasswordWrong(false)

        addUser(context.nameLogIn,context.emailLogIn,context.password1LogIn)
        navigate('/sign-in')
    }

    return (
      <>
        <Layout>
            Log In
            < main className="flex flex-col mt-8 justify-items-center">
                <form onSubmit={logInUser} className="flex flex-col gap-3">
                    <input
                        type={'text'}
                        required={true}
                        value={context.nameLogIn}
                        onChange={(e)=>context.setNameLogIn(e.target.value)}
                        className='rounded-lg border border-black w-80 h-12 p-4 focus:outline-none'
                        placeholder="Name">
                    </input>
                    <input
                        type={"email"}
                        required={true}
                        value={context.emailLogIn}
                        onChange={(e)=>context.setEmailLogIn(e.target.value)}
                        className='rounded-lg border border-black w-80 h-12 p-4 focus:outline-none'
                        placeholder="E-Mail">
                    </input>
                    <input
                        type={"password"}
                        required={true}
                        value={context.password1LogIn}
                        onChange={(e)=>context.setPassword1LogIn(e.target.value)}
                        className='rounded-lg border border-black w-80 h-12 p-4  focus:outline-none'
                        placeholder="Password">  
                    </input>
                    <input
                        type={"password"}
                        required={true}
                        value={context.password2LogIn}
                        onChange={(e)=>context.setPassword2LogIn(e.target.value)}
                        className='rounded-lg border border-black w-80 h-12 p-4  focus:outline-none'
                        placeholder="Repeat your Password">
                    </input>
                    <button className='bg-black text-white rounded-lg h-8'>Log In</button>
            </form>
            {openModal && (
            <Modal>
                <p className={`${emailCreated ? 'flex' : 'hidden'} mt-2 justify-center text-red-700 text-md`}>Ya existe un usurario con este email</p>
                <p className={`${isPasswordWrong ? 'flex' : 'hidden'} mt-2 justify-center text-red-700 text-md`}>Las password ingresadas no coinciden</p>
            </Modal>
            )}
            </ main>

        </Layout>
      </>
    )
  }
  
  export default LogIn