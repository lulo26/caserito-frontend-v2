import * as React from 'react'
import axios from 'axios'
import { baseURL } from '../store/constant';

const GetProductos = () =>{
    return axios.get(`${baseURL}producto`)
}

export default {
    GetProductos
}