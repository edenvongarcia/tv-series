import { NavLink } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav id="navbar" className='navbar-right'>
            <ul className="navbar-nav sf-menu sf-js-enabled sf-arrows">
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/search'>Search</NavLink></li>
                <li><NavLink to='/api'>TV Maze api</NavLink></li>
                <li><NavLink to='/about'>About</NavLink></li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
    )
}  