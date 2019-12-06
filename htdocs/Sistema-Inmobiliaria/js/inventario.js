variable = (new URL(document.location)).searchParams;
var ciudad = "";
var colonia = "";
var tipoInmueble = "";
var precioMin = "";
var precioMax = "";
var tipoTransaccion = "";
var buscarActivo = new Boolean(false);
var idInmueble;

var ciudadRecuperada;
var coloniaRecuperada;
var tipoInmuebleRecuperado;
var precioMinRecuperado;
var precioMaxRecuperado;
var tipoTransaccionRecuperado;
// DATOS INMUEBLES
var precio;
var query;

if (variable.get("ciudad") != null){
    ciudadRecuperada = variable.get("ciudad");
    console.log("ciudadRecuperada"+ciudadRecuperada);
    coloniaRecuperada = variable.get("colonia");
    tipoInmuebleRecuperado = variable.get("tipoInmueble");
    precioMinRecuperado = variable.get("precioMin");
    precioMaxRecuperado = variable.get("precioMax");
    tipoTransaccionRecuperado = variable.get("tipoTransaccion");

    query = "ciudad="+ciudadRecuperada+"&colonia="+coloniaRecuperada+"&tipoInmueble="+tipoInmuebleRecuperado+"&tipoTransaccion="+tipoTransaccionRecuperado+"&precioMin="+precioMinRecuperado+"&precioMax="+precioMaxRecuperado+"&ordenarPor=No";
    document.getElementById("tipoTransaccion").value = tipoTransaccionRecuperado;
    document.getElementById("tipoInmueble").value = tipoInmuebleRecuperado;
    document.getElementById("precioMin").value = precioMinRecuperado;
    document.getElementById("precioMax").value = precioMaxRecuperado;
    document.getElementById("titulo").innerHTML = 'Cargando busqueda';
    inventario();
} else {
    inventario();
    cargarInmuebles("No");
}

