import React from 'react'

import girl from '../static/images/scanner.png'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import '../static/css/about.css';


function About() {
    return (

        <div className="container">
            <Row>
                <Col lg={8}>
                    <div className="leftside">
                        <h1 className="topic1"> D-FRAUD<br></br>
                        Fake Product Monitoring🙌</h1>
                        <h6 className="para">
                            Risk factors like forging and duplication frequently accompany the global enhancement of a product or innovation. The reputation of the company and the well-being of the customer can both be affected by these factors. To enhance the system, this method seeks to build trust among the customer between the manufacturer supply chain and create a decentralized application to verify the authenticity for the whole operation.
                        </h6>
                        <h5 className="para1">🙌99% helpful for detection the product details accurately.
                        </h5>


                        {/* <a href='https://rzp.io/l/dkqGdj0F'> */}
                            <button type="button" className="btn btn-info button1">Review
                            </button>
                        {/* </a> */}
                        {/* <a href="https://celo-crypocurrency-demo.vercel.app/">
                            <button type="button" className="btn btn-info button1">Celo Donation</button>
                        </a> */}
                    </div>
                </Col>
                <Col lg={4}>
                    <div >
                        <img alt='img' className="image-location" src={girl} />
                    </div>
                </Col>
            </Row>
        </div >
    )
}

export default About
