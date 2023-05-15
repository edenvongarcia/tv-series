import Logo from '../Logo';
import { Navbar } from '../Navbar';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header id="header" className="header-scrolled">
        <div className="stuck_container">
            <div className="navbar navbar-default navbar-static-top ">
                <div className="container">
                    <div className="navbar-header">
                        <Logo pageHeading="Series List" />
                    </div>
                    
                    <Navbar />
                </div>
            </div>
        </div>

        <div className="bg-primary well">
            <div className="container text-center">
                <ul className="inline-list inline-list--nav">
                    <li><NavLink to='/countdown'>COUNTDOWN</NavLink></li>
                    <li><a href="#">CARTOONS</a></li>
                    <li><a href="#">ANIME</a></li>
                    <li><a href="#">NEW</a></li>
                </ul>
            </div>
        </div>
    </header>
);

export default Header;
