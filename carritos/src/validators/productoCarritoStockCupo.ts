import axios, { AxiosResponse } from "axios";
import Carrito from "../models/carrito";
import { CarritoInstance } from "../models/interfaces/carritoInterface";
import { ProductoCarritoInstance } from "../models/interfaces/productoCarritoInterface";
import ProductoCarrito from "../models/productoCarrito";

/**
 * Obtener datos del carrito
 * 
 * @param idCarrito id del carrito
 * @returns Promise<CarritoInstance | string>
 */
const getCarrito = async (idCarrito: number): Promise<CarritoInstance | string> => {
    const carrito = await Carrito.findByPk(idCarrito);

    if (!carrito) {
        return `El carrito con el id especificado no existe`;
    }

    return carrito;
}

/**
 * Obtener la lista de productos dentro del carrito y la cantidad de los mismos
 * 
 * @param idCarrito id del carrito
 * @returns Promise<[ProductoCarritoInstance[], number]>
 */
const getProductosCarrito = async (idCarrito: number): Promise<[ProductoCarritoInstance[], number]> => {
    const productosCarrito = await ProductoCarrito.findAll({
        where: {
            idCarrito: idCarrito
        }
    });

    let cantidadProductosEnElCarrito: number = 0;
    if (productosCarrito) {
        for (let i = 0; i < productosCarrito.length; i++) {
            cantidadProductosEnElCarrito += productosCarrito[i].cantidad;
        }
    }

    return [productosCarrito, cantidadProductosEnElCarrito];
}


/**
 * Obtener la lista de productos dentro del carrito y la cantidad de los mismos excluyendo la cantidad del producto a acutalizar
 * 
 * @param idCarrito id del carrito
 * @param idProductoCarrito id del producto carrito a actualizar
 * @returns Promise<[ProductoCarritoInstance[], number]>
 */
const getProductosCarritoUpdate = async (idCarrito: number, idProductoCarrito: number): Promise<[ProductoCarritoInstance[], number]> => {
    const productosCarrito = await ProductoCarrito.findAll({
        where: {
            idCarrito: idCarrito
        }
    });

    let cantidadProductosEnElCarrito = 0;
    if (productosCarrito) {
        for (let i = 0; i < productosCarrito.length; i++) {
            if (productosCarrito[i].id !== idProductoCarrito) {
                cantidadProductosEnElCarrito += productosCarrito[i].cantidad;
            }
        }
    }

    return [productosCarrito, cantidadProductosEnElCarrito];
}


/**
 * Obtener datos del inventario
 * 
 * @param idProducto id del producto
 * @returns Promise<AxiosResponse | string>
 */
const getInventario = async (idProducto: number): Promise<AxiosResponse | string> => {
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
    }>(`http://productos:3000/api/producto/${idProducto}`);

    if (!inventario.data) {
        return `El id del producto no existe`;
    }

    if (!inventario.data.inventario) {
        return `El producto que esta intentando agregar no cuenta con inventario`;
    }

    return inventario;
}


/**
 * Obtener datos del cliente
 * 
 * @param idCliente id del cliente
 * @returns Promise<AxiosResponse> de cliente
 */
const getCliente = async (idCliente: number): Promise<AxiosResponse> => {
    const cliente = await axios.get<{
        id: number,
        nombre: string,
        apellido: string,
        correo: string,
        cupo: number,
        createdAt: string,
        updatedAt: string
    }>(`http://clientes:3002/api/clientes/${idCliente}`);

    return cliente;
} 


export const vaidateCreateProducto = async (body: { idProducto: number, idCarrito: number, cantidad: number }): Promise<[boolean, string | null]> => {
    // Obtener el carrito
    const carrito = await getCarrito(body.idCarrito);

    if (typeof carrito === 'string') {
        return [false, carrito];
    }

    // Obtener productos dentro del carrito y su cantidad
    const [productosCarrito, cantidadProductosEnElCarrito] = await getProductosCarrito(body.idCarrito);

    let indexProducto = productosCarrito.find((producto) => producto.idProducto === body.idProducto);
    if (indexProducto) {
        return [false, `El producto que intenta agregar al carrito ya existe, intente modificandolo`];
    }

    // Obtener cliente
    const cliente = await getCliente(carrito?.idCliente);

    // Obtener inventario del producto
    const inventario = await getInventario(body.idProducto);

    if (typeof inventario === 'string') {
        return [false, inventario];
    }

    // Verificar el cupo de compra del cliente y el stock del producto con respecto a la cantidad a agregar al carrito
    if (cliente.data.cupo < body.cantidad + cantidadProductosEnElCarrito) {
        return [false, `La cantidad que esta intentando agregar sobrepasa el cupo de compra del cliente`];
    }

    if (inventario.data.inventario.stock < body.cantidad) {
        return [false, `La cantidad que esta intentando agregar sobrepasa el stock en inventario del producto`];
    }

    // Todas las validaciones correctas
    return [true, null];

}



export const validateUpdateProducto = async (body: { cantidad: number }, productoCarrito: ProductoCarritoInstance): Promise<[boolean, string | null]> => {
    // Obtener el carrito
    const carrito = await getCarrito(productoCarrito.idCarrito);

    if (typeof carrito === 'string') {
        return [false, carrito];
    }

    // Obtener productos dentro del carrito y su cantidad
    const [productosCarrito, cantidadProductosEnElCarrito] = await getProductosCarritoUpdate(productoCarrito.idCarrito, productoCarrito.id);
    console.log()

    // Obtener cliente
    const cliente = await getCliente(carrito?.idCliente);

    // Obtener inventario del producto
    const inventario = await getInventario(productoCarrito.idProducto);

    if (typeof inventario === 'string') {
        return [false, inventario];
    }


    // Verificar el cupo de compra del cliente y el stock del producto con respecto a la cantidad a agregar al carrito
    if (cliente.data.cupo < body.cantidad + cantidadProductosEnElCarrito) {
        return [false, `La cantidad que esta intentando agregar sobrepasa el cupo de compra del cliente`];
    }

    if (inventario.data.inventario.stock < body.cantidad) {
        return [false, `La cantidad que esta intentando agregar sobrepasa el stock en inventario del producto`];
    }

    return [true, null];
}