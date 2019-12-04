var nombre;
var apellidoP;
var apellidoM;
var celular;
var correo;
var outerHTML;
var idAsesor;
var nombreAsesor;
var q;

// RECUPERA LOS PARAMETROS DEL URL PARA PONER EL NOMBRE DEL ASESOR EN EL LABEL CORRESPONDIENTE
variable = (new URL(document.location)).searchParams;
if (variable.get("idAsesor") != null){
    idAsesor = variable.get("idAsesor");
    nombreAsesor = variable.get("nombre");
    outerHTML = variable.get("link");
    outerHTML = outerHTML+"&nombre="+nombreAsesor;

    // SUSTITUYE EL URL QUE APARECE PARA NO MOSTRAR LOS PARAMETROS MANDADOS
    history.replaceState({}, null, "/Sistema-Inmobiliaria/html/menu_Cliente.html");
    
} else {
    alert("No se pudo recuperar la informacion de la base de datos");
}

// FUNCION QUE LIMPIA LOS REGISTROS Y CIERRA EL REGISTRO
function cerrarRegistro(){
    /* SE LIMPIAN TODOS LOS INPUT */
    document.getElementById("txtnombre").value = '';
    document.getElementById("txtapellidoP").value = '';
    document.getElementById("txtapellidoM").value = '';
    document.getElementById("txtcelular").value = '';
    document.getElementById("txtcorreo").value = '';

    window.open(outerHTML,"_parent");
}

// FUNCION QUE VERIFICA QUE EL CLIENTE NO ESTE DUPLICADO
function buscarDuplicado() {
    /* RECUPERAR DATOS DE LOS INPUT */
    var nombre = document.getElementById("txtnombre").value;
    nombre = primeraMayscula(nombre.toLowerCase());
    var apellidoP = document.getElementById("txtapellidoP").value;
    apellidoP = primeraMayscula(apellidoP.toLowerCase());
    var apellidoM = document.getElementById("txtapellidoM").value;
    apellidoM = primeraMayscula(apellidoM.toLowerCase());
    var celular = document.getElementById("txtcelular").value;
    var correo = document.getElementById("txtcorreo").value;
    var idAsesor = "1";

    /* CREACION DEL QUERY */
    var query = "celular="+celular+"&"+"correo="+correo;
    /* VALIDACION DE CAMPOS VACIOS */
    if (nombre == null || nombre == "", apellidoP == null || apellidoP == "", apellidoM == null || apellidoM == "", celular == null || celular == "", correo == null || correo == "") {
        alert("Hay campos vacios");
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
                    q = "nombre="+nombre+"&"+"apellidoP="+apellidoP+"&"+"apellidoM="+apellidoM+"&"+"celular="+celular+"&"+"correo="+correo+"&"+"idAsesor="+idAsesor;
                    
                    guardarCliente();
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

// FUNCION GUARDA AL CLIENTE
function guardarCliente(){
   console.log("Agregar cliente");
    var xhr = new XMLHttpRequest();
    var titulo;
    var contenido;
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var respuesta = xhr.responseXML;
            console.log(xhr.responseXML);

            var x = respuesta.getElementsByTagName("resultado");

            var titulo = x[0].getElementsByTagName("titulo")[0].textContent;

            var contenido = x[0].getElementsByTagName("contenido")[0].textContent;

            if (titulo == "Nuevo cliente"){
                alert(contenido);
                window.open(outerHTML,"_parent");
            } else if (titulo == "Error de conexion"){
                alert(contenido);
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/agregarCliente.pl", true);
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