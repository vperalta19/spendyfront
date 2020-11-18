import React from "react";
import imagen from '../images/Login.png';
import logo from '../images/logo.png';
import '../styles/InicioSesion.css';
import {Link} from 'react-router-dom'

import { GlobalContext } from "../controllers/Context";
import { Alert } from "@material-ui/lab";

export default class InicioSesion extends React.Component{
    static contextType = GlobalContext;
    constructor(props){
        super(props);
        this.state = {
            mail: '',
            password: '',
            alert: false
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
          [name]: value
        })
      }

      handleClick = async () => {
        const login = {
          mail: this.state.mail,
          password: this.state.password,
        }
        const validacion = await this.context.UsuariosController.login(login)
        
        if(validacion){
            this.props.history.push("/Fondos")
        }
        else{
            this.setState({
                alert: true
            })
            
        }
      }
    render(){
        return (
            <div className="container-fluid inicio">
                <div className="row">
                    <img src={logo} className="logo" alt='logo'/>
                </div>
                <div className="row align-items-center inicio">
                    <div className="col-12 col-lg-8 text-center ">
                        <img src={imagen} className="image" alt='imagenInicio'/>
                    </div>
                    <div className="col">
                        {(() => {
							if (this.state.alert){
								return (
									<Alert variant="filled" severity="error">
										Los datos no son correctos, por favor volvé a ingresarlos.
									</Alert>
								)
							}
                            
                            return null;
                        })()}
                        <div className='row'>
                            <div className='col text-center'>
                                <h1 className='titulo'>INICIO SESION</h1>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <input type='email' className='campos' placeholder="Mail..." value={this.state.mail} name='mail' onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <input type='password' className='campos' placeholder="Contraseña..." value={this.state.password} name='password' onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className='row botones'>
                            <div className='col'>
                            <Link to='/Registro'><button className='button-s'>Registrar</button></Link><button className='button-p' onClick={this.handleClick.bind(this)}>Iniciar Sesion</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}