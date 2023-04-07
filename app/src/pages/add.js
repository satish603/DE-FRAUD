import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import { Formik, Form as Fm, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
// eslint-disable-next-line
import { popups, secretId as si } from '../store/atoms'
import { useSetRecoilState } from 'recoil'
import provider from '../store/web3Provider'
import '../static/css/login.scss';


export default function AddProduct() {

    //local state
    const [productId, setProductId] = useState('');

    const setPopup = useSetRecoilState(popups)
    // add from data to mongodb
    const schema = yup.object({
        name: yup.string().required('Required!').max(250, 'ProductName Should be less than 250 characters').test('no Num', "Number not allowed", async (val) => { if (val) { return await !val.match(/[0-9]+/) } return false }).test('noSpecial', "Special characters not allowed", async (val) => { if (val) { return await val.match(/[a-z]/i) } return false }),
        price: yup.string().required('Required!'),
        productId: yup.string().required('Required!').max(50),
    });

    const initialValues = {
        name: "",
        price: "",
        productId: "",
    }
    async function addProduct(values) {
        try {
            // // to check if product already exists
            const check = await fetch('http://localhost:8000/product_details/' + values.productId);
            //check if product already exists
            if (check.status === 200) {
                setPopup('Product already exists');
                alert('Product already exists');
                return;
            }
            // send transaction for adding a product....
            const hash = provider.keccakHash(values.productId)
            await provider.sendTransaction('addProduct', [values.productId, hash, values.price, values.name]);

            setProductId(values.productId)
            setPopup('Product added successfully');

            // Make HTTP request to add product data to MongoDB
            const response = await fetch('http://localhost:8000/add_product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            console.log(data);
            // alert('Product added successfully');
        } catch (error) {
            setPopup('Failed to add product');
            console.log(error)
        }
    }



    if (productId) {
        return (
            <Redirect to={`/qrcode/${productId}`} />
        )
    }

    return (<section>
        <div className="containerS">
            <div className="frame">
                <div className="nav">
                    <ul className="links">
                        <li className="signin-active"><a href="/#" className="btn">Add Product</a></li>
                    </ul>
                </div>
                <div className="formParent">
                    <Formik
                        validationSchema={schema}
                        onSubmit={addProduct}
                        initialValues={initialValues}
                        method="post" action="/add"
                    >
                        <Fm key={1} className="form-signin" name="form">

                            <Form.Row>
                                <Form.Group as={Col} controlId="1">
                                    <Form.Label>Name</Form.Label>
                                    <Field
                                        tabIndex="1"
                                        type="text"
                                        placeholder="Product Name"
                                        name="name"
                                        className="form-styling" />
                                    <ErrorMessage name="name" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="2">
                                    <Form.Label>Price</Form.Label>
                                    <Field
                                        tabIndex="2"
                                        type="text"
                                        placeholder="Product Price"
                                        name="price"
                                        className="form-styling" />
                                    <ErrorMessage name="price" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="3">
                                    <Form.Label className='label'>Product ID</Form.Label>
                                    <Field
                                        tabIndex="3"
                                        type="text"
                                        placeholder="Product ID"
                                        name="productId"
                                        className="form-styling" />
                                    <ErrorMessage name="productId" />
                                </Form.Group>
                            </Form.Row>
                            <Button className="btn btn-signup" tabIndex="5" type="submit" >Add Product</Button>

                        </Fm>
                    </Formik>
                </div>
            </div>
        </div>
    </section>
    )
}