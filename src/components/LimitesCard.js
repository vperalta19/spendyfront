import React, { Fragment } from 'react';
import { GlobalContext } from '../controllers/Context.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NumberFormat from 'react-number-format';
import { Alert } from '@material-ui/lab';

import '../styles/LimitesCard.css'

export class CrearLimite extends React.Component {
	static contextType = GlobalContext;

	constructor() {
		super();
		this.state = {
			alert: '',
			categorias: [],
			categoria: null,
			fechaInicio: null,
			fechaFin: null,
			monto: 0
		}
	}

	async componentDidMount() {
		const fondo = this.context.FondosController.getSelected()
		const categorias = await this.context.CategoriasController.getCategoriasGastos(fondo.id);

		this.setState({
			categorias: categorias
		});
	}

	selectCategory(c) {
		this.setState({
			categoria: c
		});
	}

	async attemptCreate() {
		let alert = '' 
		if (this.state.monto <= 0) {
			alert = 'Ingrese un monto límite máximo.';
		} else if (this.state.categoria == null) {
			alert = 'Seleccione una categoría la cual limitar.';
		}

		if (alert) {
			this.setState({
				alert: alert
			})
		} else {
			const fondo = this.context.FondosController.getSelected();
			const moneda = this.context.FondosController.getMoneda();

			const response = await this.context.LimitesYObjetivosController.crearLimite(fondo.id, this.state.categoria.id, moneda, this.state.monto);
			
			if (response === true) {
				console.log("Nice");
			} else {
				console.log("Ups");
			}
		}
	}

	render() {
		return(
			<div className='floating-container crear-limite'>
				<div className='title'>
					Crear Nuevo Limite
				</div>
				{
					this.state.alert.length > 0 ?
						<Alert variant="filled" severity="error">
							{this.state.alert}
						</Alert>
					:
						null
				}

				<div className='amount-input-container'>
					<NumberFormat value={this.state.monto} className='amount-input' onValueChange={ (v) => { this.setState({ monto: (v.floatValue || 0) })}} thousandSeparator='.' decimalSeparator=',' decimalScale={2} fixedDecimalScale={true} prefix='$'/>
				</div>
				<div className={'category-selection ' + (this.state.categorias && this.state.categorias.length > 12 ? 'overflow' : '')}>
					{
						this.state.categorias.map(
							(categoria, index) => {
								const selected = this.state.categoria != null && this.state.categoria.nombre === categoria.nombre;
								return (
									<div 
									key={index}
									style={{backgroundColor: selected? categoria.color : 'white'}}
									className={'categoria-item ' + (selected? 'selected' : '')}
									onClick={() => {this.selectCategory(categoria)}}>
										<div className='organizer'>
											<div className='icon-container'>
												<FontAwesomeIcon color={selected? 'white' : categoria.color} className='icon' icon={['fas', categoria.icono]} size='2x'/>
											</div>
											<div style={{color: selected? 'white' : categoria.color}} className='texto'><span>{categoria.nombre}</span></div>
										</div>
									</div>
								);
							}
						)
					}
				</div>
				<div className='buttons-container'>
					<button className='crear-button button-p' onClick={() => { this.attemptCreate() }}>Crear Límite</button>
					<button className='atras-button button-s' onClick={() => { this.props.closeFn() }}>Atras</button>
				</div>
			</div>
		);
	}
}

class LimiteItem extends React.Component {

	render() {
		const limite = this.props.limite;

		return (
			<div className={'limite-item ' + (limite.monto/limite.limite > 1 ? "over" : limite.monto/limite.limite > 0.8 ? "near" : "fair")}>
				<div className='advert'></div>
				<div className='categoria'>
					<div className='organizador' style={{color: limite.categoria.color}}>
						<FontAwesomeIcon icon={limite.categoria.icono} size='2x' fixedWidth/>
						<span className='categoria-nombre'>{limite.categoria.nombre}</span>
					</div>
				</div>
				<div className='acumulado'>
					<NumberFormat value={limite.monto} displayType='text' thousandSeparator='.' decimalSeparator=',' decimalScale={2} fixedDecimalScale={true} prefix='$'/>
				</div>
				<div className='limite'>
					<NumberFormat value={limite.limite} displayType='text' thousandSeparator='.' decimalSeparator=',' decimalScale={2} fixedDecimalScale={true} prefix='$'/>
				</div>
			</div>
		);
	}
}

export default class LimitesCard extends React.Component {
	static contextType = GlobalContext;
	
	constructor() {
		super();

		this.state = {
			limites: null
		}
	}

	async componentDidMount() {
		const fondo = this.context.FondosController.getSelected();
		const moneda = this.context.FondosController.getMoneda();
		
		const limites = await this.context.LimitesYObjetivosController.getLimites(fondo.id, moneda, this.context);
		
		this.setState({
			limites: limites
		})
	}
	
	render() {
		return (
			<div className={ this.props.className + ' limites-container'}>
				<div className='title-container'>
					<div className='title'>Limites</div>
				</div>
				<div className='limites-list fill'>
					{
						this.state.limites != null ?
						<Fragment>
							<div className='header'>
								<div className='categoria'>Categoria</div>
								<div className='acumulado'>Monto Acumulado</div>
								<div className='limite'>Límite</div>
							</div>
							{this.state.limites.map(
								(l) => {
									return <LimiteItem limite={l}/>
								}
							)}
						</Fragment>
						:
						<div className='loading fill'><div className='loading-text'>Cargando Límites...</div></div>
					}
				</div>
			</div>
		);
	}
}
