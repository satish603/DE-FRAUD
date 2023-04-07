import { Link } from 'react-router-dom'
import '../static/css/footer.scss';
import logo from '../static/images/logo.png';
function Footer() {
    return (
        <footer className="footersection">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2 offset-lg-2 col-sm-4 offset-sm-2">
                        <div className="logopicdiv"><img src={logo} alt="logo" className="img-fluid logopic"></img></div>
                    </div>
                    <div className="col-lg-2 offset-lg-0 col-sm-4 offset-sm-0 list">

                        <h2>User</h2>
                        <ul >
                            <li>
                                <Link to='/verify'>Verify</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-2 offset-lg-0 col-sm-4 offset-sm-2 list">

                        <h2>Owner</h2>
                        <ul >
                            <li>
                                <Link to="/add">
                                    Add Product
                                </Link>
                            </li>

                        </ul>
                    </div>
                    <div className="col-lg-2 offset-lg-0 col-sm-4 offset-sm-0  list">
                        <ul >
                            
                            <li>
                                <Link to="/about">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="copyrights">
                <Link to="/">@2023 Copyright D-Fraud</Link>
            </div>
        </footer>
    )

}

export default Footer;