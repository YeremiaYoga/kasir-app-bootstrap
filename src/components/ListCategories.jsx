import { Col, ListGroup } from 'react-bootstrap'
import React, { useState, useEffect } from 'react';
import { API_URL } from "../utils/api";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUtensils, faCoffee, faCheese } from "@fortawesome/free-solid-svg-icons"

const Icon = ({ nama }) => {
    if (nama === "Makanan") {
        return <FontAwesomeIcon icon={faUtensils} className='mr-2' />
    } else if (nama === "Minuman") {
        return <FontAwesomeIcon icon={faCoffee} className='mr-2' />
    } else {
        return <FontAwesomeIcon icon={faCheese} className='mr-2' />
    }
}


const ListCategories = (props) => {

    const [Categories, setCategories] = useState([]);

    const { gantiKategori, kategori } = props;

    const getCategory = async () => {
        try {
            const response = await axios.get(API_URL + 'categories');
            setCategories(response.data);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <Col md={2} className='mt-2'>
            <h4><strong>Kategori</strong></h4>
            <ListGroup>
                {Categories.map((category) => (
                    <ListGroup.Item key={category.id}
                        onClick={() => gantiKategori(category.nama)}
                        className={kategori === category.nama && "kategori-aktif"}
                        style={{ cursor: 'pointer' }}>

                        <h5> <Icon nama={category.nama} />{category.nama}</h5>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Col>
    )
}
export default ListCategories;