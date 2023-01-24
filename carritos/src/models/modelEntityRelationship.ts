import Carrito from "./carrito";
import ProductoCarrito from "./productoCarrito";

const defineModelEntityRelationShip = () => {
    Carrito.hasMany(ProductoCarrito, {
        foreignKey: "idCarrito",
    });

    ProductoCarrito.belongsTo(Carrito, {
        foreignKey: 'idCarrito'
    });
};

export default defineModelEntityRelationShip;
