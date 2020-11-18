import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/TransaccionDetalle.css'
import { GlobalContext } from '../controllers/Context';

class TransaccionDetalle extends React.Component {
	static contextType = GlobalContext;
	constructor(props){
		super(props);
		const trans = this.props.transaccion;
		this.state = {
			transaccion: trans.id,
			integrante: '',
			fecha: new Date(trans.fecha),
			categoria: trans.categoria,
			notas: ''

		}
	}

	async handleClick(){
		const data = {
			idFondo: this.props.fondo,
			idTransaccion: this.state.transaccion
		}
		const validacion = await this.context.TransaccionesController.borrarTransaccion(data);
		if(validacion){
			window.location.reload()
		}
	}
	
	async componentDidMount(){
		const detalle = await this.context.TransaccionesController.getTransaccionDetalles(this.state.transaccion);
		this.setState ({
			integrante: await detalle.nombre + ' ' + await detalle.apellido,
			notas: await detalle.descripcion_transaccion,
		})
		this.render()
	}

	render() {
		return (
			<div className='transaccion-detalle floating-container'>
				<div className='titulo' style={{color: this.state.categoria.color}}>
					<div className='organizador'>
						<FontAwesomeIcon icon={this.state.categoria.icono} size='2x'/>
						<span className='texto'>{this.state.categoria.nombre}</span>
					</div>
				</div>
				<div className='info'>
					<div>
						<b>Ingresado por:</b> {this.state.integrante}
					</div>
					<div>
						<b>Fecha:</b> {this.state.fecha.getDate() + '/' + this.state.fecha.getMonth() + '/' + this.state.fecha.getFullYear()}
					</div>
					<div className='descripcion'>
						<b>Descripción:</b> <br/>{(this.state.notas) && this.state.notas}
					</div>
				</div>
				<div className='buttons'>
					<button className='atras button-p' onClick={() => {this.props.closeFunc()}}>Volver</button>
					<button className='eliminar button-s' onClick={this.handleClick.bind(this)}>Eliminar</button>
				</div>
			</div>
		);
	}
}

export default TransaccionDetalle;