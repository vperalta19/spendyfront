import React from 'react'
import { GlobalContext } from '../controllers/Context'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons'

import '../styles/Fondo.css'

export default class FondoItem extends React.Component {
	static contextType = GlobalContext;
	constructor(props){
		super(props);
		this.state = {
			integrantes : []
		}
	}

	async handleClick() {
		this.context.FondosController.selectFondo(this.props.fondo);
	}

	async salirDelFondo(){
		const response = await this.context.FondosController.salirDelFondo(this.props.fondo.id,this.props.user)
		if(response.status === 200){
			window.location.reload()
		}
	}

	async componentDidMount(){
		console.log(this.props.fondo.id)
		const integrantes = await this.context.FondosController.usuariosFondo(this.props.fondo.id);
		this.setState({
			integrantes: integrantes
		})
		console.log(this.state.integrantes)
	}


	render() {
		return (
				<div className='row align-items-center m-1'>
					<Link to='/Movimientos' className='col-11'>
						<div className='post-slide' onClick={this.handleClick.bind(this) }>
							<div class="post-content row align-items-center">
								<div className='col-2'>
									{(() => {
										if (this.state.integrantes.length === 1){
											return (
												<FontAwesomeIcon icon={faUser} className='iconUsuario'></FontAwesomeIcon>
											)
										}
										else if(this.state.integrantes.length > 1){
											return (
												<FontAwesomeIcon icon={faUsers} className='iconUsuario'></FontAwesomeIcon>
											)
										}
									})()}
								</div>
								<div className='col-6 text-center'>
									<h3 class="post-title">{this.props.fondo.nombre}</h3>
								</div>
								<div className='col-4 text-center'>
									<h3 class="post-codigo">{this.props.fondo.codigo}</h3>
								</div>
								
							</div>
						</div>
					</Link>
					<div className='col-1 text-center'>
						<FontAwesomeIcon icon={faTrashAlt} className='trash' onClick={this.salirDelFondo.bind(this)}></FontAwesomeIcon>
					</div>
				</div>
				
		)   
	}
}
