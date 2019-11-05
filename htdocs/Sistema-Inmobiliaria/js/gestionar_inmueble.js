
/* DECLARACION DE VARIABLES DEL INMUEBLE*/
var idPropietario;
var nombrePropietario;
var ciudad;
var colonia;
var calle;
var numExt;
var numInt;
var precio;
var tipoInmueble;
var tipoTransaccion;
var idInmueble;
var tipoInmuebleAntesActualizar;

/* DECLARACION DE VARIABLES (CASA) */
var idCasa;
var tipoCasa;
var metrosCuadrados;

var outerHTML;
var idAsesor;
var nombreAsesor;

document.getElementById("cmbPropietario").setAttribute("disabled","disabled");
document.getElementById("txtciudad").setAttribute("disabled","disabled");
document.getElementById("txtcolonia").setAttribute("disabled","disabled");
document.getElementById("txtcalle").setAttribute("disabled","disabled");
document.getElementById("txtnumExt").setAttribute("disabled","disabled");
document.getElementById("txtnumInt").setAttribute("disabled","disabled");
document.getElementById("txtprecio").setAttribute("disabled","disabled");
document.getElementById("tipoInmueble").setAttribute("disabled","disabled");
document.getElementById("tipoTransaccion").setAttribute("disabled","disabled");


variable = (new URL(document.location)).searchParams;
if (variable.get("idInmueble") != null){
    idInmueble = variable.get("idInmueble");
    nombreAsesor = variable.get("nombreAsesor");
    idAsesor = variable.get("idAsesor");
    outerHTML = variable.get("link");
    cargarInmueble(variable.get("idInmueble"));
    cargarPropietariosComboBox(idAsesor);
    history.replaceState({}, null, "/Sistema-Inmobiliaria/html/menu_Inmueble.html");
    
} else {
    alert("No se pudo recuperar la informacion de la base de datos");
}


