import Venta from "./venta";
import ProductoVenta from "./productoVenta";

const defineModelEntityRelationShip = () => {
    Venta.hasMany(ProductoVenta, {
        foreignKey: "idVenta",
    });

    ProductoVenta.belongsTo(Venta, {
        foreignKey: "idVenta",
    });
};

export default defineModelEntityRelationShip;
