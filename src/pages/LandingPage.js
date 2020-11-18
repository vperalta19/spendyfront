import React, { Component } from "react";
import Slider from "react-slick";
import logo from './../images/logo.png'
import './../styles/LandingPage.css'
import {Link} from 'react-router-dom'

export default class SimpleSlider extends Component {
	
	render() {
	
		const settings = {
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 6000,
		};
	
		return (
			<div>
				<div className='row toolbar'>
					<div className='col-12 col-lg-3'><img src={logo} alt='logo'></img></div>
					<div className='col-6 col-md-5'></div>
					<div className='col-3 col-md-4 d-none d-lg-block'>
						<div className='row'>
							<div className='col'>
								<Link to='/InicioSesion'><button className='button-p'>Iniciar Sesion</button></Link>
							</div>
							<div className='col'>
								<Link to='/Registro'><button className='button-alt'>Registrar</button></Link>
							</div>
						</div>
					</div>
					
				</div>
				<div className='row botones-login d-lg-none'>
					<div className='col text-center'>
						<Link to='/InicioSesion'><button className='button-p'>Iniciar Sesion</button></Link>
					</div>
					<div className='col text-center'>
						<Link to='/Regsitro'><button className='button-alt '>Registrar</button></Link>
					</div>
				</div>
				<div className='landing'>
					<Slider {...settings}>
						<div className='slide1'>
							<h2>SPENDY</h2>
							<span>La mejor solución para mejorar tus ahorros, registrar tus gastos y cumplir tus objetivos.</span>
						</div>
						<div className='slide2'>
							<h2>Con FRIEND$</h2>
							<span>Podras compartir un fondo comun con tus amigos para ahorrar y registrar sus gastos juntos.</span>
						</div>
						<div className='slide3'>
							<h2>Limites SPENDY</h2>
							<span>SPENDY te permite controlar tus gastos, determinando cuanto queres gastar en un rubro especifico.</span>
						</div>
						<div className='slide4'>
							<h2>TODO ES POSIBLE</h2>
							<span>Proponete objetivos de ahorro y junto con el equipo de SPENDY te ayudaremos a conseguirlos.</span>
						</div>
					</Slider>
				</div>
			</div>
		);
	}
}