function cargarPropietariosComboBox(id) {
    var xhr = new XMLHttpRequest();
    var existeRespuesta = new Boolean (false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            var respuesta = xhr.responseXML;
            console.log("Cargar combobox propietarios");
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

/* FUNCION QUE REGRESA EL ID DEL ASESOR DEL PROPIETARIO DEL INMUEBLE */
function verificarPermisosInmueble(id) {
    var xhr = new XMLHttpRequest();
    var q = "idPropietario="+id;
    var contenido;
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var respuesta = xhr.responseXML;
            console.log("Verificar Permisos");
            console.log(xhr.responseXML);
            
            var x = respuesta.getElementsByTagName("resultado");

            var titulo = x[0].getElementsByTagName("titulo")[0].textContent;
            contenido = x[0].getElementsByTagName("contenido")[0].textContent;
            
            if (titulo == "Asesor Recuperado"){
                if (idAsesor == contenido){
                    document.getElementById("divWhenMostrar").style.display = "block";
                    document.getElementById("divPropietario").style.display = "block";
                } 
            } else if (titulo == "Error de conexion"){
                alert("Error de conexion con la base de datos");
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/verificarPermisosInmueble.pl", true);
    xhr.setRequestHeader(
        'Content-type', 
        'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
}

function clickActualizar(){
    document.getElementById("titulo").innerHTML = "ACTUALIZAR INMUEBLE";
    document.getElementById("divWhenActualizar").style.display = "block";
    document.getElementById("divWhenMostrar").style.display = "none";
    // INMUEBLE
    document.getElementById("cmbPropietario").removeAttribute("disabled");
    document.getElementById("txtciudad").removeAttribute("disabled");
    document.getElementById("txtcolonia").removeAttribute("disabled");
    document.getElementById("txtcalle").removeAttribute("disabled");
    document.getElementById("txtnumExt").removeAttribute("disabled");
    document.getElementById("txtnumInt").removeAttribute("disabled");
    document.getElementById("txtprecio").removeAttribute("disabled");
    //document.getElementById("tipoInmueble").removeAttribute("disabled");
    document.getElementById("tipoTransaccion").removeAttribute("disabled");

    // DEPENDE DE CADA INMUEBLE
    if (tipoInmueble == "Casa"){
        document.getElementById("txtMetrosCuadrados").removeAttribute("disabled");
        document.getElementById("txtMetrosConstruccion").removeAttribute("disabled");
        document.getElementById("txtNumPisos").removeAttribute("disabled");
        document.getElementById("txtNumRecamaras").removeAttribute("disabled");
        document.getElementById("txtNumBanos").removeAttribute("disabled");
        document.getElementById("tipoCasa").removeAttribute("disabled");
        document.getElementById("tipoCocina").removeAttribute("disabled");
        document.getElementById("txtEdadCasa").removeAttribute("disabled");
        document.getElementById("Cochera").removeAttribute("disabled");
        document.getElementById("Cochera_Techada").removeAttribute("disabled");
        document.getElementById("inputNumCoches").removeAttribute("disabled");
        document.getElementById("Fraccionamiento").removeAttribute("disabled");
        document.getElementById("Fraccionamiento_Vigilancia").removeAttribute("disabled");
        document.getElementById("Fraccionamiento_AreaVerde").removeAttribute("disabled");
        document.getElementById("Fraccionamiento_CasaClub").removeAttribute("disabled");
        document.getElementById("CuartoServicio").removeAttribute("disabled");
        document.getElementById("Sala").removeAttribute("disabled");
        document.getElementById("Comedor").removeAttribute("disabled");
        document.getElementById("Jardin").removeAttribute("disabled");
        document.getElementById("AreaLavado").removeAttribute("disabled");
        document.getElementById("Bodega").removeAttribute("disabled");
    } else if (tipoInmueble == "Departamento") {
        document.getElementById("txtMetrosConstruccion").removeAttribute("disabled");
        document.getElementById("txtNumRecamaras").removeAttribute("disabled");
        document.getElementById("txtPiso").removeAttribute("disabled");
        document.getElementById("txtEspacioHabitable").removeAttribute("disabled");
        document.getElementById("txtNumBanos").removeAttribute("disabled");
        document.getElementById("txtEdad").removeAttribute("disabled");
        document.getElementById("tipoDepartamento").removeAttribute("disabled");
        document.getElementById("tipoCocina").removeAttribute("disabled");
        document.getElementById("Estacionamiento").removeAttribute("disabled");
        document.getElementById("inputNumCoches").removeAttribute("disabled");
        document.getElementById("Estacionamiento_Techado").removeAttribute("disabled");
        document.getElementById("Vigilancia").removeAttribute("disabled");
        document.getElementById("CuartoServicio").removeAttribute("disabled");
        document.getElementById("Sala").removeAttribute("disabled");
        document.getElementById("Comedor").removeAttribute("disabled");
        document.getElementById("Jardin").removeAttribute("disabled");
        document.getElementById("AreaLavado").removeAttribute("disabled");
        document.getElementById("Bodega").removeAttribute("disabled");
    } else if (tipoInmueble == "Local") {
        document.getElementById("txtMetrosCuadrados").removeAttribute("disabled");
        document.getElementById("txtNumBanos").removeAttribute("disabled");
        document.getElementById("txtEdadLocal").removeAttribute("disabled");
        document.getElementById("DentroPlaza").removeAttribute("disabled");
    } else if (tipoInmueble == "Oficina") {
        document.getElementById("txtMetrosCuadrados").removeAttribute("disabled");
        document.getElementById("txtNumBanos").removeAttribute("disabled");
        document.getElementById("txtEdadOficina").removeAttribute("disabled");
        document.getElementById("AreaAbierta").removeAttribute("disabled");
        document.getElementById("inputMetrosAreaAbierta").removeAttribute("disabled");
        document.getElementById("Privados").removeAttribute("disabled");
        document.getElementById("inputNumPrivados").removeAttribute("disabled");
        document.getElementById("Estacionamiento").removeAttribute("disabled");
        document.getElementById("inputNumCoches").removeAttribute("disabled");
        document.getElementById("Recepcion").removeAttribute("disabled");
    } else if (tipoInmueble == "Edificio") {
                document.getElementById("txtMetrosConstruccion").removeAttribute("disabled");
                document.getElementById("txtNumPisos").removeAttribute("disabled");
                document.getElementById("txtNumBanos").removeAttribute("disabled");
                document.getElementById("txtEdadEdificio").removeAttribute("disabled");
    } else if (tipoInmueble == "Terreno") {
        document.getElementById("txtMetrosCuadrados").removeAttribute("disabled");
        document.getElementById("usoSuelo").removeAttribute("disabled");
        document.getElementById("poligonal").removeAttribute("disabled");
        document.getElementById("pendiente").removeAttribute("disabled");
        document.getElementById("esquina").removeAttribute("disabled");

    }
}

function clickCancelar(){
    document.getElementById("titulo").innerHTML = "MOSTRAR INMUEBLE";
    document.getElementById("divWhenMostrar").style.display = "block";
    document.getElementById("divWhenActualizar").style.display = "none";
    
    document.getElementById("cmbPropietario").removeAttribute("disabled");
    document.getElementById("txtciudad").removeAttribute("disabled");
    document.getElementById("txtcolonia").removeAttribute("disabled");
    document.getElementById("txtcalle").removeAttribute("disabled");
    document.getElementById("txtnumExt").removeAttribute("disabled");
    document.getElementById("txtnumInt").removeAttribute("disabled");
    document.getElementById("txtprecio").removeAttribute("disabled");
    document.getElementById("tipoInmueble").removeAttribute("disabled");
    document.getElementById("tipoTransaccion").removeAttribute("disabled");

    document.getElementById("txtciudad").value = ciudad;
    document.getElementById("txtcolonia").value = colonia;
    document.getElementById("txtcalle").value = calle;
    document.getElementById("txtnumExt").value = numExt;
    document.getElementById("txtnumInt").value = numInt;
    document.getElementById("txtprecio").value = precio;
    document.getElementById("tipoInmueble").value = tipoInmueble;
    document.getElementById("tipoTransaccion").value = tipoTransaccion;
    for(var i = 0, j = sel.options.length; i < j; ++i) {
        if(sel.options[i].innerHTML === nombrePropietario) {
           sel.selectedIndex = i;
           break;
        }
    }
}

function cargarInmueble(id){
   
    var xhr = new XMLHttpRequest();
    idInmueble = id;
    var q = "idInmueble="+idInmueble;

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var respuesta = xhr.responseXML;
            console.log("Cargar inmueble");
            console.log(xhr.responseXML);
            
            var x = respuesta.getElementsByTagName("resultado");

            var titulo = x[0].getElementsByTagName("titulo")[0].textContent;
            
            if (titulo == "Carga exitosa"){
                ciudad = x[0].getElementsByTagName("ciudad")[0].textContent;
                document.getElementById("txtciudad").value = ciudad;
                colonia = x[0].getElementsByTagName("colonia")[0].textContent;
                document.getElementById("txtcolonia").value = colonia;
                calle = x[0].getElementsByTagName("calle")[0].textContent;
                document.getElementById("txtcalle").value = calle;
                numExt = x[0].getElementsByTagName("numExt")[0].textContent;
                document.getElementById("txtnumExt").value = numExt;
                numInt = x[0].getElementsByTagName("numInt")[0].textContent;
                document.getElementById("txtnumInt").value = numInt;
                precio = x[0].getElementsByTagName("precio")[0].textContent;
                document.getElementById("txtprecio").value = precio;
                tipoInmueble = x[0].getElementsByTagName("tipoInmueble")[0].textContent;
                document.getElementById("tipoInmueble").value = tipoInmueble;
                tipoInmuebleAntesActualizar = tipoInmueble;
                tipoTransaccion = x[0].getElementsByTagName("tipoTransaccion")[0].textContent;
                document.getElementById("tipoTransaccion").value = tipoTransaccion;
                idPropietario = x[0].getElementsByTagName("idPropietario")[0].textContent;
                getNombrePropietario(idPropietario);
                verificarPermisosInmueble(idPropietario);
                if (tipoInmueble == "Casa"){
                    abrirFormularioCasa();
                    cargarCasa();
                } else if (tipoInmueble == "Departamento"){
                    abrirFormularioDepartamento();
                    cargarDepartamento();
                } else if (tipoInmueble == "Edificio"){
                    abrirFormularioEdificio();
                    cargarEdificio();
                } else if (tipoInmueble == "Local"){
                    abrirFormularioLocal();
                    cargarLocal();
                } else if (tipoInmueble == "Oficina"){
                    abrirFormularioOficina();
                    cargarOficina();
                } else if (tipoInmueble == "Terreno"){
                    abrirFormularioTerreno();
                    cargarTerreno();
                }
            } else if (titulo == "Error de conexion"){
                alert("Error de conexion con la base de datos");
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/mostrarInmuebleInfo.pl", true);
    xhr.setRequestHeader(
        'Content-type', 
        'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
}

function getNombrePropietario(id){
    var xhr = new XMLHttpRequest();
    var q = "idPropietario="+id;
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var respuesta = xhr.responseXML;
            console.log("getNombrePropietario");
            console.log(xhr.responseXML);
            
            var x = respuesta.getElementsByTagName("resultado");

            var titulo = x[0].getElementsByTagName("titulo")[0].textContent;
            
            if (titulo == "Carga exitosa"){
                var nombre = x[0].getElementsByTagName("nombre")[0].textContent;
                var apellidoP = x[0].getElementsByTagName("apellidoP")[0].textContent;
                var apellidoM = x[0].getElementsByTagName("apellidoM")[0].textContent;

                nombrePropietario = nombre + " " + apellidoP + " " + apellidoM;
                var sel = document.getElementById('cmbPropietario');
                for(var i = 0, j = sel.options.length; i < j; ++i) {
                    if(sel.options[i].innerHTML === nombrePropietario) {
                       sel.selectedIndex = i;
                       break;
                    }
                }

                //document.getElementById("cmbPropietario").value = nombreCompleto;

            } else if (titulo == "Error de conexion"){
                alert("Error de conexion con la base de datos");
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/getNombrePropietario.pl", true);
    xhr.setRequestHeader(
        'Content-type', 
        'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
}

function actualizarInmueble(){

    // RECUPERAR DATOS DE LOS INPUT
    ciudad = document.getElementById("txtciudad").value;
    colonia = document.getElementById("txtcolonia").value;
    calle = document.getElementById("txtcalle").value;
    numExt = document.getElementById("txtnumExt").value;
    numInt = document.getElementById("txtnumInt").value;
    precio = document.getElementById("txtprecio").value;

    tipoInmueble = document.getElementById("tipoInmueble").value;
    tipoTransaccion = document.getElementById("tipoTransaccion").value;
    var cmb = document.getElementById("cmbPropietario");
    idPropietario = cmb.options[cmb.selectedIndex].value;

    var camposVacios = new Boolean(false);

    if (ciudad == null || ciudad == "" || colonia == null || colonia == "" || calle == null || calle == "" || numExt == null || numExt == "" || precio == null || precio == ""){
            camposVacios = true;
    }

    // CREACION DEL QUERY
    var q = "idInmueble="+idInmueble+"&ciudad="+ciudad+"&colonia="+colonia+"&calle="+calle+"&numExt="+numExt+"&numInt="+numInt+"&precio="+precio
            +"&tipoInmueble="+tipoInmueble+"&tipoTransaccion="+tipoTransaccion+"&idPropietario="+idPropietario;
    console.log(q);
    // VALIDACION DE CAMPOS VACIOS
    if (camposVacios == true) {
        alert("Hay campos vacios, verifica que todos los campos esten llenos");
    } else {
        var xhr = new XMLHttpRequest();
        var titulo;
        var contenido;
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var respuesta = xhr.responseXML;
                console.log("Actualizar inmueble")
                console.log(xhr.responseXML);
                var x = respuesta.getElementsByTagName("resultado");

                titulo = x[0].getElementsByTagName("titulo")[0].textContent;
                contenido = x[0].getElementsByTagName("contenido")[0].textContent;

                if (titulo == "Inmueble actualizado"){
                    //alert(contenido);
                    tipoInmueble = x[0].getElementsByTagName("tipoInmueble")[0].textContent;
                    console.log("Tipo Inmueble a Actualizar = " + tipoInmueble);
                    //window.open(outerHTML,"_parent");

                    actualizarTipoInmueble(tipoInmueble);
                } else if (titulo == "Error de conexion"){
                    alert(contenido);
                }
            }
        }

        xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/modificarInmueble.pl", true);
        xhr.setRequestHeader(
            'Content-type', 
            'application/x-www-form-urlencoded'
        ); 
        xhr.responseType = "document";
        xhr.send(q);
    }
};

function actualizarTipoInmueble(tipoInmueble){
    alert(tipoInmueble)
    if (tipoInmueble == "Casa"){
        actualizarCasa();
    } else if (tipoInmueble == "Departamento"){
        actualizarDepartamento();
    } else if (tipoInmueble == "Oficina"){
        actualizarOficina();
    } else if (tipoInmueble == "Edificio"){
        actualizarEdificio();
    } else if (tipoInmueble == "Local"){
        actualizarLocal();
    } else if (tipoInmueble == "Terreno"){
        actualizarTerreno();
    }
}


function actualizarCasa(){
    // RECUPERAR DATOS DE LOS INPUT
    var metrosCuadrados = document.getElementById("txtMetrosCuadrados").value;
    var metrosConstruccion = document.getElementById("txtMetrosConstruccion").value;
    var numPisos = document.getElementById("txtNumPisos").value;
    var numRecamaras = document.getElementById("txtNumRecamaras").value;
    var numBanos = document.getElementById("txtNumBanos").value;
    var edadCasa = document.getElementById("txtEdadCasa").value;
    var tipoCasa = document.getElementById("tipoCasa").value;
    var tipoCocina = document.getElementById("tipoCocina").value;

    var cochera;
    if (document.getElementById("Cochera").checked == true){
        cochera = "Si";
    } else if (document.getElementById("Cochera").checked == false){
        cochera = "No";
    }

    var cocheraTechada;
    if (document.getElementById("Cochera_Techada").checked == true){
        cocheraTechada = "Si";
    } else if (document.getElementById("Cochera_Techada").checked == false){
        cocheraTechada = "No";
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

    var camposVacios = new Boolean(false);

    if (metrosCuadrados == null || metrosCuadrados == "" || metrosConstruccion == null || metrosConstruccion == "" || numPisos == null || numPisos == "" || numRecamaras == null || numRecamaras == "" || numBanos == null || numBanos == "" || edadCasa == null || edadCasa == ""){
            camposVacios = true;
    }

    // CREACION DEL QUERY
    var q = "idInmueble="+idInmueble+"&metrosCuadrados="+metrosCuadrados+"&metrosConstruccion="+metrosConstruccion+"&numPisos="+numPisos+"&numRecamaras="+numRecamaras+"&numBanos="+numBanos
    +"&edadCasa="+edadCasa+"&tipoCasa="+tipoCasa+"&tipoCocina="+tipoCocina+"&cochera="+cochera+"&numCoches="+numCoches
    +"&cocheraTechada="+cocheraTechada+"&fraccionamiento="+fraccionamiento+"&fraccionamientoVigilancia="+fraccionamientoVigilancia
    +"&fraccionamientoAreaVerde="+fraccionamientoAreaVerde+"&fraccionamientoCasaClub="+fraccionamientoCasaClub+"&cuartoServicio="+cuartoServicio
    +"&sala="+sala+"&comedor="+comedor+"&jardin="+jardin+"&areaLavado="+areaLavado+"&bodega="+bodega;


    console.log(q);
    // VALIDACION DE CAMPOS VACIOS
    if (camposVacios == true) {
        alert("Hay campos vacios, verifica que todos los campos esten llenos");
    } else {
        var xhr = new XMLHttpRequest();
        var titulo;
        var contenido;
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var respuesta = xhr.responseXML;
                console.log("Actualizar Casa")
                console.log(xhr.responseXML);
                var x = respuesta.getElementsByTagName("resultado");

                titulo = x[0].getElementsByTagName("titulo")[0].textContent;
                
                if (titulo == "Casa actualizada"){
                    alert("Se ha actualizado el inmueble");
                    outerHTML = outerHTML+"&nombre="+nombreAsesor;

                    window.open(outerHTML,"_parent");
                } else if (titulo == "Error de conexion"){
                    alert(contenido);
                }
            }
        }

        xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/modificarCasa.pl", true);
        xhr.setRequestHeader(
            'Content-type', 
            'application/x-www-form-urlencoded'
        ); 
        xhr.responseType = "document";
        xhr.send(q);
    }
}

function actualizarDepartamento(){
    // RECUPERAR DATOS DE LOS INPUT
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

    var camposVacios = new Boolean(false);
    // Creacion del query 
    var q = "idInmueble="+idInmueble+"&metrosConstruccion="+metrosConstruccion+"&numRecamaras="+numRecamaras+"&numPiso="+numPiso+"&espacioHabitable="+espacioHabitable+"&numBanos="+numBanos
        +"&edadDepartamento="+edadDepartamento+"&tipoDepartamento="+tipoDepartamento+"&tipoCocina="+tipoCocina+"&estacionamiento="+estacionamiento+"&numCoches="+numCoches
        +"&estacionamientoTechado="+estacionamientoTechado+"&vigilancia="+vigilancia+"&cuartoServicio="+cuartoServicio
        +"&sala="+sala+"&comedor="+comedor+"&jardin="+jardin+"&areaLavado="+areaLavado+"&bodega="+bodega;

    console.log(q);

    if (metrosConstruccion == null || metrosConstruccion == "", numRecamaras == null || numRecamaras == "", numPiso == null || numPiso == "", 
        espacioHabitable == null || espacioHabitable == "", numBanos == null || numBanos == "",
        edadDepartamento == null || edadDepartamento == "") {
            camposVacios = true;
    }

    // Verificar que si sera marcado en el checklist que hay cochera que se ingrese el numero de coches que caben
    if (estacionamiento == "Si"){
        if (numCoches == null || numCoches == "") {
            camposVacios = true;
        }
    }

    // VALIDACION DE CAMPOS VACIOS
    if (camposVacios == true) {
        alert("Hay campos vacios, verifica que todos los campos esten llenos");
    } else {
        var xhr = new XMLHttpRequest();
        var titulo;
        var contenido;
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var respuesta = xhr.responseXML;
                console.log("Actualizar Casa")
                console.log(xhr.responseXML);
                var x = respuesta.getElementsByTagName("resultado");

                titulo = x[0].getElementsByTagName("titulo")[0].textContent;
                
                if (titulo == "Departamento actualizado"){
                    alert("Se ha actualizado el inmueble");
                    outerHTML = outerHTML+"&nombre="+nombreAsesor;

                    window.open(outerHTML,"_parent");
                } else if (titulo == "Error de conexion"){
                    alert(contenido);
                }
            }
        }

        xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/modificarDepartamento.pl", true);
        xhr.setRequestHeader(
            'Content-type', 
            'application/x-www-form-urlencoded'
        ); 
        xhr.responseType = "document";
        xhr.send(q);
    }
}

function actualizarOficina(){
    var camposVacios = new Boolean(false);
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
            camposVacios = true;
    }

    if (areaAbierta == "Si"){
        if (metrosAreaAbierta == null || metrosAreaAbierta == "") {
            camposVacios = true;
        }
    }

    if (privados == "Si"){
        if (numPrivados == null || numPrivados == "") {
            camposVacios = true;
        }
    }

    if (estacionamiento == "Si"){
        if (numCoches == null || numCoches == "") {
            camposVacios = true;
        }
    }

    // VALIDACION DE CAMPOS VACIOS
    if (camposVacios == true) {
        alert("Hay campos vacios, verifica que todos los campos esten llenos");
    } else {
        var xhr = new XMLHttpRequest();
        var titulo;
        var contenido;
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var respuesta = xhr.responseXML;
                console.log("Actualizar Oficina")
                console.log(xhr.responseXML);
                var x = respuesta.getElementsByTagName("resultado");

                titulo = x[0].getElementsByTagName("titulo")[0].textContent;
                
                if (titulo == "Oficina actualizada"){
                    alert("Se ha actualizado el inmueble");
                    outerHTML = outerHTML+"&nombre="+nombreAsesor;

                    window.open(outerHTML,"_parent");
                } else if (titulo == "Error de conexion"){
                    alert(contenido);
                }
            }
        }

        xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/modificarOficina.pl", true);
        xhr.setRequestHeader(
            'Content-type', 
            'application/x-www-form-urlencoded'
        ); 
        xhr.responseType = "document";
        xhr.send(q);
    }
}