// CARGA LOS INMUEBLES Y EN CASO DE NECESITAR ORDENARLOS LOS REGRESA ORDENADOS POR PRECIO ASCENDENTE O DESCENDENTE
function cargarInmuebles(ordenarPor){
    var xhr = new XMLHttpRequest();
    var existeRespuesta = new Boolean (false);
    var q = "ordenarPor="+ordenarPor;
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            var respuesta = xhr.responseXML;
            var respuestaTexto = new XMLSerializer().serializeToString(respuesta);
            console.log("Cargar Inmuebles");
            console.log(xhr.responseXML);
            x = respuesta.getElementsByTagName('resultado');
            
            if (respuesta != null){
                existeRespuesta = true;
            } else {
                existeRespuesta = false;
            }
            
            if (existeRespuesta == true){
                xs = new XMLSerializer();

                var coincidencias = x[0].childNodes[0];
                
                if (coincidencias != null) {
                    document.getElementById("titulo").style.display = "none";
                    for (i=0; i<x.length; ++i) {
                        
                        document.getElementById('box2').innerHTML += xs.serializeToString(x[i]) + '\n<br />\n';
                    }
                } else {
                    document.getElementById("titulo").style.display = "block";
                    document.getElementById('box2').innerHTML = '';
                    document.getElementById("titulo").innerHTML = 'No hay coincidencias';
                }
            } else {
                alert("Error de conexion con la base de datos");
            }
            
            
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/mostrarInmueblesCliente.pl", true);
    xhr.setRequestHeader(
    'Content-type', 
    'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
    
};

// BUSQUEDA INICIAL CON FIILTROS DESDE EL INDEX
function buscarInicial(q) {
    buscarActivo = true;
    console.log("Busqueda inicial inmueble - Cliente");
    console.log("Busqueda inicial query = " + q);
    var xhr = new XMLHttpRequest();
    var existeRespuesta = new Boolean (false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            var respuesta = xhr.responseXML;
            var respuestaTexto = new XMLSerializer().serializeToString(respuesta);
            console.log(xhr.responseXML);
            x = respuesta.getElementsByTagName('resultado');
            
            if (respuesta != null){
                existeRespuesta = true;
            } else {
                existeRespuesta = false;
            }

            if (existeRespuesta == true){
                xs = new XMLSerializer();

                var coincidencias = x[0].childNodes[0];

                if (coincidencias != null) {
                    document.getElementById("titulo").style.display = "none";
                    document.getElementById('box2').innerHTML = '';
                    for (i=0; i<x.length; ++i) {
                        
                        document.getElementById('box2').innerHTML += xs.serializeToString(x[i]) + '\n<br />\n';
                    }
                } else {
                    document.getElementById("titulo").style.display = "block";
                    document.getElementById('box2').innerHTML = '';
                    document.getElementById("titulo").innerHTML = 'No hay coincidencias';
                }
            } else {
                alert("Error de conexion con la base de datos");
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/buscarInmuebleCliente.pl", true);
    xhr.setRequestHeader(
    'Content-type', 
    'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
    
};

// FILTRA LOS INMUEBLES Y REGRESA EL RESULTADO ORDENADO DEPENDIENDO EL CASO 
function buscar(ordenarPor) {
    buscarActivo = true;
    var q;
    
    // REVISA QUE NO QUEDEN CAMPOS VACIOS
    if (ciudad != "" && colonia != "" && tipoTransaccion != "" && tipoInmueble != "" && precioMin != "" && precioMax != "") {
        q = "ciudad="+ciudad+"&colonia="+colonia+"&tipoTransaccion="+tipoTransaccion+"&tipoInmueble="+tipoInmueble+"&precioMin="+precioMin+"&precioMax="+precioMax+"&ordenarPor="+ordenarPor;
    } else {
        ciudad = document.getElementById("ciudades").value;
        colonia = document.getElementById("colonias").value;
        tipoTransaccion = document.getElementById("tipoTransaccion").value
        tipoInmueble = document.getElementById("tipoInmueble").value;
        precioMin = document.getElementById("precioMin").value;
        precioMax = document.getElementById("precioMax").value;
    
        q = "ciudad="+ciudad+"&colonia="+colonia+"&tipoTransaccion="+tipoTransaccion+"&tipoInmueble="+tipoInmueble+"&precioMin="+precioMin+"&precioMax="+precioMax+"&ordenarPor="+ordenarPor;
    }
    history.replaceState({}, null, "http://localhost:8888/Sistema-Inmobiliaria/html/inventario.html?&"+q);
    console.log("Buscar inmueble - Cliente");
    console.log(q);
    var xhr = new XMLHttpRequest();
    var existeRespuesta = new Boolean (false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            var respuesta = xhr.responseXML;
            var respuestaTexto = new XMLSerializer().serializeToString(respuesta);
            console.log(xhr.responseXML);
            x = respuesta.getElementsByTagName('resultado');
            
            if (respuesta != null){
                existeRespuesta = true;
            } else {
                existeRespuesta = false;
            }

            if (existeRespuesta == true){
                xs = new XMLSerializer();

                var coincidencias = x[0].childNodes[0];

                if (coincidencias != null) {
                    document.getElementById("titulo").style.display = "none";
                    document.getElementById('box2').innerHTML = '';
                    for (i=0; i<x.length; ++i) {
                        
                        document.getElementById('box2').innerHTML += xs.serializeToString(x[i]) + '\n<br />\n';
                    }
                } else {
                    document.getElementById("titulo").style.display = "block";
                    document.getElementById('box2').innerHTML = '';
                    document.getElementById("titulo").innerHTML = 'No hay coincidencias';
                }
            } else {
                alert("Error de conexion con la base de datos");
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/buscarInmuebleCliente.pl", true);
    xhr.setRequestHeader(
    'Content-type', 
    'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
    
};

// ORDENA POR PRECIO DESCENDENTE
function precioDescendente() {
    if (buscarActivo == false){
        cargarInmuebles('Descendente');
    } else {
        buscar('Descendente');
    } 
};

// ORDENA POR PRECIO ASCENDENTE
function precioAscendente() {
    if (buscarActivo == false){
        cargarInmuebles('Ascendente');
    } else {
        buscar('Ascendente');
    }  
};

// RELLENA TODOS LOS CAMPOS NECESARIOS Y REGRESA TODAS LAS PROPIEDADES SIN FILTRARLAS ANTES
function inventario() {
    var xhr = new XMLHttpRequest();
    var existeRespuesta = new Boolean (false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            var respuesta = xhr.responseXML;
            console.log("Llenar Select de Ciudad y de Colonia")
            console.log(xhr.responseXML);
            x = respuesta.getElementsByTagName('resultado');
            
            if (respuesta != null){
                existeRespuesta = true;
            } else {
                existeRespuesta = false;
            }
            
            if (existeRespuesta == true){
                // RELLENA LOS COMBOBOX COLONIAS Y CIUDADES CON LOS DATOS DE LA BD
                var selcolonias = document.getElementById('colonias');
                var selciudades = document.getElementById('ciudades');
                
                var inputCiudades = respuesta.getElementsByTagName('ciudades');
                var cadenaCiudades = "";
                var ciudad;
                for(i = 0;i < inputCiudades.length; i++){
                    ciudad = inputCiudades[i].textContent
                    if (cadenaCiudades.search(ciudad) == -1){
                        var opt = document.createElement('option');
                        opt.appendChild( document.createTextNode(ciudad) );
                        opt.value = ciudad;
                        selciudades.appendChild(opt); 
                        cadenaCiudades = cadenaCiudades + ciudad;   
                    }
                }

                var inputColonias = respuesta.getElementsByTagName('colonias');
                var cadenaColonias = "";
                var colonia;
                for(i = 0;i < inputColonias.length; i++){
                    colonia = inputColonias[i].textContent
                    if (cadenaColonias.search(colonia) == -1){
                        var opt = document.createElement('option');
                        opt.appendChild( document.createTextNode(colonia) );
                        opt.value = colonia;
                        selcolonias.appendChild(opt); 
                        cadenaColonias = cadenaColonias + colonia;   
                    }
                }

                document.getElementById("ciudades").value = ciudadRecuperada;
                document.getElementById("colonias").value = coloniaRecuperada;
                buscarInicial(query);
            } else {
                alert("Error de conexion con la base de datos");
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/inventario.pl", true);
    xhr.setRequestHeader(
    'Content-type', 
    'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send();
};

// FUNCION QUE LIMPIA LOS FILTROS
function limpiarBusqueda () {
    var xhr = new XMLHttpRequest();
    var existeRespuesta = new Boolean (false);
    var q = "ordenarPor=No";
    history.replaceState({}, null, "http://localhost:8888/Sistema-Inmobiliaria/html/inventario.html");
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            var respuesta = xhr.responseXML;
            var respuestaTexto = new XMLSerializer().serializeToString(respuesta);
            console.log("Cargar Inmuebles");
            console.log(xhr.responseXML);
            x = respuesta.getElementsByTagName('resultado');
            
            if (respuesta != null){
                existeRespuesta = true;
            } else {
                existeRespuesta = false;
            }
            
            if (existeRespuesta == true){
                xs = new XMLSerializer();

                var coincidencias = x[0].childNodes[0];
                
                if (coincidencias != null) {
                    document.getElementById("titulo").style.display = "none";
                    document.getElementById('box2').innerHTML = '';
                    for (i=0; i<x.length; ++i) {
                        
                        document.getElementById('box2').innerHTML += xs.serializeToString(x[i]) + '\n<br />\n';
                    }
                } else {
                    document.getElementById("titulo").style.display = "block";
                    document.getElementById('box2').innerHTML = '';
                    document.getElementById("titulo").innerHTML = 'No hay coincidencias';
                }
            } else {
                alert("Error de conexion con la base de datos");
            }
            
            
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/mostrarInmueblesCliente.pl", true);
    xhr.setRequestHeader(
    'Content-type', 
    'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
    
};

// FUNCION PARA EL BOTON ABRE LA VENTANA CON LA INFO DEL INMUEBLE
function w3_open_actualizar(id) {
    idInmueble = id;
    abrirFormularioInmueble();
    //var path = "mostrarInmuebleInventario.html?idInmueble="+id;
    document.getElementById("myModal").style.display = "block";

};

// SOLICITA LA INFORMACION DE CIERTO INMUEBLE
function abrirFormularioInmueble(){
    console.log("Abrir formulario inmueble");
    var q = "idInmueble="+idInmueble;
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
                document.getElementById('popUpPropiedad').innerHTML = '';
                    for (i=0; i<x.length; ++i) {
                    document.getElementById('popUpPropiedad').innerHTML += xs.serializeToString(x[i]) + '\n<br />\n';
                }
                var tipoPropiedad = document.getElementById('lblTipoPropiedad').innerHTML;
                cargarDatosTipoInmueble(tipoPropiedad);
            } else {
                alert("Error de conexion con la base de datos");
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/crearFormularioVerInmueble.pl", true);
    xhr.setRequestHeader(
    'Content-type', 
    'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
};

// CIERRA LA VENTANA CON LA INFO DEL INMUEBLE
function cerrarPopup() {
    document.getElementById("myModal").style.display = "none";
};

// DEPENDIENDO DEL TIPO DE INMUEBLE SACA LA INFORMACION RESTANTE DEL MISMO
function cargarDatosTipoInmueble(tipoPropiedad){
    if (tipoPropiedad == "Casa"){
        mostrarInfoCasa();
    } else if(tipoPropiedad == "Departamento"){
        mostrarInfoDepartamento();
    } else if (tipoPropiedad == "Edificio"){
        mostrarInfoEdificio();
    } else if(tipoPropiedad == "Oficina"){
        mostrarInfoOficina();
    } else if (tipoPropiedad == "Local"){
        mostrarInfoLocal();
    } else if (tipoPropiedad == "Terreno"){
        mostrarInfoTerreno();
    }
}

// RECUPERA LA INFOMACION DEL LOCAL
function mostrarInfoLocal(){
    console.log("Abrir info Local");
    var q = "idInmueble="+idInmueble;
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

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/mostrarLocalInventario.pl", true);
    xhr.setRequestHeader(
    'Content-type', 
    'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
};

// RECUPERA LA INFOMACION DEL DEPARTAMENTO
function mostrarInfoDepartamento(){
    console.log("Abrir info departamento");
    var q = "idInmueble="+idInmueble;
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

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/mostrarDepartamentoInventario.pl", true);
    xhr.setRequestHeader(
    'Content-type', 
    'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
};

// RECUPERA LA INFOMACION DEL EDIFICIO
function mostrarInfoEdificio(){
    console.log("Abrir info edificio");
    var q = "idInmueble="+idInmueble;
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

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/mostrarEdificioInventario.pl", true);
    xhr.setRequestHeader(
    'Content-type', 
    'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
};

// RECUPERA LA INFOMACION DE LA OFICINA
function mostrarInfoOficina(){
    console.log("Abrir info oficina");
    var q = "idInmueble="+idInmueble;
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

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/mostrarOficinaInventario.pl", true);
    xhr.setRequestHeader(
    'Content-type', 
    'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
};

// RECUPERA LA INFOMACION DE LA CASA
function mostrarInfoCasa(){
    console.log("Abrir info Casa");
    var q = "idInmueble="+idInmueble;
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

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/mostrarCasaInventario.pl", true);
    xhr.setRequestHeader(
    'Content-type', 
    'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
};

// RECUPERA LA INFOMACION DEL TERRENO
function mostrarInfoTerreno(){
    console.log("Abrir info terreno");
    var q = "idInmueble="+idInmueble;
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

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/mostrarTerrenoInventario.pl", true);
    xhr.setRequestHeader(
    'Content-type', 
    'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
};