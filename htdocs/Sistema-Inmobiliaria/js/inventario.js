variable = (new URL(document.location)).searchParams;
var ciudad = "";
var colonia = "";
var tipoInmueble = "";
var precioMin = "";
var precioMax = "";
var tipoTransaccion = "";
var buscarActivo = new Boolean(false);
var idInmueble;

// DATOS INMUEBLES
var precio;

if (variable.get("ciudad") != null){
    ciudad = variable.get("ciudad");
    colonia = variable.get("colonia");
    tipoInmueble = variable.get("tipoInmueble");
    precioMin = variable.get("precioMin");
    precioMax = variable.get("precioMax");
    tipoTransaccion = variable.get("tipoTransaccion");

    document.getElementById("ciudades").value = ciudad;
    document.getElementById("colonias").value = colonia;
    document.getElementById("tipoTransaccion").value = tipoTransaccion;
    document.getElementById("tipoInmueble").value = tipoInmueble;
    document.getElementById("precioMin").value = precioMin;
    document.getElementById("precioMax").value = precioMax;
    inventario();
    buscar("No");
} else {
    inventario();
    cargarInmuebles("No");
}

function cargarInmuebles(ordenarPor){
    var xhr = new XMLHttpRequest();
    var existeRespuesta = new Boolean (false);
    var q = "ordenarPor="+ordenarPor;
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            var respuesta = xhr.responseXML;
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
                document.getElementById('box').innerHTML = '';
                    for (i=0; i<x.length; ++i) {
                    document.getElementById('box').innerHTML += xs.serializeToString(x[i]) + '\n<br />\n';
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

function buscar(ordenarPor) {
    buscarActivo = true;
    var q;
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
    console.log("Buscar inmueble - Cliente");
    console.log(q);
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
                document.getElementById('box').innerHTML = '';
                    for (i=0; i<x.length; ++i) {
                    document.getElementById('box').innerHTML += xs.serializeToString(x[i]) + '\n<br />\n';
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

function precioDescendente() {
    if (buscarActivo == false){
        cargarInmuebles('Descendente');
    } else {
        buscar('Descendente');
    } 
};

function precioAscendente() {
    if (buscarActivo == false){
        cargarInmuebles('Ascendente');
    } else {
        buscar('Ascendente');
    }  
};

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

function limpiarBusqueda () {
    buscarActivo = false;
    var path = "http://localhost:8888/Sistema-Inmobiliaria/html/inventario.html";
    window.open(path,"_parent");
};

function w3_open_actualizar(id) {
    idInmueble = id;
    abrirFormularioInmueble();
    
    //var path = "mostrarInmuebleInventario.html?idInmueble="+id;
    document.getElementById("myModal").style.display = "block";

};

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

function cerrarPopup() {
    document.getElementById("myModal").style.display = "none";
};