function actualizarTerreno(){
    var camposVacios = new Boolean(false);
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
        camposVacios = true;
    }

    // VALIDACION DE CAMPOS VACIOS
    if (camposVacios == true) {
        alert("Hay campos vacios, verifica que todos los campos esten llenos");
    } else {
        var xhr = new XMLHttpRequest();
        var titulo;
        var contenido;
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var respuesta = xhr.responseXML;
                console.log("Actualizar Terreno")
                console.log(xhr.responseXML);
                var x = respuesta.getElementsByTagName("resultado");

                titulo = x[0].getElementsByTagName("titulo")[0].textContent;
                
                if (titulo == "Terreno actualizado"){
                    alert("Se ha actualizado el inmueble");
                    outerHTML = outerHTML+"&nombre="+nombreAsesor;

                    window.open(outerHTML,"_parent");
                } else if (titulo == "Error de conexion"){
                    alert(contenido);
                }
            }
        }

        xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/modificarTerreno.pl", true);
        xhr.setRequestHeader(
            'Content-type', 
            'application/x-www-form-urlencoded'
        ); 
        xhr.responseType = "document";
        xhr.send(q);
    }
}

function actualizarLocal(){
    var camposVacios = new Boolean(false);
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
            camposVacios = true;
    }

    // VALIDACION DE CAMPOS VACIOS
    if (camposVacios == true) {
        alert("Hay campos vacios, verifica que todos los campos esten llenos");
    } else {
        var xhr = new XMLHttpRequest();
        var titulo;
        var contenido;
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var respuesta = xhr.responseXML;
                console.log("Actualizar Terreno")
                console.log(xhr.responseXML);
                var x = respuesta.getElementsByTagName("resultado");

                titulo = x[0].getElementsByTagName("titulo")[0].textContent;
                
                if (titulo == "Local actualizado"){
                    alert("Se ha actualizado el inmueble");
                    outerHTML = outerHTML+"&nombre="+nombreAsesor;

                    window.open(outerHTML,"_parent");
                } else if (titulo == "Error de conexion"){
                    alert(contenido);
                }
            }
        }

        xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/modificarLocal.pl", true);
        xhr.setRequestHeader(
            'Content-type', 
            'application/x-www-form-urlencoded'
        ); 
        xhr.responseType = "document";
        xhr.send(q);
    }
}

