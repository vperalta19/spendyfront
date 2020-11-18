export default class Categoria {

	constructor(parameters) {
		this.id = parameters.id;
		this.nombre = parameters.nombre;

		this.icono = parameters.icono.replace('fa-','');

		this.color = parameters.color;
		this.isActive = parameters.isActive;
		this.ineg = parameters.ineg
	}
}