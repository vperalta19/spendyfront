import Transaccion from "../classes/Transaccion";
import { getTransaccionesFiltrado, crearTransaccion , getTransaccionDetalles, borrarTransaccion} from "../services/apiRoutes";

export default class TransaccionesController {
	
	contructor() {
		this._transacciones = [];
	}

	eliminarTransacciones() {
		this._transacciones = [];
	}

	async getTransacciones(idFondo, filtros, context)
	{
		if (!this._transacciones || !this._transacciones.length)
		{
			const transacciones = await getTransaccionesFiltrado(idFondo, filtros);
			const categorias = await context.CategoriasController.getCategorias(idFondo);
			
			this._transacciones = transacciones.map(
				(t) => {
					return new Transaccion({
						id: t.idTransaccion,
						fecha: t.fecha,
						monto: t.dinero,
						categoria: categorias.find((c) => { return c.nombre === t.nombre })
					});
				}
			);
			
		}
		return this._transacciones;
	}

	async filtrar(idFondo, filtros, context){
		this._transacciones = []
		const transFiltrado = await this.getTransacciones(idFondo, filtros, context);
		return transFiltrado;
	}


	async agregarTransaccion(idUser, idFondo, idCategoria, dinero, descripcion, moneda, fecha){
		const json = {
			idUser, idFondo, idCategoria, dinero, descripcion, moneda,fecha,
		}

		var validacion = false
		const response = await crearTransaccion(json);
		if(response.status===200){
			validacion =true
		}
		return validacion
	}

	async getTransaccionDetalles(id){
		const response = await getTransaccionDetalles(id);
		const json = await response.json()
		return json[0][0]
	}

	async borrarTransaccion(data){
		const response = await borrarTransaccion(data);
		return response.status ===200
	}
}