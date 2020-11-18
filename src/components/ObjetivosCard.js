import React from 'react';
import { GlobalContext } from '../controllers/Context.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NumberFormat from 'react-number-format';

import '../styles/ObjetivosCard.css'
import { BorderColor } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

export class CrearObjetivo extends React.Component {
	static contextType = GlobalContext;

	constructor(props) {
		super(props);
		this.state = {
			new_icon: '',
			new_color: '',
			iconos: [],
			colores: [],
			fondo: null,
			moneda: '',
			monto: '',
			alert: '',
			alertDescripcion: '',
			nombreObjetivo: ''
		}
	}


	selectIcon(icon) {
		this.setState({
			new_icon: icon
		});
	}
	selectColor(color) {
		this.setState({
			new_color: color
		});
	}

	handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
	}

	async CrearObjetivo(){
		const json = {
			nombre_objetivo: this.state.nombreObjetivo,
			dinero_objetivo: this.state.monto,
			idFondo: this.state.fondo.id,
			moneda: this.state.moneda,
			idFrontCategorias: this.state.new_icon,
			idColor: this.state.new_color,
		}
		console.log(json.idFrontCategorias)
		if(!json.nombre_objetivo || !json.dinero_objetivo || !json.idFondo || !json.moneda || !json.idFrontCategorias || !json.idColor){
			this.setState({
				alert: true,
				alertDescripcion: 'Complete todos los datos'
			})
		}
		else{
			const validacion = await this.context.LimitesYObjetivosController.crearObjetivo(json)
			if(validacion){
				window.location.reload()
			}
			else{
				this.setState({
					alert: true,
					alertDescripcion: 'Algo salio mal, intentelo de nuevo'
				})
			}
		}
		
	}

	async componentDidMount(){
		const fondo = this.context.FondosController.getSelected();
		const iconos = await this.context.CategoriasController.getIconos()
		const colores = await this.context.CategoriasController.getColores()
		const moneda = await this.context.FondosController.getMoneda()
		this.setState({
			iconos: iconos,
			colores: colores,
			fondo: fondo,
			moneda: moneda
		})
	}

	render() {
		return(
			<div className='floating-container crear-objetivo'>
				{(() => {
					if (this.state.alert){
						return (
							<Alert style={{width:'100%'}} variant="filled" severity="error">
								{this.state.alertDescripcion}
							</Alert>
						)
					}
					
					return null;
				})()}
				<div className='titulo'>
					<h3>Cargar Objetivo</h3>
				</div>
				<div><input type='text' placeholder='Nombre' value={this.state.nombreObjetivo} name='nombreObjetivo' onChange={this.handleChange}></input></div>
				<div className='seleccion'>Seleccione un icono</div>
				<div className='icons-list'>
					<div style={{width: 'max-content'}}>
						{		
							this.state.iconos.map(
								(icon) => {
									
									const sel = this.state.new_icon === icon.idfrontCategorias;
									return (
										<div 
										onClick={
											() => {
												this.selectIcon(icon.idfrontCategorias);
											}
										}
										style={{backgroundColor: sel ? 'black' : 'transparent'}}
										className='icon'>
											<div style={{ width: '100%', height: '100%', display: 'flex'}}>
												<FontAwesomeIcon style={{margin: 'auto'}} color={sel ? 'white' : 'black'} icon={icon.icono}/>
											</div>
										</div>
									)
								}
							)
						}
					</div>
				</div>
				<div className='seleccion'>Seleccione un color</div>
				<div className='colors-list'>
					<div style={{width: 'max-content'}}>
						{
							this.state.colores.map(
								(color) => {
									const sel = this.state.new_color === color.idColor;
									return (
										<div 
										onClick={
											() => {
												this.selectColor(color.idColor);
											}
										}
										style={{backgroundColor: sel ? color : 'transparent'}}
										className='color'>
											<div style={sel ?  { width: '100%', height: '100%', border: '1px solid '+color.color, borderRadius: '100px'} : { width: '100%', height: '100%', backgroundColor: color.color, borderRadius: '100px'}}></div>
										</div>
									)
								}
							)
						}
					</div>
				</div>

				<div className='amount'>
					<div className='moneda'>Monto: </div>
					<input 
					className='cantidad-input' 
					placeholder='0' 
					type='number' 
					min={0} 
					name='monto'
					value={this.state.monto}
					onChange={this.handleChange.bind(this)}
					/>
				</div>
				<div className='m-2 text-right'>
					<button className='button-s' onClick={() => {this.props.closeFn()}}>Atras</button>
					<button className='button-alt' onClick={this.CrearObjetivo.bind(this)}>Crear Objetivo</button>
				</div>
				
			</div>
		)
	}
}

