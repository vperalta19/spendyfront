export default class Transaccion {

	constructor(parameters) {
		this.id = parameters.id;
		this.fecha = new Date(parameters.fecha);
		this.monto = parameters.monto;
		this.categoria = parameters.categoria;
	}

	get_fechaString() { 
		return this.fecha.getDate() + "/" + (((this.fecha.getMonth()+1) < 10 ? "0" : "") + (this.fecha.getMonth()+1)) + "/" + this.fecha.getFullYear();
	}

	isGasto() {
		return this.monto < 0;
	}

	isIngreso() {
		return this.monto > 0;
	}
}