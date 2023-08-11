import { Col, ListGroup, Row, Badge, Card } from 'react-bootstrap'
import { useState } from 'react';

import { EditKeranjang, TotalBayar } from "./index";


const Keranjang = ({ keranjang, keranjangs, getKeranjang }) => {

    const [show, setShow] = useState(false);
    const [detailkeranjang, setdetailkeranjang] = useState();

    const handleOpen = (item) => {

        setShow(true);
        setdetailkeranjang(item);

    }
    const handleClose = () => {
        setShow(false)
    }

    const formattedPrice = (value) => {
        return value.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
        });
    }
    return (
        <Col md={3} className='mt-2'>
            <h4><strong>Keranjang</strong></h4>
            {/* {keranjang.length !== 0 &&
            <Card className='overflow-auto keranjang'>
             < ListGroup variant="flush">
                    {keranjang.map((item) => (
                        <ListGroup.Item >
                            <Row>
                                <Col xs={2}>
                                    <h4>
                                        <Badge pill variant="success">
                                            {item.jumlah}
                                        </Badge>
                                    </h4>
                                </Col>
                                <Col>
                                    <h5>{item.product.nama}</h5>
                                    <p>{formattedPrice(item.product.harga)}</p>
                                </Col>
                                <Col>
                                    <strong className='float-right'><p>{formattedPrice(item.total_harga)}</p></strong> </Col>
                            </Row>
                        </ListGroup.Item>
                    ))
                    }
                </ListGroup>
            </Card>
               
            } */}
            {keranjangs.length !== 0 &&
                <Card className='overflow-auto keranjang'>
                    < ListGroup variant="flush">

                        {keranjangs.map((item) => (
                            <ListGroup.Item key={item.id} onClick={() => handleOpen(item)}>
                                <Row>
                                    <Col xs={2}>
                                        <h4>
                                            <Badge pill variant="success">
                                                {item.jumlah}
                                            </Badge>
                                        </h4>
                                    </Col>
                                    <Col>
                                        <h5>{item.product.nama}</h5>
                                        <p>{formattedPrice(item.product.harga)}</p>
                                    </Col>
                                    <Col>
                                        <strong className='float-end'><p>{formattedPrice(item.total_harga)}</p></strong> </Col>
                                </Row>
                            </ListGroup.Item>
                        ))
                        }


                        <EditKeranjang show={show} handleClose={handleClose} detailkeranjang={detailkeranjang} getKeranjang={getKeranjang} />
                    </ListGroup>
                </Card>
            }
            <TotalBayar keranjang={keranjang} keranjangs={keranjangs} />
        </Col >
    )
}
export default Keranjang;