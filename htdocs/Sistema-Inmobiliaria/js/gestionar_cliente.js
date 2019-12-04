
/* DECLARACION DE VARIABLES */
var nombre;
var apellidoP;
var apellidoM;
var celular;
var correo;
var outerHTML;
var idCliente;
var nombreAsesor;
var q;

variable = (new URL(document.location)).searchParams;
if (variable.get("idCliente") != null){
    idCliente = variable.get("idCliente");
    nombreAsesor = variable.get("nombreAsesor");
    outerHTML = variable.get("link");
    
    cargarCliente(variable.get("idCliente"));

    history.replaceState({}, null, "/Sistema-Inmobiliaria/html/menu_Cliente.html");
    
} else {
    alert("No se pudo recuperar la informacion de la base de datos");
}

// HABILITA LOS CAMPOS PARA ACTUALIZAR AL CLIENTE
function clickActualizar(){
    document.getElementById("titulo").innerHTML = "ACTUALIZAR CLIENTE";
    document.getElementById("divWhenMostrar").style.display = "none";
    document.getElementById("divWhenActualizar").style.display = "block";

    document.getElementById("txtnombre").removeAttribute("disabled");
    document.getElementById("txtapellidoP").removeAttribute("disabled");
    document.getElementById("txtapellidoM").removeAttribute("disabled");
    document.getElementById("txtcelular").removeAttribute("disabled");
    document.getElementById("txtcorreo").removeAttribute("disabled");
}

// RESTABLECE LOS CAMPOS CON LOS DATOS ANTERIORES
function clickCancelar(){
    document.getElementById("titulo").innerHTML = "MOSTRAR CLIENTE";
    document.getElementById("divWhenMostrar").style.display = "block";
    document.getElementById("divWhenActualizar").style.display = "none";
    
    document.getElementById("txtnombre").setAttribute("disabled","disabled");
    document.getElementById("txtapellidoP").setAttribute("disabled","disabled");
    document.getElementById("txtapellidoM").setAttribute("disabled","disabled");
    document.getElementById("txtcelular").setAttribute("disabled","disabled");
    document.getElementById("txtcorreo").setAttribute("disabled","disabled");

    document.getElementById("txtnombre").value = nombre;
    document.getElementById("txtapellidoP").value = apellidoP;
    document.getElementById("txtapellidoM").value = apellidoM;
    document.getElementById("txtcelular").value = celular;
    document.getElementById("txtcorreo").value = correo;
}

