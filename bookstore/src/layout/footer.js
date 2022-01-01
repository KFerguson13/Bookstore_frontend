import './footer.css';
import {Navbar, Row, Col} from 'react-bootstrap';

const Footer = () => {
    return (
        <Navbar bg="dark" className = "footer">
            <Row className = "footer_row">

                <Col className = "col-3-lg col-1-sm">
                    <h2> Book Store </h2>
                </Col>

                <Col className = "col-4-lg col-2-sm">
                    <h2> Contact Us </h2>
                    <hr/>
                    <ul className = "footer_list">
                        <li>
                            Email: BookStore@gmail.com
                        </li>
                        <li>
                            Phone: 1(123)123-1234
                        </li>
                    </ul>
                </Col>

                <Col className = "col-4-lg col-2-sm">
                    <h2> Follow Us For News At </h2>
                    <hr/>
                    <ul className = "footer_list">
                        <li>
                            Facebook
                        </li>
                        <li>
                            Instagram
                        </li>
                        <li>
                            Twitter
                        </li>
                    </ul>
                </Col>
                
            </Row>
        </Navbar>
    )
}

export default Footer;