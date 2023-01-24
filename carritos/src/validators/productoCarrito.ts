import axios from "axios";
import Carrito from "../models/carrito";
import { ProductoCarritoInstance } from "../models/interfaces/productoCarritoInterface";
import ProductoCarrito from "../models/productoCarrito";

const getCarrito = async (idCarrito: number) => {
    const carrito = await Carrito.findByPk(idCarrito);

    if (!carrito) {
        return [false, `El carrito con el id especificado no existe`];
    }

    return carrito;
}

const getProductosCarrito = async (idCarrito: number) => {
    const productosCarrito = await ProductoCarrito.findAll({
        where: {
            idCarrito: idCarrito
        }
    });

    let cantidadProductosEnElCarrito = 0;
    if (productosCarrito) {
        for (let i = 0; i < productosCarrito.length; i++) {
            cantidadProductosEnElCarrito += productosCarrito[i].cantidad;
        }
    }

    return [productosCarrito, cantidadProductosEnElCarrito];
}

const getInventario = async (idProducto: number) => {
    const inventario = await axios.get<{
        id: number,
        nombre: string,
        precio: number,
        descripcion: string,
        createdAt: string,
        updatedAt: string,
        inventario: {
            id: number,
            idProducto: number,
            stock: number,
            createdAt: string,
            updatedAt: string
        }
    }>(`http://localhost:3000/api/producto/${idProducto}`);

    if (!inventario.data) {
        return [false, `El id del producto no existe`];
    }

    if (!inventario.data.inventario) {
        return [false, `El producto que esta intentando agregar no cuenta con inventario`];
    }

    return inventario;
}

const getCliente = async (idCliente: number) => {
    const cliente = await axios.get<{
        id: number,
        nombre: string,
        apellido: string,
        correo: string,
        cupo: number,
        createdAt: string,
        updatedAt: string
    }>(`http://localhost:3002/api/clientes/${idCliente}`);

    return cliente;
} 

export const vaidateCreateProducto = async (body: { idProducto: number, idCarrito: number, cantidad: number }): Promise<[boolean, string | null]> => {
    const carrito = await Carrito.findByPk(body.idCarrito);

    if (!carrito) {
        return [false, `El carrito con el id especificado no existe`];
    }

    const productosCarrito = await ProductoCarrito.findAll({
        where: {
            idCarrito: body.idCarrito
        }
    });

    let indexProducto = productosCarrito.find((producto) => producto.idProducto === body.idProducto);
    if (indexProducto) {
        return [false, `El producto que intenta agregar al carrito ya existe, intente modificandolo`];
    }

    let cantidadProductosEnElCarrito = 0;
    if (productosCarrito) {
        for (let i = 0; i < productosCarrito.length; i++) {
            cantidadProductosEnElCarrito += productosCarrito[i].cantidad;
        }
    }

    const cliente = await axios.get<{
        id: number,
        nombre: string,
        apellido: string,
        correo: string,
        cupo: number,
        createdAt: string,
        updatedAt: string
    }>(`http://localhost:3002/api/clientes/${carrito?.idCliente}`);

    const inventario = await axios.get<{
        id: number,
        nombre: string,
        precio: number,
        descripcion: string,
        createdAt: string,
        updatedAt: string,
        inventario: {
            id: number,
            idProducto: number,
            stock: number,
            createdAt: string,
            updatedAt: string
        }
    }>(`http://localhost:3000/api/producto/${body.idProducto}`);

    if (!inventario.data) {
        return [false, `El id del producto no existe`];
    }

    if (!inventario.data.inventario) {
        return [false, `El producto que esta intentando agregar no cuenta con inventario`];
    }

    if (cliente.data.cupo < body.cantidad + cantidadProductosEnElCarrito) {
        return [false, `La cantidad que esta intentando agregar sobrepasa el cupo de compra del cliente`];

    }

    if (inventario.data.inventario.stock < body.cantidad + cantidadProductosEnElCarrito) {
        return [false, `La cantidad que esta intentando agregar sobrepasa el stock en inventario del producto`];
    }

    return [true, null];

}


export const validateUpdateProducto = async (body: { cantidad: number }, productoCarrito: ProductoCarritoInstance): Promise<[boolean, string | null]> => {
    
    
    const productosCarrito = await ProductoCarrito.findAll({
        where: {
            idCarrito: productoCarrito.idCarrito
        }
    });

    let cantidadProductosEnElCarrito = 0;
    if (productosCarrito) {
        for (let i = 0; i < productosCarrito.length; i++) {
            if (productosCarrito[i].id !== productoCarrito.id) {
                cantidadProductosEnElCarrito += productosCarrito[i].cantidad;
            }
        }
    }

    const carrito = await Carrito.findByPk(productoCarrito.idCarrito);
    const cliente = await axios.get<{
        id: number,
        nombre: string,
        apellido: string,
        correo: string,
        cupo: number,
        createdAt: string,
        updatedAt: string
    }>(`http://localhost:3002/api/clientes/${carrito?.idCliente}`);

    const inventarioProducto = await axios.get<{
        id: number,
        nombre: string,
        precio: number,
        descripcion: string,
        createdAt: string,
        updatedAt: string,
        inventario: {
            id: number,
            idProducto: number,
            stock: number,
            createdAt: string,
            updatedAt: string
        }
    }>(`http://localhost:3000/api/producto/${productoCarrito.idProducto}`);


    if (cliente.data.cupo < body.cantidad + cantidadProductosEnElCarrito) {
        return [false, `La cantidad que esta intentando agregar sobrepasa el cupo de compra del cliente`];

    }

    if (inventarioProducto.data.inventario.stock < body.cantidad + cantidadProductosEnElCarrito) {
        return [false, `La cantidad que esta intentando agregar sobrepasa el stock en inventario del producto`];
    }

    return [true, null];
}