function actualizarEdificio(){
    var camposVacios = new Boolean(false);
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
            camposVacios = true;
    }

    // VALIDACION DE CAMPOS VACIOS
    if (camposVacios == true) {
        alert("Hay campos vacios, verifica que todos los campos esten llenos");
    } else {
        var xhr = new XMLHttpRequest();
        var titulo;
        var contenido;
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var respuesta = xhr.responseXML;
                console.log("Actualizar Edificio")
                console.log(xhr.responseXML);
                var x = respuesta.getElementsByTagName("resultado");

                titulo = x[0].getElementsByTagName("titulo")[0].textContent;
                
                if (titulo == "Edificio actualizado"){
                    alert("Se ha actualizado el inmueble");
                    outerHTML = outerHTML+"&nombre="+nombreAsesor;

                    window.open(outerHTML,"_parent");
                } else if (titulo == "Error de conexion"){
                    alert(contenido);
                }
            }
        }

        xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/modificarEdificio.pl", true);
        xhr.setRequestHeader(
            'Content-type', 
            'application/x-www-form-urlencoded'
        ); 
        xhr.responseType = "document";
        xhr.send(q);
    }
}

function clickEliminar(){
    alert("Eliminar Inmueble");
    var q = "idInmueble="+idInmueble;
    console.log("Eliminar Inmueble");
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                var respuesta = xhr.responseXML;
                console.log(xhr.responseXML);
                
                var x = respuesta.getElementsByTagName("resultado");

                var titulo = x[0].getElementsByTagName("titulo")[0].textContent;
                var contenido = x[0].getElementsByTagName("contenido")[0].textContent;

                if (titulo == "Exito al eliminar"){
                    alert(contenido);
                    outerHTML = outerHTML+"&nombre="+nombreAsesor;
                    window.open(outerHTML,"_parent");
                } else if (titulo == "Error de conexion"){
                    alert(contenido);
                }
            }
        }

        xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/eliminarInmueble.pl", true);
        xhr.setRequestHeader(
            'Content-type', 
            'application/x-www-form-urlencoded'
        ); 
        xhr.responseType = "document";
        xhr.send(q);
};

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
            console.log("Abrir formulario casa");
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

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/agregarCasa.pl", true);
    xhr.setRequestHeader(
    'Content-type', 
    'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send();
};

