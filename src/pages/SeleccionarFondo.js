import React from 'react';
import { GlobalContext } from '../controllers/Context';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Popup from 'reactjs-popup';

import logo from '../images/logo.png'
import {agregarFondoPorCodigo, crearFondo} from '../services/apiRoutes'
import FondoItem from '../components/FondoItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

import '../styles/Fondo.css'
import { Alert } from 'react-bootstrap';

export default class SeleccionarFondo extends React.Component {
	static contextType = GlobalContext;

	constructor(props){
		super();
		this.state ={
			fondos: [],
			agregarFondoOpen: false,
			fondoNuevo: '',
			codigo: '',
            alert: false,
            usuario: ''
		}
	}

	openAgregarFondo() {
		this.setState({
			agregarFondoOpen: true 
		})
	}
	
	closeAgregarFondo() {
		this.setState({
			agregarFondoOpen: false
		})
	}
	
	handleChange = (event) => {
		const {name, value} = event.target;
		this.setState({
			[name]: value
		})
	}

	async componentDidMount(){

		
		this.context.TransaccionesController.eliminarTransacciones();
		const usuario = (await this.context.UsuariosController.getUsuarioLogged()).idUser
		const fondos = await this.context.FondosController.getFondos(usuario);
		this.setState({
            fondos: fondos,
            usuario: usuario
		})  
	}

	agregarFondo(){
		if(this.state.codigo){
			const data ={
				idUser: this.state.usuario,
				codigo_fondo: this.state.codigo
			}
			agregarFondoPorCodigo(data)
			window.location.reload()
		}
		else if(this.state.fondoNuevo){
			const data ={
				idUser: this.state.usuario,
				nombreFondo: this.state.fondoNuevo
			}
			crearFondo(data)
			window.location.reload()
		}
		else{
			this.setState({
				alert:true
			})
		}
	}

	

	render(){
		return (
			<div className="container fondos">
				<div className='row'>
					<div className='col text-left'>
						<img src={logo} alt='logo' className='logo'></img>
					</div>
				</div>
				<div className='row align-items-center titulo'>
					<div className='col text-center'>
						<h1>¿A QUE FONDO QUIERES INGRESAR?</h1>
					</div>
				</div>
				
				<div className='row'>
					<div className='col d-none d-md-block'>
						<button className=' agregar button-alt' onClick={this.openAgregarFondo.bind(this)}>Agregar Nuevo Fondo</button>
					</div>
					<div className='col d-block d-md-none'>
						<button className=' mas button-alt' onClick={this.openAgregarFondo.bind(this)}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button>
					</div>
				</div>
                <div className="row">
					<div className="col">
                        {this.state.fondos.map(
                            (index) => {
                                return (
                                    <FondoItem fondo={index} user={this.state.usuario}></FondoItem>
                                );
                            }
                        )}
					</div>
				</div>
				<div className='row'>
					<div className='col text-center '>
						<Popup
						open={this.state.agregarFondoOpen} 
						className='transaccion-popup' 
						onClose={() => {this.setState({ agregarFondoOpen: false })}}
						>
							<div className='container agregarFondo'>
								<div className='row'>
									<div className='col text-center'>
										<span>Crea un nuevo fondo</span>
									</div>
								</div>
								<div className='row'>
									<div className='col text-center'>
										<input className ='inputVioleta' 
											type='text' 
											name="fondoNuevo"
											value={this.state.fondoNuevo} 
											onChange={this.handleChange}
											placeholder='Elige un nombre para tu Fondo'></input>
									</div>
								</div>
								<div className='row'>
									<div className='col text-center'>
										<span>O agregra uno ya existente con su codigo</span>
									</div>
								</div>
								<div className='row'>
									<div className='col text-center'>
										<input className ='inputGris' 
											type='text' 
											name="codigo"
											onChange={this.handleChange} 
											value={this.state.codigo} 
											placeholder='Ingresa el codigo de un Fondo'></input>
									</div>
								</div>
								{(() => {
                                    if (this.state.alert){
                                        return (
                                            <Alert variant='danger'>Los campos estan vacios, ingrese nuevamente</Alert>
                                        )
                                    }
                                    
                                    return null;
                                })()}
								
								<div className='row m-2'>
									<div className='col text-center'>
										<button className='button-s' onClick={this.closeAgregarFondo.bind(this)}>Cancelar</button>
									</div>
									<div className='col text-center'>
										<button className='button-p' onClick={this.agregarFondo.bind(this)}>Confirmar</button>
									</div>
									
								</div>
							</div>
						</Popup>
					</div>
				</div>
				
			</div>
		);
	}
}
