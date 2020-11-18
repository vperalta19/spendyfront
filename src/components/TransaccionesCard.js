import React from 'react';
import { GlobalContext } from '../controllers/Context.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from 'reactjs-popup';
import TransaccionItem from './TransaccionItem.js';
import TransaccionDetalle from './TransaccionDetalle.js';
import CargaGastos from './CargaGastos.js';
import CargaIngresos from './CargaIngresos.js';
import BotonFlotante from './BotonFlotante.js';
import '../styles/TransaccionesCard.css'
import FilterBar from './FilterBar.js';

class TransaccionesCard extends React.Component {
	static contextType = GlobalContext;
	
	constructor() {
		super();

		this.state = {
			detailOpen: false,
			filtersOpen: false,
			transaccionSeleccionada: null,
			gastosOpen: false,
			transacciones: [],
			ingresosOpen: false,
			fondo: null,
			moneda: '',
			busqueda: '',
			idCategoria: '',
			idUser: '',
			fechaInicio: '',
			fechaFin: ''
		}
	}

	openDetalleTransaccion(transaccion) {
		this.setState({
			detailOpen: true,
			transaccionSeleccionada: transaccion
		})
	}
	closeDetalleTransaccion() {
		this.setState({
			detailOpen: false
		});
	}

	openAgregarGasto() {
		this.setState({
			gastosOpen: true
		});
	}
	closeAgregarGasto() {
		this.setState({
			gastosOpen: false
		});
	}

	async componentDidMount(){
		const fondoID = (this.context.FondosController.getSelected()).id
		const fondoActualizado = await this.context.FondosController.getFondo(fondoID)
		const filtros = {moneda: this.context.FondosController.getMoneda()}
		const transacciones = await this.context.TransaccionesController.getTransacciones(fondoID, filtros, this.context);
		this.setState({
			transacciones: transacciones,
			fondo: fondoActualizado,
			moneda: this.context.FondosController.getMoneda()
		})
	}
	
	openAgregarIngreso() {
		this.setState({
			ingresosOpen: true
		});
	}
	closeAgregarIngreso() {
		this.setState({
			ingresosOpen: false
		});
	}

	handleChange = async (event) => {
		const {name, value} = event.target;
       	await this.setState({
            [name]: value,
		})
		await this.filtrar()
	}

	async filtrado(filtros){
		this.setState({
			idCategoria: filtros.idCategoria,
			idUser: filtros.idUser,
			fechaInicio: filtros.fechaInicio,
			fechaFin: filtros.fechaFin
		})
		this.filtrar()
	}

	async filtrar() {
		const filtros = {
			moneda: this.state.moneda,
			idCategoria: this.state.idCategoria,
			idUser: this.state.idUser,
			fechaInicio: this.state.fechaInicio,
			fechaFin: this.state.fechaFin,
			busqueda: this.state.busqueda
		}
		const fondo = this.context.FondosController.getSelected()
		const transacciones = await this.context.TransaccionesController.filtrar(fondo.id, filtros, this.context);
		this.setState({
			transacciones: transacciones
		})
		console.log(transacciones)
	}

	render() {
		return (
			<div className={this.props.className + ' transacciones-container'}>
				<div className='titulo-container'>
				</div>
				<div className='barra-principal'>
					
					<div className='selector-moneda'>
						<div className='organizador'>
							<div className='moneda'>
								{(
									()=>{
										const moneda = this.state.moneda
										if(moneda === 'Pesos'){
											return(
											<div>
												AR$
												<div className='total-actual'>
													<span className='full'>{Math.trunc(this.state.fondo.pesos)}</span>
													<span className='cents'><sup>
														{()=>{
															const num = this.state.fondo.pesos
															const pos = num.toString().indexOf(".");
															const res = String(num).substring((pos+1), num.length);
															console.log(res)
															return(res)
														}
														}</sup></span>
												</div>
											</div>)
										}
										else if(moneda === 'Dolares'){
											return(
												<div>
													U$S
													<div className='total-actual'>
														<span className='full'>{Math.trunc(this.state.fondo.dolares)}</span>
														<span className='cents'><sup>
															{()=>{
																const num = this.state.fondo.dolares
																const pos = num.toString().indexOf(".");
																const res = String(num).substring((pos+1), num.length);
																console.log(res)
																return(res)
															}
															}</sup></span>
													</div>
												</div>
											)
										}
										else if(moneda === 'Euros'){
											return(
												<div>
													€
													<div className='total-actual'>
														<span className='full'>{Math.trunc(this.state.fondo.euros)}</span>
														<span className='cents'><sup>
															{()=>{
																const num = this.state.fondo.euros
																const pos = num.toString().indexOf(".");
																const res = String(num).substring((pos+1), num.length);
																console.log(res)
																return(res)
															}
															}</sup></span>
													</div>
												</div>
											)
										}
									})
								()}
							</div>
							
						</div>
					</div>
					
				</div>
				<div className='buscador-container'>
					<div className='buscador-organizer'>
						<input placeholder='Buscar' className='buscador' value={this.state.busqueda} name='busqueda' onChange={this.handleChange}/>
						<FontAwesomeIcon className='buscador-icon' icon='search'/>
					</div>
					<div className='filtros-organizer'
						onClick={
							() => {
								this.setState({
									filtersOpen: !this.state.filtersOpen
								});
							}
						}
					>
						<div className='filtros'>Filtros</div>
						<FontAwesomeIcon className='filtros-icon' icon='filter'/>
					</div>
					<div className={'filter-bar-container ' + (this.state.filtersOpen ? 'open' : 'closed') }>
						<FilterBar  filtrarFn={this.filtrado.bind(this)}></FilterBar>
					</div>
				</div>
				<div className='lista-container'>
					<ul className='lista'>
						{this.state.transacciones.map(
							(value, index) => {
								return (
									<li key={index} className='transaccion-li' onClick={() => { this.openDetalleTransaccion(value); }}>
										<TransaccionItem transaccion={value}/>
									</li>
								);
							}
						)}
					</ul>
					<Popup open={this.state.detailOpen} className='transaccion-popup' onClose={() => {this.setState({ detailOpen: false })}}>
						
						<TransaccionDetalle
							transaccion={this.state.transaccionSeleccionada}
							closeFunc={() => {this.closeDetalleTransaccion()}}
							fondo={this.state.fondo?.id}/>
					</Popup>
					<Popup open={this.state.gastosOpen} className='cargar-gastos-popup' onClose={() => {this.setState({ gastosOpen: false })}}>
						<CargaGastos
							moneda='AR$'
							closeFunc={() => {this.closeAgregarGasto()}}/>
					</Popup>
					<Popup open={this.state.ingresosOpen} className='cargar-ingresos-popup' onClose={() => {this.setState({ ingresosOpen: false })}}>
						<CargaIngresos
							moneda='AR$'
							closeFunc={() => {this.closeAgregarIngreso()}}/>
					</Popup>
				</div>
				<BotonFlotante openIngresoFn={ () => { this.openAgregarIngreso(); } } openGastoFn={ () => { this.openAgregarGasto(); } }></BotonFlotante>
			</div>
		);
	}
}

export default TransaccionesCard;

