import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const activeStyle = 'underline underline-offset-4';
    const context = useContext(ShoppingCartContext);

    const signOut = () => {
        context.setIsLoginOut(true);
        context.setEmail(null);
        context.setPassword(null);
    };

    const showCart = (event) => {
        event.stopPropagation()
        if (context.isLoginOut) {
            alert("You need to log in to add products to the shopping cart.")
            return
        }
        context.openCheckoutSideMenu()
        context.closeProductDetail()
    }

    return (
        <nav className='fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white flex gap-3 justify-between items-center'>
            {/* Botón de menú hamburguesa */}
            <button className="md:hidden" onClick={() => setMenuOpen(true)}>
                <Bars3Icon className='w-6 h-6' />
            </button>

            <div className='flex md:hidden items-center gap-3'>
                <ShoppingCartIcon className='w-6 h-6' onClick={(event) => showCart(event)} />
            </div>
            
            {/* Menú en pantallas grandes */}
            <ul className='hidden md:flex items-center gap-3'>
                <li className="font-bold text-lg">
                    <NavLink to='/' onClick={() => context.setSearchByCategory()}>Shopi</NavLink>
                </li>
                <li><NavLink to={`${context.isLoginOut ? '/all/not-login' : '/all'}`} onClick={() => context.setSearchByCategory()} className={({ isActive }) => isActive ? activeStyle : undefined}>All</NavLink></li>
                <li><NavLink to={`${context.isLoginOut ? '/clothes/not-login' : '/clothes'}`} onClick={() => context.setSearchByCategory('clothes')} className={({ isActive }) => isActive ? activeStyle : undefined}>Clothes</NavLink></li>
                <li><NavLink to={`${context.isLoginOut ? '/electronics/not-login' : '/electronics'}`} onClick={() => context.setSearchByCategory('electronics')} className={({ isActive }) => isActive ? activeStyle : undefined}>Electronics</NavLink></li>
                <li><NavLink to={`${context.isLoginOut ? '/furniture/not-login' : '/furniture'}`} onClick={() => context.setSearchByCategory('furniture')} className={({ isActive }) => isActive ? activeStyle : undefined}>Furnitures</NavLink></li>
                <li><NavLink to={`${context.isLoginOut ? '/shoes/not-login' : '/shoes'}`} onClick={() => context.setSearchByCategory('shoes')} className={({ isActive }) => isActive ? activeStyle : undefined}>Shoes</NavLink></li>
                <li><NavLink to={`${context.isLoginOut ? '/others/not-login' : '/others'}`} onClick={() => context.setSearchByCategory('others')} className={({ isActive }) => isActive ? activeStyle : undefined}>Others</NavLink></li>
            </ul>
            
            {/* Sección derecha del Navbar en pantallas grandes */}
            <ul className='hidden md:flex items-center gap-3'>
                {!context.isLoginOut && <li className='text-black/60'>{context.email}</li>}
                {!context.isLoginOut && <li><NavLink to='/my-orders' className={({ isActive }) => isActive ? activeStyle : undefined}>My Orders</NavLink></li>}
                {!context.isLoginOut && <li><NavLink to='/my-account' className={({ isActive }) => isActive ? activeStyle : undefined}>My Account</NavLink></li>}
                <li className={`${context.isLoginOut ? 'mr-5':''}`}>
                    <NavLink to='/sign-in' onClick={signOut} className={({ isActive }) => isActive ? activeStyle : undefined}>
                        {context.isLoginOut ? 'Sign In' : 'Sign Out'}
                    </NavLink>
                </li>
                {!context.isLoginOut && (
                    <li className='flex items-center'>
                        <ShoppingCartIcon className='w-5 h-5' onClick={(event)=>showCart(event)}/> 
                        <div className='w-5 h-5 text-xs'>{context.count}</div>
                    </li>
                )}
            </ul>
            
            {/* Menú desplegable en móviles */}
            {menuOpen && (
                <div className='fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center z-20'>
                    <button className='absolute top-5 right-5' onClick={() => setMenuOpen(false)}>
                        <XMarkIcon className='w-6 h-6' />
                    </button>
                    

                    <ul className='flex flex-col items-center gap-6 text-lg'>
                        <li><NavLink to='/' onClick={() => { setMenuOpen(false); context.setSearchByCategory(); }}>Shopi</NavLink></li>
                        <li><NavLink to='/all' onClick={() => { setMenuOpen(false); context.setSearchByCategory(); }}>All</NavLink></li>
                        <li><NavLink to='/clothes' onClick={() => { setMenuOpen(false); context.setSearchByCategory('clothes'); }}>Clothes</NavLink></li>
                        <li><NavLink to='/electronics' onClick={() => { setMenuOpen(false); context.setSearchByCategory('electronics'); }}>Electronics</NavLink></li>
                        <li><NavLink to='/furniture' onClick={() => { setMenuOpen(false); context.setSearchByCategory('furniture'); }}>Furnitures</NavLink></li>
                        <li><NavLink to='/shoes' onClick={() => { setMenuOpen(false); context.setSearchByCategory('shoes'); }}>Shoes</NavLink></li>
                        <li><NavLink to='/others' onClick={() => { setMenuOpen(false); context.setSearchByCategory('others'); }}>Others</NavLink></li>
                    </ul>



                    <hr className='w-3/4 my-6 border-gray-300' />
                    <ul className='flex flex-col items-center gap-4 text-lg'>
                        {!context.isLoginOut && <li className='text-black/60'>{context.email}</li>}
                        {!context.isLoginOut && <li><NavLink to='/my-orders' onClick={() => setMenuOpen(false)}>My Orders</NavLink></li>}
                        {!context.isLoginOut && <li><NavLink to='/my-account' onClick={() => setMenuOpen(false)}>My Account</NavLink></li>}
                        <li>
                            <NavLink to='/sign-in' onClick={() => setMenuOpen(false)}>
                                {context.isLoginOut ? 'Sign In' : 'Sign Out'}
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
