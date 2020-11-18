import Categoria from "../classes/Categoria";
import Limite from "../classes/Limite";
import { crearObjetivo, getObjetivos, crearLimite, getLimites } from "../services/apiRoutes";

export default class LimitesYObjetivosController {
	
	contructor(){
		this._limites = null;
	}

	async crearLimite(idFondo, idCategoria, moneda, limite)
	{
		var validacion = false;
		const response = await crearLimite(idFondo, idCategoria, moneda, limite);
		if(response.status === 200) {
			validacion = true;
		}
		return validacion
	}

	async getLimites(idFondo, moneda, context)
	{
		const limites = await getLimites(idFondo, moneda);
		const categorias = await context.CategoriasController.getCategorias(idFondo);
		
		this._limites = limites.map(
			(l) => {
				return new Limite({
					id: idFondo + "_" + moneda + "_" + l.nombreCategoria,
					limite: l.Limite,
					monto: l.Gastado,
					categoria: categorias.find( (c) => { return c.id === l.idCategoria })
				})
			}
		)
		return this._limites;
	}

	async crearObjetivo(json){
		console.log(json)
		const response = await crearObjetivo(json);
		
		var validacion = false;
		if (response.status === 200){
			validacion =true
		}
		return validacion
	}

	async getObjetivos(idFondo, moneda){
		const response = await getObjetivos(idFondo, moneda)
		const json = await response.json()
		return json
	}

	
}