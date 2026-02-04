import React from 'react'
import { Input, Button } from "@heroui/react";
import logo from "../images/Parking-logo.png"
import axios from "axios"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex items-center justify-center">

            <div className='w-110 mx-auto shadow-md rounded-xl p-7 items-center text-center'>

                <img className=" w-64 mx-auto" src={logo}></img>

                <Input
                    isRequired
                    label="Email"
                    labelPlacement="outside"
                    name="email"
                    variant='bordered'
                    placeholder="Unesite email za prijavu"
                    type="email"
                />

                <div className="mt-10">
                    <Input
                        isRequired
                        label="Lozinka"
                        variant='bordered'
                        labelPlacement="outside"
                        name="email"
                        placeholder="Unesite lozinku za prijavu"
                        type="password"
                    />
                </div>
                <Button color="primary" type="submit" className='mt-5 w-42'>
                    Prijava u sustav
                </Button>
                <p className='text-sm mt-5'> U slučaju poteškoća, <span className='text-blue-500 underline'> kontaktirajte podršku</span></p>
            </div>

        </div>
    )
}

export default Login