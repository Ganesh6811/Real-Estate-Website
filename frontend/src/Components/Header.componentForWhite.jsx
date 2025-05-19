import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const clickedProperties = () => {
        navigate("/properties");
    }

    const clickedHome = () => {
        navigate("/");
    }

    const onClickAboutMe = () => {
        navigate("/aboutMe");
    }

    const clickedContactUs = () => {
        navigate("/contactUs");
    }

    return (
        <div className="container py-3">
            <div className="d-flex justify-content-between align-items-center">

                {/* Left side - Logo or Home */}
                <div className="d-flex align-items-center gap-2">
                    <img src="/homeLogo.png" alt="Logo" style={{ height: "25px", width: "auto" }} />
                    <p style={{ fontSize: "24px", fontWeight: "600", color: "#333", margin: 0 }}>Your Home</p>
                </div>

                {/* Center - Navigation */}
                <nav>
                    <ul className="d-flex list-unstyled gap-4 mb-0">
                        <li><a href="#Home" className="text-decoration-none text-black" style={{ fontWeight: 600 }} onClick={() => clickedHome()}>Home</a></li>
                        <li><a href="#Properties" className="text-decoration-none text-black" style={{ fontWeight: 600 }} onClick={() => clickedProperties()}>Properties</a></li>
                        <li><a href="#About" className="text-decoration-none text-black" style={{ fontWeight: 600 }} onClick={()=>clickedContactUs()} >Contact Us</a></li>
                    </ul>
                </nav>

                {/* Right side - User Name */}
                <div>
                    <a href="#About" className="text-decoration-none text-black" style={{ fontWeight: 600 }} onClick={() => { onClickAboutMe() }}>About Me</a>
                </div>

            </div>
        </div>
    );
};

export default Header;
