import React from "react"
import { Col, Card } from "react-bootstrap"

const CardMenu = ({ menu, keranjangInfo }) => {
    const formattedPrice =  menu.harga.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
    });
    return (
        <Col md={4} xs={6} className="mb-4">
            <Card className="shadow" onClick={() => keranjangInfo(menu)}>
                <Card.Img variant="top" src={"assets/images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar}  />
                <Card.Body>
                    <Card.Title>{menu.nama} <strong>{menu.kode}</strong></Card.Title>
                    <Card.Text>
                        {formattedPrice}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default CardMenu;