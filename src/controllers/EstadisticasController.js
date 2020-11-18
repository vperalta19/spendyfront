import { getGastosPorCategoria, getGastosPorDia } from "../services/apiRoutes";

export default class EstadisticasController {

	async getGastosPorDia(idFondo, moneda) {
		const gastos = await getGastosPorDia(idFondo, moneda);
		
		let sum = 0;
		
		return gastos.map(
			(g) => {
				sum += g.DineroTotal;
				return (
					{
						monto: sum,
						fecha: new Date(g.fechaOnly)
					}
				)
			}
		);
	}

	async getGastosPorCategoria(idFondo, inicio, fin, moneda, context)
	{
		const gastos = await getGastosPorCategoria(idFondo, inicio, fin, moneda);
		const categorias = await context.CategoriasController.getCategorias(idFondo);

		return gastos.map(
			(gasto) => {
				return (
					{
						monto: gasto.DineroTotal,
						categoria: categorias.find( (c) => { return gasto.categoria == c.id } )
					}
				);
			}
		);
	}
}