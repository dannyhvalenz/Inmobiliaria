var ciudad;
var colonia;
var calle;
var numExt;
var numInt;
var precio;
var tipoTransaccion;
var tipoInmueble;
var idPropietario;
var idInmueble;

var outerHTML;
var idAsesor;
var nombreAsesor;

variable = (new URL(document.location)).searchParams;
if (variable.get("idAsesor") != null){
    idAsesor = variable.get("idAsesor");
    nombreAsesor = variable.get("nombre");
    outerHTML = variable.get("link");
    outerHTML = outerHTML+"&nombre="+nombreAsesor;
    cargarPropietariosComboBox(idAsesor);
    history.replaceState({}, null, "/Sistema-Inmobiliaria/html/menu_Propietario.html");
    
} else {
    alert("No se pudo recuperar la informacion de la base de datos");
}

function cargarPropietariosComboBox(id) {
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
                document.getElementById('cmbPropietario').innerHTML = '';
                    for (i=0; i<x.length; ++i) {
                    document.getElementById('cmbPropietario').innerHTML += xs.serializeToString(x[i]) + '\n<br />\n';
                }
            } else {
                alert("Error de conexion con la base de datos");
            }
        }
    }

    var q = "idAsesor="+id;
    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/cargarPropietariosComboBox.pl", true);
    xhr.setRequestHeader(
    'Content-type', 
    'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
}


function cerrarRegistro(){
    /* SE LIMPIAN TODOS LOS INPUT */
    document.getElementById("txtciudad").value = '';
    document.getElementById("txtcolonia").value = '';
    document.getElementById("txtcalle").value = '';
    document.getElementById("txtnumExt").value = '';
    document.getElementById("txtnumInt").value = '';
    document.getElementById("txtprecio").value = '';
    window.open(outerHTML,"_parent");
}

function guardarInmueble(){
    /* RECUPERAR DATOS DE LOS INPUT */
    var camposVacios = new Boolean(false);

    var cmb = document.getElementById("cmbPropietario");
    idPropietario = cmb.options[cmb.selectedIndex].value;
    //var idPropietario = document.getElementById("txtnombre").value;
    ciudad = document.getElementById("txtciudad").value;
    colonia = document.getElementById("txtcolonia").value;
    calle = document.getElementById("txtcalle").value;
    numExt = document.getElementById("txtnumExt").value;
    numInt = document.getElementById("txtnumInt").value;
    precio = document.getElementById("txtprecio").value;
    tipoTransaccion = document.getElementById("tipoTransaccion").value;
    tipoInmueble = document.getElementById("tipoInmueble").value;

    // CREACION DEL QUERY 
    var q = "idPropietario="+idPropietario+"&ciudad="+ciudad+"&colonia="+colonia+"&calle="+calle+"&numExt="+numExt+"&numInt="+numInt+"&precio="+precio+"&tipoTransaccion="+tipoTransaccion+"&tipoInmueble="+tipoInmueble;
    
    // VALIDACION DE CAMPOS VACIOS
    var input = document.getElementsByTagName("input");
    for (var i=0; i<input.length; i++){
        if (input[i].id != "txtnumInt"){
            if (input[i].value == "" || input[i].value == null) {
                camposVacios = true;
            }
        }
    }
    
    if (camposVacios == false) {

    // EN CASO DE QUE NO HAYA CAMPOS VACIOS SE HACE EL REQUEST A LA BD POR MEDIO DEL ARCHIVO .PL
        console.log("Agregar Inmueble");
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var respuesta = xhr.responseXML;
                console.log(xhr.responseXML);

                var x = respuesta.getElementsByTagName("resultado");

                var titulo = x[0].getElementsByTagName("titulo")[0].textContent;
                console.log(titulo);
                var contenido = x[0].getElementsByTagName("contenido")[0].textContent;

                if (titulo == "Nuevo inmueble"){
                    var id = x[0].getElementsByTagName("idInmueble")[0].textContent;
                    idInmueble = id;
                    
                    if (tipoInmueble == "Casa") {
                        guardarCasa();
                    } else if (tipoInmueble == "Departamento") {
                        guardarDepartamento();
                    } else if (tipoInmueble == "Edificio") {
                        guardarEdificio();
                    } else if (tipoInmueble == "Local") {
                        guardarLocal();
                    } else if (tipoInmueble == "Oficina") {
                        guardarOficina();
                    } else if (tipoInmueble == "Terreno") {
                        guardarTerreno();
                    }
                } else if (titulo == "Error de conexion"){
                    alert(contenido);
                }
            }
        }

        xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/agregarInmueble.pl", true);
        xhr.setRequestHeader(
            'Content-type', 
            'application/x-www-form-urlencoded'
        ); 
        xhr.responseType = "document";
        xhr.send(q);
    } else if (camposVacios == true) {
        alert("Hay campos vacios");
    }
};