class ObjetivoItem extends React.Component {

	constructor() {
		super();
		this.state = {
			barWidth: 999,
			amountWidth: 0
		}
	}

	componentDidMount() {
		const container = document.getElementById('objetivo_' +  this.props.objetivo.idObjetivo);

		const fill = container.getElementsByClassName('bar-fill');
		const amount = container.getElementsByClassName('amount');

		this.setState({
			barWidth: fill[0].getBoundingClientRect().width,
			amountWidth: amount[0].getBoundingClientRect().width
		})
	}

	render() {
		const objetivo = this.props.objetivo;

		const amount = Math.max(Math.min(objetivo.dinero_actual / objetivo.dinero_objetivo, 1), 0);

		return (
			<div className='objetivo-item' id={'objetivo_' +  objetivo.idObjetivo}>
				<div className='title-bar'>
					<div className='title'>
						{objetivo.nombre_objetivo}
					</div>
					<div className='objetivo'>
						<NumberFormat value={objetivo.dinero_objetivo} displayType='text' thousandSeparator='.' decimalSeparator=',' decimalScale={2} fixedDecimalScale={true} prefix='$'/>
					</div>
				</div>
				<div className='bar'>
					<div className='bar-fill' 
						style={{
							width: amount * 100 + '%',
							backgroundColor: objetivo.categoria.color,
							borderColor: objetivo.categoria.color
						}}></div>
					<div className={'current ' + (this.state.barWidth > (this.state.amountWidth + 20) ? 'in' : 'out')}
						style={{ left: 'calc(' + (amount * 100) + '% + 10px)'}}>
						<NumberFormat className='amount' value={objetivo.dinero_actual} displayType='text' thousandSeparator='.' decimalSeparator=',' decimalScale={2} fixedDecimalScale={true} prefix='$'/>
					</div>
				</div>
			</div>
		);
	}
}

export default class ObjetivosCard extends React.Component {
	static contextType = GlobalContext;
	
	constructor() {
		super();

		this.state = {
			objetivos: null
		}
	}

	async componentDidMount() {

		const fondo = await this.context.FondosController.getSelected()
		const categorias = await this.context.CategoriasController.getCategoriasGastos(fondo.id);
		const moneda = await this.context.FondosController.getMoneda();
		const objetivos = await this.context.LimitesYObjetivosController.getObjetivos(fondo.id,moneda);
		console.log(objetivos)
		this.setState({
			objetivos: objetivos.map(
				(o) => {
					return {
						nombre_objetivo: o.nombre_objetivo,
						idObjetivo: o.idObjetivo,
						dinero_objetivo: o.dinero_objetivo,
						dinero_actual: o.dinero_actual,
						categoria: categorias.find((c) => {return c.id === o.idCategoria})
					}
				}
			)
		})
	}
	
	render() {
		return (
			<div className={ this.props.className + ' objetivos-container'}>
			<div className='title-container'>
				<div className='title'>Objetivos</div>
			</div>
			<div className='objetivos-list fill'>
				{
					this.state.objetivos != null ?
					this.state.objetivos.map(
						(o) => {
							return <ObjetivoItem objetivo={o}/>
						}
					)
					:
					<div className='loading fill'><div className='loading-text'>Cargando Objetivos...</div></div>
				}
			</div>
		</div>
		);
	}
}
