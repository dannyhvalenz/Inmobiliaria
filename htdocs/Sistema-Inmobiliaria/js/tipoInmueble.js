
function cargarFormulario() {
    alert("HOLA");
    var selectorInmueble = document.getElementById("tipoInmueble");
    var tipoInmueble = selectorInmueble.options[selectorInmueble.selectedIndex].text;
    alert(tipoInmueble);
    switch (tipoInmueble) {
        case "Casa":
            abrirFormularioCasa();
            break;
        case "Departamento":
            abrirFormularioDepartamento();
            break;
        case "Edificio":
            abrirFormularioEdificio();
            break;
        case "Local":
            abrirFormularioLocal();
            break;
        case "Oficina":
            abrirFormularioOficina();
            break;
        case "Terreno":
            abrirFormularioTerreno();
            break;    
    }
}

function w3_open_inmueble() {
    var selectorInmueble = document.getElementById("tipoInmueble");
    var tipoInmueble = selectorInmueble.options[selectorInmueble.selectedIndex].text;
    
    switch (tipoInmueble) {
        case "Casa":
            abrirFormularioCasa();
            break;
        case "Departamento":
            abrirFormularioDepartamento();
            break;
        case "Edificio":
            abrirFormularioEdificio();
            break;
        case "Local":
            abrirFormularioLocal();
            break;
        case "Oficina":
            abrirFormularioOficina();
            break;
        case "Terreno":
            abrirFormularioTerreno();
            break;    
    }
    
}

function w3_close_inmueble() {
    document.getElementById("divAdmin").style.display = "none";
}  

// FUNCION QUE CREA EL FORMULARIO DE CASA
function abrirFormularioCasa(){
    var xhr = new XMLHttpRequest();
    var existeRespuesta = new Boolean (false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            var respuesta = xhr.responseXML;
            console.log(xhr.responseXML);
            x = respuesta.getElementsByTagName('resultado');
            
            if (respuesta != null){
                existeRespuesta = true;
            } else {
                existeRespuesta = false;
            }
            
            if (existeRespuesta == true){
                xs = new XMLSerializer();
                document.getElementById('divTipoPropiedad').innerHTML = '';
                    for (i=0; i<x.length; ++i) {
                    document.getElementById('divTipoPropiedad').innerHTML += xs.serializeToString(x[i]) + '\n<br />\n';
                }
            } else {
                alert("Error de conexion con la base de datos");
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/crearFormularioCasa.pl", true);
    xhr.setRequestHeader(
    'Content-type', 
    'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send();
};

// FUNCION QUE CREA EL FORMULARIO DE DEPARTAMENTO
function abrirFormularioDepartamento(){
    var xhr = new XMLHttpRequest();
    var existeRespuesta = new Boolean (false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            var respuesta = xhr.responseXML;
            console.log(xhr.responseXML);
            x = respuesta.getElementsByTagName('resultado');
            
            if (respuesta != null){
                existeRespuesta = true;
            } else {
                existeRespuesta = false;
            }
            
            if (existeRespuesta == true){
                xs = new XMLSerializer();
                document.getElementById('divTipoPropiedad').innerHTML = '';
                    for (i=0; i<x.length; ++i) {
                    document.getElementById('divTipoPropiedad').innerHTML += xs.serializeToString(x[i]) + '\n<br />\n';
                }
            } else {
                alert("Error de conexion con la base de datos");
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/crearFormularioDepartamento.pl", true);
    xhr.setRequestHeader(
    'Content-type', 
    'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send();
};

// FUNCION QUE CREA EL FORMULARIO DE OFICINA
function abrirFormularioOficina(){
    var xhr = new XMLHttpRequest();
    var existeRespuesta = new Boolean (false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            var respuesta = xhr.responseXML;
            console.log(xhr.responseXML);
            x = respuesta.getElementsByTagName('resultado');
            
            if (respuesta != null){
                existeRespuesta = true;
            } else {
                existeRespuesta = false;
            }
            
            if (existeRespuesta == true){
                xs = new XMLSerializer();
                document.getElementById('divTipoPropiedad').innerHTML = '';
                    for (i=0; i<x.length; ++i) {
                    document.getElementById('divTipoPropiedad').innerHTML += xs.serializeToString(x[i]) + '\n<br />\n';
                }
            } else {
                alert("Error de conexion con la base de datos");
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/crearFormularioOficina.pl", true);
    xhr.setRequestHeader(
    'Content-type', 
    'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send();
};

// FUNCION QUE CREA EL FORMULARIO DE EDIFICIO
function abrirFormularioEdificio(){
    var xhr = new XMLHttpRequest();
    var existeRespuesta = new Boolean (false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            var respuesta = xhr.responseXML;
            console.log(xhr.responseXML);
            x = respuesta.getElementsByTagName('resultado');
            
            if (respuesta != null){
                existeRespuesta = true;
            } else {
                existeRespuesta = false;
            }
            
            if (existeRespuesta == true){
                xs = new XMLSerializer();
                document.getElementById('divTipoPropiedad').innerHTML = '';
                    for (i=0; i<x.length; ++i) {
                    document.getElementById('divTipoPropiedad').innerHTML += xs.serializeToString(x[i]) + '\n<br />\n';
                }
            } else {
                alert("Error de conexion con la base de datos");
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/crearFormularioEdificio.pl", true);
    xhr.setRequestHeader(
    'Content-type', 
    'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send();
};

// FUNCION QUE CREA EL FORMULARIO DE LOCAL
function abrirFormularioLocal(){
    var xhr = new XMLHttpRequest();
    var existeRespuesta = new Boolean (false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            var respuesta = xhr.responseXML;
            console.log(xhr.responseXML);
            x = respuesta.getElementsByTagName('resultado');
            
            if (respuesta != null){
                existeRespuesta = true;
            } else {
                existeRespuesta = false;
            }
            
            if (existeRespuesta == true){
                xs = new XMLSerializer();
                document.getElementById('divTipoPropiedad').innerHTML = '';
                    for (i=0; i<x.length; ++i) {
                    document.getElementById('divTipoPropiedad').innerHTML += xs.serializeToString(x[i]) + '\n<br />\n';
                }
            } else {
                alert("Error de conexion con la base de datos");
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/crearFormularioLocal.pl", true);
    xhr.setRequestHeader(
    'Content-type', 
    'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send();
};


// FUNCION QUE CREA EL FORMULARIO DE TERRENO
function abrirFormularioTerreno(){
    var xhr = new XMLHttpRequest();
    var existeRespuesta = new Boolean (false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            var respuesta = xhr.responseXML;
            console.log(xhr.responseXML);
            x = respuesta.getElementsByTagName('resultado');
            
            if (respuesta != null){
                existeRespuesta = true;
            } else {
                existeRespuesta = false;
            }
            
            if (existeRespuesta == true){
                xs = new XMLSerializer();
                document.getElementById('divTipoPropiedad').innerHTML = '';
                    for (i=0; i<x.length; ++i) {
                    document.getElementById('divTipoPropiedad').innerHTML += xs.serializeToString(x[i]) + '\n<br />\n';
                }
            } else {
                alert("Error de conexion con la base de datos");
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/crearFormularioTerreno.pl", true);
    xhr.setRequestHeader(
    'Content-type', 
    'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send();
};