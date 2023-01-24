import Inventario from "./inventario"
import Producto from "./producto"


const defineModelEntityRelationShip = () => {
    Producto.hasOne(Inventario, {
        foreignKey: 'idProducto'
    });

    Inventario.belongsTo(Producto, {
        foreignKey: 'idProducto'
    });
}

export default defineModelEntityRelationShip;