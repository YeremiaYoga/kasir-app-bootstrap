
import { ListCategories, Keranjang, CardMenu } from "../components/index";
import { Row, Col, Container, Button } from 'react-bootstrap';
import { API_URL } from "../utils/api";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";


const HomePage = () => {
    const [menus, setMenus] = useState([]);
    const [kategori, setKategori] = useState('Makanan');
    const [keranjangs, setKeranjangs] = useState([]);
    const [keranjang, setKeranjang] = useState([]);

    const gantiKategori = (value) => {
        setKategori(value)
    }

    const keranjangInfo = (value) => {
        const tempKeranjang = keranjangs;
        // const tempKeranjang = keranjang;
        const itemKeranjang = tempKeranjang.find(item => item.product.id === value.id);
        if (itemKeranjang) {
            itemKeranjang.jumlah += 1;
            itemKeranjang.total_harga += value.harga;
            setKeranjang(tempKeranjang)
            updateKeranjang(value, itemKeranjang);
            // setKeranjang(val => val.map(v => {
            //   if (v.product.id === value.id) {
            //     return {
            //       ...v, jumlah: v.jumlah + 1, total_harga: v.total_harga + v.product.harga
            //     }

            //   }
            //   return v
            // }));

        } else {
            const requestData = {
                jumlah: 1,
                total_harga: value.harga,
                product: value
            };
            setKeranjang(val => [...val, requestData]);
            console.log(requestData)
            addKeranjang(requestData);

        }
    }
    const addKeranjang = async (value) => {
        await axios
            .post(API_URL + 'keranjangs', value)
            .then((res) => {
                Swal.fire({
                    title: "Berhasil Masuk Keranjang",
                    text: value.product.nama + " Berhasil Masuk Keranjang",
                    icon: "success",
                    timer: 1500,
                })
                getKeranjang();
            })
            .catch((error) => {
                console.log('error', error);
            })
    }
    const updateKeranjang = async (item, value) => {
        await axios
            .put(API_URL + 'keranjangs/' + item.id, value)
            .then((res) => {
                Swal.fire({
                    title: "Berhasil Update jumlah",
                    text: item.nama + " Berhasil Update Jumlah",
                    icon: "success",
                    timer: 1500,
                })
                getKeranjang();
            })
            .catch((error) => {
                console.log('error', error);
            })
    }
    const getKeranjang = async () => {
        try {
            const response = await axios.get(API_URL + 'keranjangs');
            setKeranjangs(response.data);

        } catch (error) {
            console.log('error', error);
        }
    };
    useEffect(() => {
        const getProduk = async () => {
            try {
                const response = await axios.get(API_URL + 'products?category.nama=' + kategori);
                setMenus(response.data);

            } catch (error) {
                console.log('error', error);
            }
        };
        getKeranjang();
        getProduk();
    }, [kategori])

    return (
        <div className="App">
            <div className="mt-3">
                <Container fluid>
                    <Row className="overflow-auto menu">
                        <ListCategories gantiKategori={gantiKategori} kategori={kategori} />
                        <Col className="mt-2">
                            <h4><strong>Daftar Menu</strong></h4>
                           
                            <hr />
                            <Row>
                                {menus.map((menu) => (
                                    <CardMenu key={menu.id} menu={menu} keranjangInfo={keranjangInfo} />
                                ))}
                            </Row>
                        </Col>
                        <Keranjang keranjang={keranjang} keranjangs={keranjangs} getKeranjang={getKeranjang} />
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default HomePage;
