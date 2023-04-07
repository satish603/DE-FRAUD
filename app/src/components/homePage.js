import React from 'react'
import './home.css'
import gif from './homeGif.gif'
import { Card } from "react-bootstrap";
import '../static/css/home.css'

const Home = () => {
    return (
        <div className='home'>
            <div class="row">


                <div class="col-md-6 head-left">
                    <h1 class="hl-line">Add your innovations and secure them!</h1>
                    <button type="button" class="btn btn-lg btn-dark download-btn"> Add product</button>

                </div>
                <div class="col-md-6 head-right">
                    <img class="home-img" src={gif} className="title-img" alt="gif"></img>
                </div>


            </div>
           
            <h1 className='headd-2'>
                    Benefits of Having Fake Product Detection
                </h1>
            <div className="contain-3">
                <Card style={{ width: '18rem' }} className="card-scheme">
                    <Card.Body>
                        <Card.Title>Provide security
                        </Card.Title>
                        
                        <Card.Text>
                        To provide security to the clients by offering product detailed information.
This will help to maintain customer trust and to increase the brand value of
the product in the market.

                        </Card.Text>

                        {/* <Card.Link href="https://en.wikipedia.org/wiki/Midday_Meal_Scheme">Read more</Card.Link> */}
                    </Card.Body>
                </Card>

                <Card style={{ width: '18rem' }} className="card-scheme">
                    <Card.Body>
                        <Card.Title>Authenticity of
a product</Card.Title>
                        
                        <Card.Text>
                        To ensures traceability and authenticity of
a product.It uses QR code for authenticating the product originality that shows the details of the for product so that we can say that product is authentic.

                        </Card.Text>

                        {/* <Card.Link href="https://wcd.nic.in/schemes/maternity-benefit-programme">Read more</Card.Link> */}
                    </Card.Body>
                </Card>

                <Card style={{ width: '18rem' }} className="card-scheme">
                    <Card.Body>
                        <Card.Title>To detect counterfeit products</Card.Title>
                        
                        <Card.Text>
                        This is how the manufacturer is
able to prove their product is authentic and is also able to track their product's
pathway to the customer.
                        </Card.Text>

                        {/* <Card.Link href="https://wcd.nic.in/schemes/maternity-benefit-programme">Read more</Card.Link> */}
                    </Card.Body>
                </Card>
            </div>

        </div>


    )


}

export default Home;