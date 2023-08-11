import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { Row, Col, Button } from "react-bootstrap";

import { API_URL } from "../utils/api";
import axios from "axios";
// import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';


const TotalBayar = ({ keranjang, keranjangs }) => {
    const navigate = useNavigate();
    const submitPembayaran = async (totalbayar) => {

        const pesanan = {
            totalbayar: totalbayar,
            menus: keranjangs,
        }

        await axios
            .post(API_URL + 'pesanans', pesanan)
            .then((res) => {
                // Swal.fire({
                //     title: "Pembayaran Berhasil",
                //     text: "Pembayaran Berhasil",
                //     icon: "success",
                //     timer: 1500,
                // })
                navigate("/sukses");

            })
            .catch((error) => {
                console.log('error', error);
            })


    }

    const totalbayar = keranjangs.reduce(function (result, item) {
        return result + item.total_harga;
    }, 0);
    const formattedPrice = (value) => {
        return value.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
        });
    }
    return (
        <>
            <div className="fixed-bottom d-none d-md-block">
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className="px-4">
                        <h4>Total Bayar : <strong className='float-end mr-2'>{formattedPrice(totalbayar)}</strong> </h4>
                        <Button variant="primary" block size="lg" className="mb-2 mt-4" onClick={() => submitPembayaran(totalbayar)}>
                            <FontAwesomeIcon icon={faShoppingCart} /> <strong>Bayar</strong>
                        </Button>
                    </Col>
                </Row>
            </div>
            <div className="d-sm-block d-md-none">
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className="px-4">
                        <h4>Total Bayar : <strong className='float-end mr-2'>{formattedPrice(totalbayar)}</strong> </h4>
                        <Button variant="primary" block size="lg" className="mb-2 mt-4" onClick={() => submitPembayaran(totalbayar)}>
                            <FontAwesomeIcon icon={faShoppingCart} /> <strong>Bayar</strong>
                        </Button>
                    </Col>
                </Row>
            </div>
        </>

    )
}

export default TotalBayar;