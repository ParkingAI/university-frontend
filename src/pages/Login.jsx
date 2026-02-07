import React, { useState, useEffect } from 'react'
import { Input, Button, Form, Alert } from "@heroui/react";
import logo from "../images/Parking-logo.png"
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { userLogin } from "../api/auth.js"
import { useUserAuthorization } from "../hooks/UserAuthorization.jsx"

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [cookies] = useCookies(["sp_user"]);
    const { user, setUser, userLogout } = useUserAuthorization();
    const [message, setMessage] = useState(null);
    const [statusCode, setStatusCode] = useState(null);
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        if (cookies.sp_user && user) {
            const rola = user.rola;
            if (rola === "admin") {
                navigate("/dashboard/parking");
            }
        }
    }, [cookies, user, navigate]);

    const submitForm = async (event) => {
        try {
            const response = await userLogin(formData);
            if (response.status === 200 && response) {
                setUser(response.data.user);
                setMessage("Uspješna prijava");
                 setStatusCode(response.status);

            } else {
               setStatusCode(response?.response?.status ?? 500);
            setMessage(response?.response?.data ?? "Greška na serveru!");
            }
        } catch (error) {

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className='w-110 mx-auto shadow-md rounded-xl p-7 items-center text-center'>

                <img className=" w-64 mx-auto" src={logo}></img>
                <h1 className='text-xl'>Prijava u sustav</h1>


                {message && (
                    <div className={"w-full"}>
                        {statusCode ? (
                            <Alert
                                isClosable
                                className="items-center"
                                color={statusCode === 200 ? "success" : "danger"}
                                title={message}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                )}

                <Form
                    validationBehavior="native"
                    className='items-center'
                    onSubmit={(event) => {
                        event.preventDefault();
                        submitForm(event);
                    }}
                >
                    <Input
                        isRequired
                        label="Email"
                        labelPlacement="outside"
                        name="email"
                        variant='bordered'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Unesite email za prijavu"
                        type="email"
                    />

                    <Input
                        isRequired
                        label="Lozinka"
                        variant='bordered'
                        labelPlacement="outside"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        placeholder="Unesite lozinku za prijavu"
                        type="password"
                    />

                    <Button color="primary" type="submit" className='mt-5 w-42'>
                        Prijava u sustav
                    </Button>

                </Form>

                <p className='text-sm mt-5'> U slučaju poteškoća, <span className='text-blue-500 underline'> kontaktirajte podršku</span></p>
            </div>

        </div>
    )
}

export default Login