function cargarCasa(){
    var xhr = new XMLHttpRequest();
    var q = "idInmueble="+idInmueble;
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var respuesta = xhr.responseXML;
            console.log("Cargar Casa");
            console.log(xhr.responseXML);
            
            var x = respuesta.getElementsByTagName("resultado");

            var titulo = x[0].getElementsByTagName("titulo")[0].textContent;
            
            if (titulo == "Carga exitosa"){
                var idCasa = x[0].getElementsByTagName("idCasa")[0].textContent;
                var metrosCuadrados = x[0].getElementsByTagName("metrosCuadrados")[0].textContent;
                document.getElementById("txtMetrosCuadrados").value = metrosCuadrados;
                document.getElementById("txtMetrosCuadrados").setAttribute("disabled","disabled");

                var metrosConstruccion = x[0].getElementsByTagName("metrosConstruccion")[0].textContent;
                document.getElementById("txtMetrosConstruccion").value = metrosConstruccion;
                document.getElementById("txtMetrosConstruccion").setAttribute("disabled","disabled");

                var numPisos = x[0].getElementsByTagName("numPisos")[0].textContent;
                document.getElementById("txtNumPisos").value = numPisos;
                document.getElementById("txtNumPisos").setAttribute("disabled","disabled");
                
                var numRecamaras = x[0].getElementsByTagName("numRecamaras")[0].textContent;
                document.getElementById("txtNumRecamaras").value = numRecamaras;
                document.getElementById("txtNumRecamaras").setAttribute("disabled","disabled");

                var numBanos = x[0].getElementsByTagName("numBanos")[0].textContent;
                document.getElementById("txtNumBanos").value = numBanos;
                document.getElementById("txtNumBanos").setAttribute("disabled","disabled");

                var tipoCasa = x[0].getElementsByTagName("tipoCasa")[0].textContent;
                document.getElementById("tipoCasa").value = tipoCasa;
                document.getElementById("tipoCasa").setAttribute("disabled","disabled");

                var tipoCocina = x[0].getElementsByTagName("tipoCocina")[0].textContent;
                document.getElementById("tipoCocina").value = tipoCocina;
                document.getElementById("tipoCocina").setAttribute("disabled","disabled");

                var edadCasa = x[0].getElementsByTagName("edadCasa")[0].textContent;
                document.getElementById("txtEdadCasa").value = edadCasa;
                document.getElementById("txtEdadCasa").setAttribute("disabled","disabled");

                var cochera = x[0].getElementsByTagName("cochera")[0].textContent;
                if (cochera == "Si"){
                    document.getElementById("Cochera").checked = true;
                } else if (cochera == "No"){
                    document.getElementById("Cochera").checked = false;
                }
                document.getElementById("Cochera").setAttribute("disabled","disabled");

                var cocheraTechada = x[0].getElementsByTagName("cocheraTechada")[0].textContent;
                if (cocheraTechada == "Si"){
                    document.getElementById("Cochera_Techada").checked = true;
                } else if (cocheraTechada == "No"){
                    document.getElementById("Cochera_Techada").checked = false;
                }
                document.getElementById("Cochera_Techada").setAttribute("disabled","disabled");

                var numCoches = x[0].getElementsByTagName("numCoches")[0].textContent;
                document.getElementById("inputNumCoches").value = numCoches;
                document.getElementById("inputNumCoches").setAttribute("disabled","disabled");

                var fraccionamiento = x[0].getElementsByTagName("fraccionamiento")[0].textContent;
                if (fraccionamiento == "Si"){
                    document.getElementById("Fraccionamiento").checked = true;
                } else if (fraccionamiento == "No"){
                    document.getElementById("Fraccionamiento").checked = false;
                }
                document.getElementById("Fraccionamiento").setAttribute("disabled","disabled");

                var fraccionamientoVigilancia = x[0].getElementsByTagName("fraccionamientoVigilancia")[0].textContent;
                if (fraccionamientoVigilancia == "Si"){
                    document.getElementById("Fraccionamiento_Vigilancia").checked = true;
                } else if (fraccionamientoVigilancia == "No"){
                    document.getElementById("Fraccionamiento_Vigilancia").checked = false;
                }
                document.getElementById("Fraccionamiento_Vigilancia").setAttribute("disabled","disabled");

                var fraccionamientoAreaVerde = x[0].getElementsByTagName("fraccionamientoAreaVerde")[0].textContent;
                if (fraccionamientoAreaVerde == "Si"){
                    document.getElementById("Fraccionamiento_AreaVerde").checked = true;
                } else if (fraccionamientoAreaVerde == "No"){
                    document.getElementById("Fraccionamiento_AreaVerde").checked = false;
                }
                document.getElementById("Fraccionamiento_AreaVerde").setAttribute("disabled","disabled");

                var fraccionamientoCasaClub = x[0].getElementsByTagName("fraccionamientoCasaClub")[0].textContent;
                if (fraccionamientoCasaClub == "Si"){
                    document.getElementById("Fraccionamiento_CasaClub").checked = true;
                } else if (fraccionamientoCasaClub == "No"){
                    document.getElementById("Fraccionamiento_CasaClub").checked = false;
                }
                document.getElementById("Fraccionamiento_CasaClub").setAttribute("disabled","disabled");

                var cuartoServicio = x[0].getElementsByTagName("cuartoServicio")[0].textContent;
                if (cuartoServicio == "Si"){
                    document.getElementById("CuartoServicio").checked = true;
                } else if (cuartoServicio == "No"){
                    document.getElementById("CuartoServicio").checked = false;
                }
                document.getElementById("CuartoServicio").setAttribute("disabled","disabled");

                var sala = x[0].getElementsByTagName("sala")[0].textContent;
                if (sala == "Si"){
                    document.getElementById("Sala").checked = true;
                } else if (sala == "No"){
                    document.getElementById("Sala").checked = false;
                }
                document.getElementById("Sala").setAttribute("disabled","disabled");

                var comedor = x[0].getElementsByTagName("comedor")[0].textContent;
                if (comedor == "Si"){
                    document.getElementById("Comedor").checked = true;
                } else if (comedor == "No"){
                    document.getElementById("Comedor").checked = false;
                }
                document.getElementById("Comedor").setAttribute("disabled","disabled");

                var jardin = x[0].getElementsByTagName("jardin")[0].textContent;
                if (jardin == "Si"){
                    document.getElementById("Jardin").checked = true;
                } else if (jardin == "No"){
                    document.getElementById("Jardin").checked = false;
                }
                document.getElementById("Jardin").setAttribute("disabled","disabled");

                var areaLavado = x[0].getElementsByTagName("areaLavado")[0].textContent;
                if (areaLavado == "Si"){
                    document.getElementById("AreaLavado").checked = true;
                } else if (areaLavado == "No"){
                    document.getElementById("AreaLavado").checked = false;
                }
                document.getElementById("AreaLavado").setAttribute("disabled","disabled");

                var bodega = x[0].getElementsByTagName("bodega")[0].textContent;
                if (bodega == "Si"){
                    document.getElementById("Bodega").checked = true;
                } else if (bodega == "No"){
                    document.getElementById("Bodega").checked = false;
                }
                document.getElementById("Bodega").setAttribute("disabled","disabled");
            } else if (titulo == "Error de conexion"){
                alert("Error de conexion con la base de datos");
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/mostrarCasa.pl", true);
    xhr.setRequestHeader(
        'Content-type', 
        'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
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

function cargarDepartamento(){
    var xhr = new XMLHttpRequest();
    var q = "idInmueble="+idInmueble;
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var respuesta = xhr.responseXML;
            console.log("Cargar Departamento");
            console.log(xhr.responseXML);
            
            var x = respuesta.getElementsByTagName("resultado");

            var titulo = x[0].getElementsByTagName("titulo")[0].textContent;
            
            if (titulo == "Carga exitosa"){
                var metrosConstruccion = x[0].getElementsByTagName("metrosConstruccion")[0].textContent;
                document.getElementById("txtMetrosConstruccion").value = metrosConstruccion;
                document.getElementById("txtMetrosConstruccion").setAttribute("disabled","disabled");

                var numRecamaras = x[0].getElementsByTagName("numRecamaras")[0].textContent;
                document.getElementById("txtNumRecamaras").value = numRecamaras;
                document.getElementById("txtNumRecamaras").setAttribute("disabled","disabled");

                var numPiso = x[0].getElementsByTagName("numPiso")[0].textContent;
                document.getElementById("txtPiso").value = numPiso;
                document.getElementById("txtPiso").setAttribute("disabled","disabled");

                var espacioHabitable = x[0].getElementsByTagName("espacioHabitable")[0].textContent;
                document.getElementById("txtEspacioHabitable").value = espacioHabitable;
                document.getElementById("txtEspacioHabitable").setAttribute("disabled","disabled");

                var numBanos = x[0].getElementsByTagName("numBanos")[0].textContent;
                document.getElementById("txtNumBanos").value = numBanos;
                document.getElementById("txtNumBanos").setAttribute("disabled","disabled");

                var edadDepartamento = x[0].getElementsByTagName("edadDepartamento")[0].textContent;
                document.getElementById("txtEdad").value = edadDepartamento;
                document.getElementById("txtEdad").setAttribute("disabled","disabled");

                var tipoDepartamento = x[0].getElementsByTagName("tipoDepartamento")[0].textContent;
                document.getElementById("tipoDepartamento").value = tipoDepartamento;
                document.getElementById("tipoDepartamento").setAttribute("disabled","disabled");

                var tipoCocina = x[0].getElementsByTagName("tipoCocina")[0].textContent;
                document.getElementById("tipoCocina").value = tipoCocina;
                document.getElementById("tipoCocina").setAttribute("disabled","disabled");
                
                // Obtener los datos del checklist
                var estacionamiento = x[0].getElementsByTagName("estacionamiento")[0].textContent;
                if (estacionamiento == "Si"){
                    document.getElementById("Estacionamiento").checked = true;
                } else if (estacionamiento == "No"){
                    document.getElementById("Estacionamiento").checked = false;
                }
                document.getElementById("Estacionamiento").setAttribute("disabled","disabled");

                var numCoches = x[0].getElementsByTagName("numCoches")[0].textContent;
                document.getElementById("inputNumCoches").value = numCoches;
                document.getElementById("inputNumCoches").setAttribute("disabled","disabled");

                var estacionamientoTechado = x[0].getElementsByTagName("estacionamientoTechado")[0].textContent;
                if (estacionamientoTechado == "Si"){
                    document.getElementById("Estacionamiento_Techado").checked = true;
                } else if (estacionamientoTechado == "No"){
                    document.getElementById("Estacionamiento_Techado").checked = false;
                }
                document.getElementById("Estacionamiento_Techado").setAttribute("disabled","disabled");

                var vigilancia = x[0].getElementsByTagName("vigilancia")[0].textContent;
                if (vigilancia == "Si"){
                    document.getElementById("Vigilancia").checked = true;
                } else if (vigilancia == "No"){
                    document.getElementById("Vigilancia").checked = false;
                }
                document.getElementById("Vigilancia").setAttribute("disabled","disabled");
 
                var cuartoServicio = x[0].getElementsByTagName("cuartoServicio")[0].textContent;
                if (cuartoServicio == "Si"){
                    document.getElementById("CuartoServicio").checked = true;
                } else if (cuartoServicio == "No"){
                    document.getElementById("CuartoServicio").checked = false;
                }
                document.getElementById("CuartoServicio").setAttribute("disabled","disabled");

                var sala = x[0].getElementsByTagName("sala")[0].textContent;
                if (sala == "Si"){
                    document.getElementById("Sala").checked = true;
                } else if (sala == "No"){
                    document.getElementById("Sala").checked = false;
                }
                document.getElementById("Sala").setAttribute("disabled","disabled");

                var comedor = x[0].getElementsByTagName("comedor")[0].textContent;
                if (comedor == "Si"){
                    document.getElementById("Comedor").checked = true;
                } else if (comedor == "No"){
                    document.getElementById("Comedor").checked = false;
                }
                document.getElementById("Comedor").setAttribute("disabled","disabled");

                var jardin = x[0].getElementsByTagName("jardin")[0].textContent;
                if (jardin == "Si"){
                    document.getElementById("Jardin").checked = true;
                } else if (jardin == "No"){
                    document.getElementById("Jardin").checked = false;
                }
                document.getElementById("Jardin").setAttribute("disabled","disabled");

                var areaLavado = x[0].getElementsByTagName("areaLavado")[0].textContent;
                if (areaLavado == "Si"){
                    document.getElementById("AreaLavado").checked = true;
                } else if (areaLavado == "No"){
                    document.getElementById("AreaLavado").checked = false;
                }
                document.getElementById("AreaLavado").setAttribute("disabled","disabled");
 
                var bodega = x[0].getElementsByTagName("bodega")[0].textContent;
                if (bodega == "Si"){
                    document.getElementById("Bodega").checked = true;
                } else if (bodega == "No"){
                    document.getElementById("Bodega").checked = false;
                }
                document.getElementById("Bodega").setAttribute("disabled","disabled");

            } else if (titulo == "Error de conexion"){
                alert("Error de conexion con la base de datos");
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/mostrarDepartamento.pl", true);
    xhr.setRequestHeader(
        'Content-type', 
        'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
}
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

function cargarOficina(){
    var xhr = new XMLHttpRequest();
    var q = "idInmueble="+idInmueble;
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var respuesta = xhr.responseXML;
            console.log("Cargar Departamento");
            console.log(xhr.responseXML);
            
            var x = respuesta.getElementsByTagName("resultado");

            var titulo = x[0].getElementsByTagName("titulo")[0].textContent;
            
            if (titulo == "Carga exitosa"){
                var metrosCuadrados = x[0].getElementsByTagName("metrosCuadrados")[0].textContent;
                document.getElementById("txtMetrosCuadrados").value = metrosCuadrados;
                document.getElementById("txtMetrosCuadrados").setAttribute("disabled","disabled");

                var numBanos = x[0].getElementsByTagName("numBanos")[0].textContent;
                document.getElementById("txtNumBanos").value = numBanos;
                document.getElementById("txtNumBanos").setAttribute("disabled","disabled");

                var edadOficina = x[0].getElementsByTagName("edadOficina")[0].textContent;
                document.getElementById("txtEdadOficina").value = edadOficina;
                document.getElementById("txtEdadOficina").setAttribute("disabled","disabled");

                var areaAbierta = x[0].getElementsByTagName("areaAbierta")[0].textContent;
                if (areaAbierta == "Si"){
                    document.getElementById("AreaAbierta").checked = true;
                } else if (areaAbierta == "No"){
                    document.getElementById("AreaAbierta").checked = false;
                }
                document.getElementById("AreaAbierta").setAttribute("disabled","disabled");

                var metrosAreaAbierta = x[0].getElementsByTagName("metrosAreaAbierta")[0].textContent;
                document.getElementById("inputMetrosAreaAbierta").value = metrosAreaAbierta;
                document.getElementById("inputMetrosAreaAbierta").setAttribute("disabled","disabled");
                
                var privados = x[0].getElementsByTagName("privados")[0].textContent;
                if (privados == "Si"){
                    document.getElementById("Privados").checked = true;
                } else if (privados == "No"){
                    document.getElementById("Privados").checked = false;
                }
                document.getElementById("Privados").setAttribute("disabled","disabled");

                var numPrivados = x[0].getElementsByTagName("numPrivados")[0].textContent;
                document.getElementById("inputNumPrivados").value = numPrivados;
                document.getElementById("inputNumPrivados").setAttribute("disabled","disabled");
                
                var estacionamiento = x[0].getElementsByTagName("estacionamiento")[0].textContent;
                if (estacionamiento == "Si"){
                    document.getElementById("Estacionamiento").checked = true;
                } else if (estacionamiento == "No"){
                    document.getElementById("Estacionamiento").checked = false;
                }
                document.getElementById("Estacionamiento").setAttribute("disabled","disabled");

                var numCoches = x[0].getElementsByTagName("numCoches")[0].textContent;
                document.getElementById("inputNumCoches").value = numCoches;
                document.getElementById("inputNumCoches").setAttribute("disabled","disabled");
                
                var recepcion = x[0].getElementsByTagName("recepcion")[0].textContent;
                if (recepcion == "Si"){
                    document.getElementById("Recepcion").checked = true;
                } else if (recepcion == "No"){
                    document.getElementById("Recepcion").checked = false;
                }
                document.getElementById("Recepcion").setAttribute("disabled","disabled");

            } else if (titulo == "Error de conexion"){
                alert("Error de conexion con la base de datos");
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/mostrarOficina.pl", true);
    xhr.setRequestHeader(
        'Content-type', 
        'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
}

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

function cargarEdificio(){
    var xhr = new XMLHttpRequest();
    var q = "idInmueble="+idInmueble;
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var respuesta = xhr.responseXML;
            console.log("Cargar Terreno");
            console.log(xhr.responseXML);
            
            var x = respuesta.getElementsByTagName("resultado");

            var titulo = x[0].getElementsByTagName("titulo")[0].textContent;
            
            if (titulo == "Carga exitosa"){
                var metrosConstruccion = x[0].getElementsByTagName("metrosConstruccion")[0].textContent;
                document.getElementById("txtMetrosConstruccion").value = metrosConstruccion;
                document.getElementById("txtMetrosConstruccion").setAttribute("disabled","disabled");

                var numPisos = x[0].getElementsByTagName("numPisos")[0].textContent;
                document.getElementById("txtNumPisos").value = numPisos;
                document.getElementById("txtNumPisos").setAttribute("disabled","disabled");

                var numBanos = x[0].getElementsByTagName("numBanos")[0].textContent;
                document.getElementById("txtNumBanos").value = numBanos;
                document.getElementById("txtNumBanos").setAttribute("disabled","disabled");

                var edadEdificio = x[0].getElementsByTagName("edadEdificio")[0].textContent;
                document.getElementById("txtEdadEdificio").value = edadEdificio;
                document.getElementById("txtEdadEdificio").setAttribute("disabled","disabled");

            } else if (titulo == "Error de conexion"){
                alert("Error de conexion con la base de datos");
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/mostrarEdificio.pl", true);
    xhr.setRequestHeader(
        'Content-type', 
        'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
}
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

function cargarLocal(){
    var xhr = new XMLHttpRequest();
    var q = "idInmueble="+idInmueble;
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var respuesta = xhr.responseXML;
            console.log("Cargar Terreno");
            console.log(xhr.responseXML);
            
            var x = respuesta.getElementsByTagName("resultado");

            var titulo = x[0].getElementsByTagName("titulo")[0].textContent;
            
            if (titulo == "Carga exitosa"){
                var metrosCuadrados = x[0].getElementsByTagName("metrosCuadrados")[0].textContent;
                document.getElementById("txtMetrosCuadrados").value = metrosCuadrados;
                document.getElementById("txtMetrosCuadrados").setAttribute("disabled","disabled");

                var numBanos = x[0].getElementsByTagName("numBanos")[0].textContent;
                document.getElementById("txtNumBanos").value = numBanos;
                document.getElementById("txtNumBanos").setAttribute("disabled","disabled");

                var edadLocal = x[0].getElementsByTagName("edadLocal")[0].textContent;
                document.getElementById("txtEdadLocal").value = edadLocal;
                document.getElementById("txtEdadLocal").setAttribute("disabled","disabled");

                var dentroPlaza = x[0].getElementsByTagName("dentroPlaza")[0].textContent;
                document.getElementById("DentroPlaza").value = dentroPlaza;
                document.getElementById("DentroPlaza").setAttribute("disabled","disabled");

            } else if (titulo == "Error de conexion"){
                alert("Error de conexion con la base de datos");
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/mostrarLocal.pl", true);
    xhr.setRequestHeader(
        'Content-type', 
        'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
}

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

function cargarTerreno(){
    var xhr = new XMLHttpRequest();
    var q = "idInmueble="+idInmueble;
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var respuesta = xhr.responseXML;
            console.log("Cargar Terreno");
            console.log(xhr.responseXML);
            
            var x = respuesta.getElementsByTagName("resultado");

            var titulo = x[0].getElementsByTagName("titulo")[0].textContent;
            
            if (titulo == "Carga exitosa"){
                var metrosCuadrados = x[0].getElementsByTagName("metrosCuadrados")[0].textContent;
                document.getElementById("txtMetrosCuadrados").value = metrosCuadrados;
                document.getElementById("txtMetrosCuadrados").setAttribute("disabled","disabled");

                var usoSuelo = x[0].getElementsByTagName("usoSuelo")[0].textContent;
                document.getElementById("usoSuelo").value = usoSuelo;
                document.getElementById("usoSuelo").setAttribute("disabled","disabled");

                var poligonal = x[0].getElementsByTagName("poligonal")[0].textContent;
                document.getElementById("poligonal").value = poligonal;
                document.getElementById("poligonal").setAttribute("disabled","disabled");

                var pendiente = x[0].getElementsByTagName("pendiente")[0].textContent;
                document.getElementById("pendiente").value = pendiente;
                document.getElementById("pendiente").setAttribute("disabled","disabled");

                var esquina = x[0].getElementsByTagName("esquina")[0].textContent;
                document.getElementById("esquina").value = esquina;
                document.getElementById("esquina").setAttribute("disabled","disabled");

            } else if (titulo == "Error de conexion"){
                alert("Error de conexion con la base de datos");
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/mostrarTerreno.pl", true);
    xhr.setRequestHeader(
        'Content-type', 
        'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
}

