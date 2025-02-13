import { useContext } from "react"
import Layout from "../../Components/Layout"
import { ShoppingCartContext } from "../../Context"

function MyAccount() {
    const context = useContext(ShoppingCartContext)
    
    return (
      <>
      <Layout>
        My Account
        <div className="flex flex-col gap-3">
          <span>Hi {context.user.name}</span>
          <span>Email: {context.user.email}</span>
        </div>
      </Layout>
      </>
    )
  }
  
  export default MyAccount