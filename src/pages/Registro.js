import React from "react";
import imagen from '../images/Login.png';
import logo from '../images/logo.png';
import '../styles/InicioSesion.css';
import {Link} from 'react-router-dom'
import { GlobalContext } from '../controllers/Context';
import { Alert } from "@material-ui/lab";

export default class Registro extends React.Component{
	static contextType = GlobalContext;
	constructor(props){
		super(props);
		this.state={
			nombre: '',
			apellido: '',
			mail: '',
			password: '',
			alert: false,
			alertDescripcion: ''
		}
	}

	handleChange = (event) => {
		const {name, value} = event.target;
		this.setState({
			[name]: value
		})
	}

	handleClick = async () => {
		const usuario = {
			nombre: this.state.nombre,
			apellido: this.state.apellido,
			mail: this.state.mail,
			password: this.state.password,
		}
		
		if(!usuario.nombre.length || !usuario.apellido.length || !usuario.mail.length || !usuario.password.length ){
			this.setState({submit:true})
		}
		else{
			const validacion = await this.context.UsuariosController.registrar(usuario)
			if(validacion) {
				this.props.history.push("/Fondos")
			}
			else {this.setState({alert:true,alertDescripcion:'El usuario ya existe'})}
		}
	}

	render(){
		return (
			<div className="container-fluid inicio">
				<div className="row">
					<img src={logo} className="logo" alt='logo'/>
				</div>
				<div className="row align-items-center registro inicio">
					<div className="col-12 col-lg-8 text-center ">
						<img src={imagen} className="image" alt='imagenInicio'/>
					</div>
					<div className="col">
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
						<div className='row'>
							<div className='col text-center'>
								<h1 className='titulo'>REGISTRO</h1>
							</div>
						</div>
						<div className='row'>
							<div className='col'>
								<input type='email' className={(!this.state.mail.length && this.state.submit) ? 'campos rojo' : 'campos'}  placeholder="Mail" value={this.state.mail} name='mail' onChange={this.handleChange}/>
							</div>
						</div>
						<div className='row'>
							<div className='col'>
								<input type='text' className={(!this.state.nombre.length && this.state.submit) ? 'campos rojo' : 'campos'} placeholder="Nombre" value={this.state.nombre} name='nombre' onChange={this.handleChange}/>
							</div>
						</div>
						<div className='row'>
							<div className='col'>
								<input type='text' className={(!this.state.apellido.length && this.state.submit) ? 'campos rojo' : 'campos'} placeholder="Apellido" value={this.state.apellido} name='apellido' onChange={this.handleChange}/>
							</div>
						</div>
						<div className='row'>
							<div className='col'>
								<input type='password' className={(!this.state.password.length && this.state.submit) ? 'campos rojo' : 'campos'} placeholder="Contraseña" value={this.state.password} name='password' onChange={this.handleChange}/>
							</div>
						</div>
						<div className='row botones'>
							<div className='col'>
							<Link to='/InicioSesion'><button className='button-s'>Iniciar Sesión</button></Link><button className='button-p' onClick={this.handleClick}>Registrar</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}