function guardarCasa(){
    // Obtener los datos de los input
    var metrosCuadrados = document.getElementById("txtMetrosCuadrados").value;
    var metrosConstruccion = document.getElementById("txtMetrosConstruccion").value;
    var numPisos = document.getElementById("txtNumPisos").value;
    var numRecamaras = document.getElementById("txtNumRecamaras").value;
    var numBanos = document.getElementById("txtNumBanos").value;
    var edadCasa = document.getElementById("txtEdadCasa").value;
    var tipoCasa = document.getElementById("tipoCasa").value;
    var tipoCocina = document.getElementById("tipoCocina").value;
    
    // Obtener los datos del checklist
    var cochera;
    if (document.getElementById("Cochera").checked == true){
        cochera = "Si";
    } else if (document.getElementById("Cochera").checked == false){
        cochera = "No";
    }

    var numCoches = document.getElementById("inputNumCoches").value;

    var cocheraTechada;
    if (document.getElementById("Cochera_Techada").checked == true){
        cocheraTechada = "Si";
    } else if (document.getElementById("Cochera_Techada").checked == false){
        cocheraTechada = "No";
    }
    
    var fraccionamiento;
    if (document.getElementById("Fraccionamiento").checked == true){
        fraccionamiento = "Si";
    } else if (document.getElementById("Fraccionamiento").checked == false){
        fraccionamiento = "No";
    }

    var fraccionamientoVigilancia;
    if (document.getElementById("Fraccionamiento_Vigilancia").checked == true){
        fraccionamientoVigilancia = "Si";
    } else if (document.getElementById("Fraccionamiento_Vigilancia").checked == false){
        fraccionamientoVigilancia = "No";
    }

    var fraccionamientoAreaVerde;
    if (document.getElementById("Fraccionamiento_AreaVerde").checked == true){
        fraccionamientoAreaVerde = "Si";
    } else if (document.getElementById("Fraccionamiento_AreaVerde").checked == false){
        fraccionamientoAreaVerde = "No";
    }

    var fraccionamientoCasaClub;
    if (document.getElementById("Fraccionamiento_CasaClub").checked == true){
        fraccionamientoCasaClub = "Si";
    } else if (document.getElementById("Fraccionamiento_CasaClub").checked == false){
        fraccionamientoCasaClub = "No";
    }

    var cuartoServicio;
    if (document.getElementById("CuartoServicio").checked == true){
        cuartoServicio = "Si";
    } else if (document.getElementById("CuartoServicio").checked == false){
        cuartoServicio = "No";
    }

    var sala;
    if (document.getElementById("Sala").checked == true){
        sala = "Si";
    } else if (document.getElementById("Sala").checked == false){
        sala = "No";
    }

    var comedor;
    if (document.getElementById("Comedor").checked == true){
        comedor = "Si";
    } else if (document.getElementById("Comedor").checked == false){
        comedor = "No";
    }

    var jardin;
    if (document.getElementById("Jardin").checked == true){
        jardin = "Si";
    } else if (document.getElementById("Jardin").checked == false){
        jardin = "No";
    }

    var areaLavado;
    if (document.getElementById("AreaLavado").checked == true){
        areaLavado = "Si";
    } else if (document.getElementById("AreaLavado").checked == false){
        areaLavado = "No";
    }

    var bodega;
    if (document.getElementById("Bodega").checked == true){
        bodega = "Si";
    } else if (document.getElementById("Bodega").checked == false){
        bodega = "No";
    }

    // Creacion del query 
    var q = "idInmueble="+idInmueble+"&metrosCuadrados="+metrosCuadrados+"&metrosConstruccion="+metrosConstruccion+"&numPisos="+numPisos+"&numRecamaras="+numRecamaras+"&numBanos="+numBanos
        +"&edadCasa="+edadCasa+"&tipoCasa="+tipoCasa+"&tipoCocina="+tipoCocina+"&cochera="+cochera+"&numCoches="+numCoches
        +"&cocheraTechada="+cocheraTechada+"&fraccionamiento="+fraccionamiento+"&fraccionamientoVigilancia="+fraccionamientoVigilancia
        +"&fraccionamientoAreaVerde="+fraccionamientoAreaVerde+"&fraccionamientoCasaClub="+fraccionamientoCasaClub+"&cuartoServicio="+cuartoServicio
        +"&sala="+sala+"&comedor="+comedor+"&jardin="+jardin+"&areaLavado="+areaLavado+"&bodega="+bodega;

    console.log(q);

    // Verificar si hay campos vacios
    if (metrosCuadrados == null || metrosCuadrados == "", metrosConstruccion == null || metrosConstruccion == "", numPisos == null || numPisos == "", 
        numRecamaras == null || numRecamaras == "", numBanos == null || numBanos == "",
        edadCasa == null || edadCasa == "") {
            alert("Hay campos vacios");
    }

    // Verificar que si sera marcado en el checklist que hay cochera que se ingrese el numero de coches que caben
    if (cochera == "Si"){
        if (numCoches == null || numCoches == "") {
            alert("Por favor indique para cuantos autos es la cochera");
        }
    }

    console.log("Agregar Casa");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var respuesta = xhr.responseXML;
            console.log(xhr.responseXML);

            var x = respuesta.getElementsByTagName("resultado");

            var titulo = x[0].getElementsByTagName("titulo")[0].textContent;

            var contenido = x[0].getElementsByTagName("contenido")[0].textContent;

            if (titulo == "Nueva casa"){
                alert(contenido);
                window.open(outerHTML,"_parent");
            } else if (titulo == "Error de conexion"){
                alert(contenido);
            }

        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/agregarCasa.pl", true);
    xhr.setRequestHeader(
        'Content-type', 
        'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);

};

function guardarDepartamento(){
    // Obtener los datos de los input
    var metrosConstruccion = document.getElementById("txtMetrosConstruccion").value;
    var numRecamaras = document.getElementById("txtNumRecamaras").value;
    var numPiso = document.getElementById("txtPiso").value;
    var espacioHabitable = document.getElementById("txtEspacioHabitable").value;
    var numBanos = document.getElementById("txtNumBanos").value;
    var edadDepartamento = document.getElementById("txtEdad").value;
    var tipoDepartamento = document.getElementById("tipoDepartamento").value;
    var tipoCocina = document.getElementById("tipoCocina").value;
    
    // Obtener los datos del checklist
    var estacionamiento;
    if (document.getElementById("Estacionamiento").checked == true){
        estacionamiento = "Si";
    } else if (document.getElementById("Estacionamiento").checked == false){
        estacionamiento = "No";
    }

    var numCoches = document.getElementById("inputNumCoches").value;

    var estacionamientoTechado;
    if (document.getElementById("Estacionamiento_Techado").checked == true){
        estacionamientoTechado = "Si";
    } else if (document.getElementById("Estacionamiento_Techado").checked == false){
        estacionamientoTechado = "No";
    }
    
    var vigilancia;
    if (document.getElementById("Vigilancia").checked == true){
        vigilancia = "Si";
    } else if (document.getElementById("Vigilancia").checked == false){
        vigilancia = "No";
    }

    var cuartoServicio;
    if (document.getElementById("CuartoServicio").checked == true){
        cuartoServicio = "Si";
    } else if (document.getElementById("CuartoServicio").checked == false){
        cuartoServicio = "No";
    }

    var sala;
    if (document.getElementById("Sala").checked == true){
        sala = "Si";
    } else if (document.getElementById("Sala").checked == false){
        sala = "No";
    }

    var comedor;
    if (document.getElementById("Comedor").checked == true){
        comedor = "Si";
    } else if (document.getElementById("Comedor").checked == false){
        comedor = "No";
    }

    var jardin;
    if (document.getElementById("Jardin").checked == true){
        jardin = "Si";
    } else if (document.getElementById("Jardin").checked == false){
        jardin = "No";
    }

    var areaLavado;
    if (document.getElementById("AreaLavado").checked == true){
        areaLavado = "Si";
    } else if (document.getElementById("AreaLavado").checked == false){
        areaLavado = "No";
    }

    var bodega;
    if (document.getElementById("Bodega").checked == true){
        bodega = "Si";
    } else if (document.getElementById("Bodega").checked == false){
        bodega = "No";
    }

    // Creacion del query 
    var q = "idInmueble="+idInmueble+"&metrosConstruccion="+metrosConstruccion+"&numRecamaras="+numRecamaras+"&numPiso="+numPiso+"&espacioHabitable="+espacioHabitable+"&numBanos="+numBanos
        +"&edadDepartamento="+edadDepartamento+"&tipoDepartamento="+tipoDepartamento+"&tipoCocina="+tipoCocina+"&estacionamiento="+estacionamiento+"&numCoches="+numCoches
        +"&estacionamientoTechado="+estacionamientoTechado+"&vigilancia="+vigilancia+"&cuartoServicio="+cuartoServicio
        +"&sala="+sala+"&comedor="+comedor+"&jardin="+jardin+"&areaLavado="+areaLavado+"&bodega="+bodega;

    console.log(q);

    // Verificar si hay campos vacios
    if (metrosConstruccion == null || metrosConstruccion == "", numRecamaras == null || numRecamaras == "", numPiso == null || numPiso == "", 
        espacioHabitable == null || espacioHabitable == "", numBanos == null || numBanos == "",
        edadDepartamento == null || edadDepartamento == "") {
            alert("Hay campos vacios");
    }

    // Verificar que si sera marcado en el checklist que hay cochera que se ingrese el numero de coches que caben
    if (estacionamiento == "Si"){
        if (numCoches == null || numCoches == "") {
            alert("Por favor indique para cuantos autos es el estacionamiento");
        }
    }

    console.log("Agregar Departamento");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var respuesta = xhr.responseXML;
            console.log(xhr.responseXML);

            var x = respuesta.getElementsByTagName("resultado");

            var titulo = x[0].getElementsByTagName("titulo")[0].textContent;

            var contenido = x[0].getElementsByTagName("contenido")[0].textContent;

            if (titulo == "Nuevo departamento"){
                alert(contenido);
                window.open(outerHTML,"_parent");
            } else if (titulo == "Error de conexion"){
                alert(contenido);
            }

        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/agregarDepartamento.pl", true);
    xhr.setRequestHeader(
        'Content-type', 
        'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);

};

function guardarEdificio(){
    // Obtener los datos de los input
    var metrosConstruccion = document.getElementById("txtMetrosConstruccion").value;
    var numPisos = document.getElementById("txtNumPisos").value;
    var numBanos = document.getElementById("txtNumBanos").value;
    var edadEdificio = document.getElementById("txtEdadEdificio").value;
    
    // Creacion del query 
    var q = "idInmueble="+idInmueble+"&metrosConstruccion="+metrosConstruccion+"&numPisos="+numPisos+"&numBanos="+numBanos+"&edadEdificio="+edadEdificio;

    console.log(q);

    // Verificar si hay campos vacios
    if (metrosConstruccion == null || metrosConstruccion == "", numPisos == null || numPisos == "", 
        numBanos == null || numBanos == "", edadEdificio == null || edadEdificio == "") {
            alert("Hay campos vacios");
    }

    console.log("Agregar Edificio");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var respuesta = xhr.responseXML;
            console.log(xhr.responseXML);

            var x = respuesta.getElementsByTagName("resultado");

            var titulo = x[0].getElementsByTagName("titulo")[0].textContent;

            var contenido = x[0].getElementsByTagName("contenido")[0].textContent;

            if (titulo == "Nuevo edificio"){
                alert(contenido);
                window.open(outerHTML,"_parent");
            } else if (titulo == "Error de conexion"){
                alert(contenido);
            }

        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/agregarEdificio.pl", true);
    xhr.setRequestHeader(
        'Content-type', 
        'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);

};

function guardarLocal(){
    // Obtener los datos de los input
    var metrosCuadrados = document.getElementById("txtMetrosCuadrados").value;
    var numBanos = document.getElementById("txtNumBanos").value;
    var edadLocal = document.getElementById("txtEdadLocal").value;
    var dentroPlaza = document.getElementById("DentroPlaza").value;
    
    // Creacion del query 
    var q = "idInmueble="+idInmueble+"&metrosCuadrados="+metrosCuadrados+"&numBanos="+numBanos+"&edadLocal="+edadLocal+"&dentroPlaza="+dentroPlaza;

    console.log(q);

    // Verificar si hay campos vacios
    if (metrosCuadrados == null || metrosCuadrados == "", numBanos == null || numBanos == "", 
        edadLocal == null || edadLocal == "") {
            alert("Hay campos vacios");
    }

    console.log("Agregar Local");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var respuesta = xhr.responseXML;
            console.log(xhr.responseXML);

            var x = respuesta.getElementsByTagName("resultado");

            var titulo = x[0].getElementsByTagName("titulo")[0].textContent;

            var contenido = x[0].getElementsByTagName("contenido")[0].textContent;

            if (titulo == "Nuevo local"){
                alert(contenido);
                window.open(outerHTML,"_parent");
            } else if (titulo == "Error de conexion"){
                alert(contenido);
            }

        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/agregarLocal.pl", true);
    xhr.setRequestHeader(
        'Content-type', 
        'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);

};

function guardarOficina(){
    // Obtener los datos de los input
    var metrosCuadrados = document.getElementById("txtMetrosCuadrados").value;
    var numBanos = document.getElementById("txtNumBanos").value;
    var edadOficina = document.getElementById("txtEdadOficina").value;
    
    var areaAbierta;
    if (document.getElementById("AreaAbierta").checked == true) {
        areaAbierta = "Si";
    } else if (document.getElementById("AreaAbierta").checked == false) {
        areaAbierta = "No";
    }
    var metrosAreaAbierta = document.getElementById("inputMetrosAreaAbierta").value;

    var privados;
    if (document.getElementById("Privados").checked == true) {
        privados = "Si";
    } else if (document.getElementById("Privados").checked == false) {
        privados = "No";
    }
    var numPrivados = document.getElementById("inputNumPrivados").value;
    
    var estacionamiento;
    if (document.getElementById("Estacionamiento").checked == true) {
        estacionamiento = "Si";
    } else if (document.getElementById("Estacionamiento").checked == false) {
        estacionamiento = "No";
    }
    var numCoches = document.getElementById("inputNumCoches").value;
    
    var recepcion;
    if (document.getElementById("Recepcion").checked == true) {
        recepcion = "Si";
    } else if (document.getElementById("Recepcion").checked == false) {
        recepcion = "No";
    }

    // Creacion del query 
    var q = "idInmueble="+idInmueble+"&metrosCuadrados="+metrosCuadrados+"&numBanos="+numBanos
            +"&edadOficina="+edadOficina+"&areaAbierta="+areaAbierta+"&metrosAreaAbierta="+metrosAreaAbierta
            +"&privados="+privados+"&numPrivados="+numPrivados+"&estacionamiento="+estacionamiento
            +"&numCoches="+numCoches+"&recepcion="+recepcion;

    console.log(q);

    // Verificar si hay campos vacios
    if (metrosCuadrados == null || metrosCuadrados == "", numBanos == null || numBanos == "", 
        edadOficina == null || edadOficina == "") {
            alert("Hay campos vacios");
    }

    if (areaAbierta == "Si"){
        if (metrosAreaAbierta == null || metrosAreaAbierta == "") {
            alert("Hay campos vacios");
        }
    }

    if (privados == "Si"){
        if (numPrivados == null || numPrivados == "") {
            alert("Hay campos vacios");
        }
    }

    if (estacionamiento == "Si"){
        if (numCoches == null || numCoches == "") {
            alert("Hay campos vacios");
        }
    }

    console.log("Agregar Oficina");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var respuesta = xhr.responseXML;
            console.log(xhr.responseXML);

            var x = respuesta.getElementsByTagName("resultado");

            var titulo = x[0].getElementsByTagName("titulo")[0].textContent;

            var contenido = x[0].getElementsByTagName("contenido")[0].textContent;

            if (titulo == "Nueva oficina"){
                alert(contenido);
                window.open(outerHTML,"_parent");
            } else if (titulo == "Error de conexion"){
                alert(contenido);
            }

        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/agregarOficina.pl", true);
    xhr.setRequestHeader(
        'Content-type', 
        'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);

};

function guardarTerreno(){
    // Obtener los datos de los input
    var metrosCuadrados = document.getElementById("txtMetrosCuadrados").value;
    var usoSuelo = document.getElementById("usoSuelo").value;
    var poligonal = document.getElementById("poligonal").value;
    var pendiente = document.getElementById("pendiente").value;
    var esquina = document.getElementById("esquina").value;

    // Creacion del query 
    var q = "idInmueble="+idInmueble+"&metrosCuadrados="+metrosCuadrados+"&usoSuelo="+usoSuelo+"&poligonal="+poligonal+"&pendiente="+pendiente+"&esquina="+esquina;

    console.log(q);

    // Verificar si hay campos vacios
    if (metrosCuadrados == null || metrosCuadrados == "") {
            alert("Hay campos vacios");
    }

    console.log("Agregar Terreno");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var respuesta = xhr.responseXML;
            console.log(xhr.responseXML);

            var x = respuesta.getElementsByTagName("resultado");

            var titulo = x[0].getElementsByTagName("titulo")[0].textContent;

            var contenido = x[0].getElementsByTagName("contenido")[0].textContent;

            if (titulo == "Nuevo terreno"){
                alert(contenido);
                window.open(outerHTML,"_parent");
            } else if (titulo == "Error de conexion"){
                alert(contenido);
            }

        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/agregarTerreno.pl", true);
    xhr.setRequestHeader(
        'Content-type', 
        'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);

};