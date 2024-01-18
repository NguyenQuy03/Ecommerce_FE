import { Link } from "react-router-dom";
import { Footer as AntFooter } from "antd/es/layout/layout";

function Footer() {
    return (
        <AntFooter
            style={{
                textAlign: 'center',
            }}
        >
            ©{new Date().getFullYear()} <Link to="/">ZECO</Link>. All Rights Reserved
        </AntFooter>
    );
}

export default Footer;
