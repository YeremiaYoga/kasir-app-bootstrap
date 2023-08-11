import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap'
import { API_URL } from "../utils/api";
import axios from "axios";
import Swal from "sweetalert2";
const EditKeranjang = ({ show, handleClose, detailkeranjang, getKeranjang }) => {

    const [inputketerangan, setKeterangan] = useState();
    const [inputjumlah, setJumlah] = useState();


    const formattedPrice = (value) => {
        return value.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
        });
    }
    // const tambah = () => {
    //     setJumlah(inputjumlah + 1)

    // }
    // const kurang = () => {
    //     if (inputjumlah !== 1) {
    //         setJumlah(inputjumlah - 1)

    //     }

    // }

    useEffect(() => {
        if (detailkeranjang) {
            setJumlah(detailkeranjang.jumlah)
            if (!detailkeranjang.keterangan) {
                setKeterangan("")
            } else {
                setKeterangan(detailkeranjang.keterangan)
            }

        }
    }, [detailkeranjang])

    const updateDataKeranjang = async (detailkeranjang) => {
        const { id, product } = detailkeranjang;
        const updateItem = {
            jumlah: inputjumlah,
            keterangan: inputketerangan,
            total_harga: inputjumlah * product.harga,
            product: product
        }
        await axios
            .put(API_URL + 'keranjangs/' + id, updateItem)
            .then((res) => {
                Swal.fire({
                    title: "Berhasil Update Keranjang",
                    text: "Berhasil Update Keranjang",
                    icon: "success",
                    timer: 1500,
                })
                getKeranjang();

            })
            .catch((error) => {
                console.log('error', error);
            })
    }
    const hapusPesanan = async (id) => {
        await axios
            .delete(API_URL + 'keranjangs/' + id)
            .then((res) => {
                Swal.fire({
                    title: "Berhasil Hapus Keranjang",
                    text: "Berhasil Hapus Keranjang",
                    icon: "error",
                    timer: 1500,
                })
                getKeranjang();
                handleClose();

            })
            .catch((error) => {
                console.log('error', error);
            })
    }
    const handleSubmit = (event) => {
        updateDataKeranjang(detailkeranjang)
        event.preventDefault();
        handleClose();
    }

    if (detailkeranjang) {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{detailkeranjang.product.nama} <strong>({formattedPrice(detailkeranjang.product.harga)})</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group className="mb-3" >
                            <Form.Label>Total Harga</Form.Label>
                            <strong><p>{formattedPrice(inputjumlah * detailkeranjang.product.harga)}</p></strong>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Jumlah : </Form.Label>
                            <br />
                            <Button className="" variant="primary" size="sm" onClick={() => {
                                if (inputjumlah !== 1) {
                                    setJumlah(inputjumlah - 1)
                                }
                            }
                            }>
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>
                            <strong>{inputjumlah}</strong>
                            <Button variant="primary" size="sm" className="ml-2" onClick={() => setJumlah(inputjumlah + 1)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Keterangan</Form.Label>
                            <Form.Control as="textarea" value={inputketerangan} onChange={(e) => setKeterangan(e.target.value)} placeholder="Contoh: dibakarkan" />
                        </Form.Group>
                    </Form>
                    <Button variant="primary" onClick={handleSubmit}>Simpan</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => hapusPesanan(detailkeranjang.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                        Hapus Pesanan
                    </Button>

                </Modal.Footer>
            </Modal>
        )
    } else {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Kosong</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}
export default EditKeranjang;