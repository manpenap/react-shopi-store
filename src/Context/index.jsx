import { createContext, useState, useEffect  } from 'react'

export const ShoppingCartContext = createContext()


// eslint-disable-next-line react/prop-types
export const ShoppingCartProvider = ({children})=>{
    //Shopping Cart - Increment quantity
    const [count, setCount] = useState(0)

    //Checkout Detail - Open/Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = ()=> setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = ()=> setIsCheckoutSideMenuOpen(false)
    
    //Product Detail - Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail = ()=> setIsProductDetailOpen(true)
    const closeProductDetail = ()=> setIsProductDetailOpen(false)

    //Product Detail - Show product
    const [productToShow, setProductToShow] = useState({})
    
    //Shopping Cart - Add products to cart
    const [cartProducts, setCartProducts] = useState([])

    //Shopping Cart - Order
    const [order, setOrder] = useState([])

    //Get products
    const [items, setItems] = useState(null)
    const [filteredItems, setFilteredItems] = useState(null)

    //Get products by title
    const [searchByTitle, setSearchByTitle] = useState(null)
    

    //Get products by category
    const [searchByCategory, setSearchByCategory] = useState(null)
   
    // Validate sign in 
    const [isLoginOut, setIsLoginOut] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState({})

    // Validate log in 
    const [nameLogIn, setNameLogIn] = useState('')
    const [emailLogIn, setEmailLogIn] = useState('')
    const [password1LogIn, setPassword1LogIn] = useState('')
    const [password2LogIn, setPassword2LogIn] = useState('')

    // Get user data
    const [users, setUsers] = useState([])  
    




    useEffect(()=>{
        fetch('https://api.escuelajs.co/api/v1/products')
          .then(response => response.json())
          .then(data => setItems(data))

        
        const localStorageUsers = localStorage.getItem('USERS_DATA')
        let parsedItem

        if(!localStorageUsers){
          localStorage.setItem('USERS_DATA',JSON.stringify([]))
          parsedItem = []
        } else {
          parsedItem = JSON.parse(localStorageUsers)
          setUsers(parsedItem)
        }
        
      },[])

    const filteredItemsByTitle = (items, searchByTitle)=>{
        return items?.filter(item=>item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    const filteredItemsByCategory = (items, searchByCategory)=>{
        return items?.filter(item=>item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
    }

    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if (searchType === 'BY_TITLE') {
          return filteredItemsByTitle(items, searchByTitle)
        }
    
        if (searchType === 'BY_CATEGORY') {
          return filteredItemsByCategory(items, searchByCategory)
        }
    
        if (searchType === 'BY_TITLE_AND_CATEGORY') {
          return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }
    
        if (!searchType) {
          return items
        }
      }

    useEffect(() => {
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
    }, [items, searchByTitle, searchByCategory])




    return(
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            isCheckoutSideMenuOpen,
            order,
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            setFilteredItems,
            searchByCategory,
            setSearchByCategory,
            isLoginOut,
            setIsLoginOut,
            email,
            setEmail,
            password,
            setPassword,
            nameLogIn,
            setNameLogIn,
            emailLogIn,
            setEmailLogIn,
            password1LogIn,
            setPassword1LogIn,
            password2LogIn,
            setPassword2LogIn,
            users,
            setUsers,
            user,
            setUser
          

        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}