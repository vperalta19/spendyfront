const url = 'https://semrest.herokuapp.com/'

const formatDate = (d) => {
	let month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) 
		month = '0' + month;
	if (day.length < 2) 
		day = '0' + day;

	return [year, month, day].join('-');
}

export const agregarFondoPorCodigo = async (data) =>{
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch(url+'agregarUsuarioAFondo/',options);
        console.log(response)
    } 
    catch (error) {
        console.log(error)
    }
}

export const crearFondo = async (data) =>{
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch(url+'crearFondo/',options);
        console.log(response)
    } 
    catch (error) {
        console.log(error)
    }
}

export const registrar = async (data) =>{
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch(url+'crearUsuario/',options);
        return response
    } 
    catch (error) {
        console.log(error)
    }
}

export const login = async (data) =>{
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch(url+'login',options);
        return response
    } 
    catch (error) {
        console.error(error)
    }
}

export const getUsuario = async (usuario) =>{
	try {
		const response = await fetch(url+'usuarios/'+usuario);
		const json = await response.json();
		return json
		
	} 
	catch (error) {
		console.log(error)
	}
}



export const getFondos = async (idUsuario) =>{
	try {
		const response = await fetch(url+'fondosUsuario/'+idUsuario);
		const json = await response.json();
		return json;
	} 
	catch (error) {
		console.error(error)
	}
}

export const getFondo = async (idFondo) =>{
	try {
        const response = await fetch(url+'getFondo/'+idFondo);
		const json = await response.json();
		return json[0];
	} 
	catch (error) {
		console.error(error)
	}
}

export const getCategorias = async (fondo) =>{
	try {
		const response = await fetch(url+'categorias/'+fondo);
		const json = await response.json();
		return json[0];
		
	} 
	catch (error) {
		console.error(error)
	}
}

export const getTransacciones = async (fondo,moneda) =>{
	try {
		const response = await fetch(url+'getTransaccionesFondo/'+fondo+'/'+moneda);
		const json = await response.json()

		return json[0];
	} 
	catch (error) {
		console.error(error)
	}
}

export const getTransaccionesFiltrado = async (fondo,filtros) =>{
	const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
		body: JSON.stringify(filtros)
	}
    try {
        const response = await fetch(url+'getTransaccionesFiltrado/'+fondo,options);
        return(response.json())
    } 
    catch (error) {
        console.log(error)
    }
}

/**
 * 
 * @param {Number} idFondo 
 * @param {Date} desde 
 * @param {Date} hasta 
 * @param {String} moneda 
 */
export const getGastosPorCategoria = async (idFondo, desde, hasta, moneda) => {
	try {
		const response = await fetch(url + 'verGastosFondo/',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				fondoID: idFondo,
				inicio: formatDate(desde) + ' 00:00:00',
				fin: formatDate(hasta) + ' 23:59:59',
				moneda: moneda
			})
		});
		const json = await response.json();

		return json;
	} 
	catch (error) {
		console.error(error);
	}
}

export const getGastosPorDia = async (idFondo, moneda) => {
	try {
		const response = await fetch(url + 'verGastosFondoDias/',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				fondoID: idFondo,
				moneda: moneda
			})
		});
		const json = await response.json();

		return json;
	}
	catch (error) {
		console.error(error);
	}
}

export const crearTransaccion = async (data) =>{
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch(url+'crearTransaccion/',options);
        return response
    } 
    catch (error) {
        console.log(error)
    }
}

export const sacarUsuarioFondo = async (idFondo, idUser) =>{
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await fetch(url+'sacarUsuarioFondo/'+idUser+'/'+idFondo,options);
        return response
    } 
    catch (error) {
        console.log(error)
    }
}

export const usuariosFondo = async (idFondo) =>{
    try {
        const response = await fetch(url+'usuariosFondo/'+idFondo);
        return response
    } 
    catch (error) {
        console.log(error)
    }
}

export const getIconos = async () =>{
    try {
        const response = await fetch(url+'getIconos/');
        return response
    } 
    catch (error) {
        console.log(error)
    }
}

export const getColores = async () =>{
    try {
        const response = await fetch(url+'getColores/');
        return response
    } 
    catch (error) {
        console.log(error)
    }
}

export const crearCatCustom = async (data) =>{
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}
	try {
		const response = await fetch(url+'categorias/',options);
		return response
	} 
	catch (error) {
		console.log(error)
	}
}

export const getTransaccionDetalles = async (id) =>{
    try {
        const response = await fetch(url+'getTransaccionDetalles/'+id);
        return response
    } 
    catch (error) {
        console.log(error)
    }
}

export const borrarTransaccion = async (data) =>{
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch(url+'borrarTransaccion/',options);
        return response
    } 
    catch (error) {
        console.log(error)
    }
}

export const crearLimite = async (idFondo, idCategoria, moneda, limite) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
			idFondo: idFondo,
			moneda: moneda,
			limiteCategoria: limite
		})
    }
    try {
		const response = await fetch(url + 'limiteCategoria/' + idCategoria, options);
        return response
    } 
    catch (error) {
        console.log(error)
    }
}

export const crearObjetivo = async (json) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    }
    try {
        const response = await fetch(url + 'crearObjetivo/',options);
        console.log(response)
        return response
    } 
    catch (error) {
        console.log(error)
    }
}


export const getObjetivos = async (idFondo, moneda) =>{
    try {
        const response = await fetch(url+'objetivosFondo/'+idFondo+'/'+moneda);
        return response
    } 
    catch (error) {
        console.log(error)
    }
}


export const getLimites = async (idFondo, moneda) => {
	try {
		const response = await fetch(url + 'getCategoriasLimiteActualTEST/' + idFondo,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				moneda: moneda
			})
		});
		const json = await response.json();

		return json;
	}
	catch (error) {
		console.error(error);
	}
}