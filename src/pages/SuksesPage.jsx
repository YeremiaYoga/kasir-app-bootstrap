import React, { useEffect, useState } from "react"
import { Button, Image } from "react-bootstrap"
import { Link } from "react-router-dom";
import { API_URL } from "../utils/api";
import axios from "axios";

const SuksesPage = () => {
    const [keranjangs, setKeranjangs] = useState([]);
    useEffect(() => {
        const deleteAllKeranjangs = async () => {
            try {
                const response = await axios.get(API_URL + 'keranjangs');
                const keranjangsData = response.data;

               
                await Promise.all(
                    keranjangsData.map(async (item) => {
                        try {
                            if (item) {
                                await axios.delete(API_URL + 'keranjangs/' + item.id);
                                console.log("Item deleted:", item.id);
                            }
                        } catch (error) {
                            console.error("Error deleting item:", item.id, error);
                        }
                    })
                );

                console.log("All items deleted successfully");
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        deleteAllKeranjangs();
    }, []);
    return (
        <div className="mt-4 text-center">
            <Image src="assets/images/order_sukses.png" width="500" />
            <h2>Sukses Pesan</h2>
            <p>Terima Kasih</p>
            <Button variant="primary" as={Link} to="/" >
                Kembali
            </Button>
        </div>
    )
}
export default SuksesPage;