import React from 'react';  

const Footer = props => (  
    <footer>
        <div className='container footer-bottom clearfix'>
            <div className="row">
                <div className="col-md-3 col-sm-3 col-xs-12">
                    <p className="copyright">
                        {props.copyright}
                    </p>
                </div>

                <div className="col-md-6 col-sm-6 col-xs-12">

                </div>

                <div className="col-md-3 col-sm-3 col-xs-12">
                    <ul className="inline-list">
                        <li><a className="fa fa-github" href="https://github.com/edenvongarcia/" target="_blank"></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>  
);

export default Footer;