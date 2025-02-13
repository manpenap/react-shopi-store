import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import { PlusIcon, CheckIcon } from '@heroicons/react/24/outline'

const Card = (data) => {
    const context = useContext(ShoppingCartContext)

    const showProduct = (productDetail) => {
        context.openProductDetail()
        context.closeCheckoutSideMenu()
        context.setProductToShow(productDetail)
    }

    const addProductToCart = (event, productData) => {
        if (context.isLoginOut) {
            alert("You need to log in to add products to the shopping cart.")
            return
        }
        
        event.stopPropagation()
        context.openCheckoutSideMenu()
        context.closeProductDetail()
        context.setCartProducts([...context.cartProducts, productData])
        context.setCount(context.count + 1)
    }

    const renderIcon = (id) => {
        const isInCart = context.cartProducts.some(product => product.id === id)

        return (
            <div 
                className={`absolute top-0 right-0 flex justify-center items-center ${isInCart ? 'bg-black' : 'bg-white'} w-6 h-6 rounded-full m-2 p-1`} 
                onClick={!isInCart ? (event) => addProductToCart(event, data.data) : undefined}
            >
                {isInCart ? <CheckIcon className='w-4 h-4 text-white' /> : <PlusIcon className='w-4 h-4' />}
            </div>
        )
    }

    // Normalizar la URL de la imagen para evitar caracteres extra
    const imageUrl = (() => {
        if (Array.isArray(data.data.images)) {
            return data.data.images[0]
        }
        try {
            let parsedImages = JSON.parse(data.data.images)
            if (typeof parsedImages === 'string') {
                parsedImages = JSON.parse(parsedImages) // Doble parseo si es necesario
            }
            if (Array.isArray(parsedImages) && parsedImages.length > 0) {
                return parsedImages[0]
            }
        } catch (error) {
            // Si falla el JSON.parse, intentamos limpiar el string manualmente
            return data.data.images.replace(/\["|"\]/g, '').trim()
        }
        return data.data.images.trim()
    })()

    return (
        <div 
            className='bg-white cursor-pointer w-60 h-60 m-1 rounded-lg'
            onClick={() => showProduct(data.data)}>
            <figure className='relative mb-2 w-full h-4/5'>
                <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>{data.data.category.name}</span>
                <img className='w-full h-full object-cover rounded-lg' src={imageUrl} alt={data.data.title} />
                {renderIcon(data.data.id)}
            </figure>
            <p className='flex justify-between'>
                <span className='text-sm font-light'>{data.data.title}</span>
                <span className='text-lg font-medium'>${data.data.price}</span>
            </p>
        </div>
    )
}

export default Card

