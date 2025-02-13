import { useContext } from "react"
import Layout from "../../Components/Layout"
import Card from "../../Components/Card"
import ProductDetail from "../../Components/ProductDetail"
import { ShoppingCartContext } from "../../Context"


function Home() {
  
  const context = useContext(ShoppingCartContext)
  
  let renderTitle = (title ='Shopping Products')=>title

  const renderView = () => {
    if (context.filteredItems?.length > 0) {
      return (
        context.filteredItems?.map(item => (
          <Card key={item.id} data={item} />
        ))
      )
    } else {
      return (
        <div>We don't have anything :(</div>
      )
    }
  }
  
  return (
    <>
      <Layout>
        <div className='flex items-center justify-center relative w-80 mb-4'>
          <h1>{renderTitle()}</h1>
        </div>
        <input 
          type='text' 
          placeholder='Search a product'
          className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
          onChange={(event)=>context.setSearchByTitle(event.target.value)}/>
        <main className='flex flex-row p-2 flex-wrap justify-center w-full'>
          {renderView()}
        </main>

       <ProductDetail />

      </Layout>
    </>
  )
}


export default Home