// CARGA LA INFORMACION DEL CLIENTE
function cargarCliente(id){
    var xhr = new XMLHttpRequest();
    idCliente = id;
    /* CREACION DEL QUERY */
    var q = "idCliente="+idCliente;

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var respuesta = xhr.responseXML;
            console.log(xhr.responseXML);
            
            var x = respuesta.getElementsByTagName("resultado");

            var titulo = x[0].getElementsByTagName("titulo")[0].textContent;
            
            if (titulo == "Carga exitosa"){
                nombre = x[0].getElementsByTagName("nombre")[0].textContent;
                document.getElementById("txtnombre").value = nombre;
                document.getElementById("txtnombre").setAttribute("disabled","disabled");

                apellidoP = x[0].getElementsByTagName("apellidoP")[0].textContent;
                document.getElementById("txtapellidoP").value = apellidoP;
                document.getElementById("txtapellidoP").setAttribute("disabled","disabled");

                apellidoM = x[0].getElementsByTagName("apellidoM")[0].textContent;
                document.getElementById("txtapellidoM").value = apellidoM;
                document.getElementById("txtapellidoM").setAttribute("disabled","disabled");

                celular = x[0].getElementsByTagName("celular")[0].textContent;
                document.getElementById("txtcelular").value = celular;
                document.getElementById("txtcelular").setAttribute("disabled","disabled");

                correo = x[0].getElementsByTagName("correo")[0].textContent;
                document.getElementById("txtcorreo").value = correo;
                document.getElementById("txtcorreo").setAttribute("disabled","disabled");
            } else if (titulo == "Error de conexion"){
                alert("Error de conexion con la base de datos");
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/mostrarClienteInfo.pl", true);
    xhr.setRequestHeader(
        'Content-type', 
        'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
}

// FUNCION QUE VERIFICA QUE EL CLIENTE NO ESTE DUPLICADO
function buscarDuplicado() {
    /* RECUPERAR DATOS DE LOS INPUT */
    nombre = document.getElementById("txtnombre").value;
    nombre = primeraMayscula(nombre.toLowerCase());
    apellidoP = document.getElementById("txtapellidoP").value;
    apellidoP = primeraMayscula(apellidoP.toLowerCase());
    apellidoM = document.getElementById("txtapellidoM").value;
    apellidoM = primeraMayscula(apellidoM.toLowerCase());
    celular = document.getElementById("txtcelular").value;
    correo = document.getElementById("txtcorreo").value;
    var camposVacios = new Boolean(false);

    /* VERIFICA QUE NO HAY CAMPOS VACIOS */
    var input = document.getElementsByTagName('input');
    for(i = 0;i < input.length; i++){
        if (camposVacios == false){
            if (input[i].value == null || input[i].value == ""){
                camposVacios = true;
            }
        }
    }


    /* CREACION DEL QUERY */
    var query = "celular="+celular+"&"+"correo="+correo;

    /* VALIDACION DE CAMPOS VACIOS */
    if (camposVacios == true) {
        alert("Hay campos vacios, verifica que todos los campos esten llenos");
    } else {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4 && xhr.status==200){
                var respuesta = xhr.responseXML;
                console.log(xhr.responseXML);
                x = respuesta.getElementsByTagName('resultado');
                
                var titulo = x[0].getElementsByTagName("titulo")[0].textContent;
                console.log(titulo);
                if (titulo == "Cliente duplicado"){
                    var contenido = x[0].getElementsByTagName("contenido")[0].textContent;
                    alert(contenido);
                } else if (titulo == "Cliente no duplicado"){
                    q = "nombre="+nombre+"&"+"apellidoP="+apellidoP+"&"+"apellidoM="+apellidoM+"&"
                        +"celular="+celular+"&"+"correo="+correo+"&"
                        +"idCliente="+idCliente;
                        actualizarCliente();
                }
            }
        }

        xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/verificarNuevoCliente.pl", true);
        xhr.setRequestHeader(
        'Content-type', 
        'application/x-www-form-urlencoded'
        ); 
        xhr.responseType = "document";
        xhr.send(query);
    }  
}

// FUNCION QUE ACTUALIZA AL CLIENTE
function actualizarCliente(){
    console.log("Actualizar Cliente");
    var xhr = new XMLHttpRequest();
    var titulo;
    var contenido;
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var respuesta = xhr.responseXML;
            console.log(xhr.responseXML);
            var x = respuesta.getElementsByTagName("resultado");

            titulo = x[0].getElementsByTagName("titulo")[0].textContent;
            contenido = x[0].getElementsByTagName("contenido")[0].textContent;

            if (titulo == "Cliente actualizado"){
                alert(contenido);
                outerHTML = outerHTML+"&nombre="+nombreAsesor;
                window.open(outerHTML,"_parent");
                document.getElementById("titulo").innerHTML = "MOSTRAR CLIENTE";
                document.getElementById("divWhenMostrar").style.display = "block";
                document.getElementById("divWhenActualizar").style.display = "none";
                
                document.getElementById("txtnombre").setAttribute("disabled","disabled");
                document.getElementById("txtapellidoP").setAttribute("disabled","disabled");
                document.getElementById("txtapellidoM").setAttribute("disabled","disabled");
                document.getElementById("txtcelular").setAttribute("disabled","disabled");
                document.getElementById("txtcorreo").setAttribute("disabled","disabled");

                document.getElementById("txtnombre").value = nombre;
                document.getElementById("txtapellidoP").value = apellidoP;
                document.getElementById("txtapellidoM").value = apellidoM;
                document.getElementById("txtcelular").value = celular;
                document.getElementById("txtcorreo").value = correo;
            } else if (titulo == "Error de conexion"){
                alert(contenido);
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/modificarCliente.pl", true);
    xhr.setRequestHeader(
        'Content-type', 
        'application/x-www-form-urlencoded'
    ); 
    xhr.responseType = "document";
    xhr.send(q);
};

// FUNCION QUE ELIMINA AL CLIENTE
function clickEliminar(){
    var q = "idCliente="+idCliente;
    console.log("Eliminar Cliente");
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

        xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/eliminarCliente.pl", true);
        xhr.setRequestHeader(
            'Content-type', 
            'application/x-www-form-urlencoded'
        ); 
        xhr.responseType = "document";
        xhr.send(q);
};

// FUNCION QUE HACE QUE LA PRIMERA LETRA SEA MAYUSCULA Y LAS DEMAS SEAN MINUSCULAS
function primeraMayscula(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}