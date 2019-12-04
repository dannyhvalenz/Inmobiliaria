var nombre;
var apellidoP;
var apellidoM;
var celular;
var direccion;
var correo;
var outerHTML;
var idAsesor;
var nombreAsesor;
var q;

variable = (new URL(document.location)).searchParams;
if (variable.get("idAsesor") != null){
    idAsesor = variable.get("idAsesor");
    nombreAsesor = variable.get("nombre");
    outerHTML = variable.get("link");
    outerHTML = outerHTML+"&nombre="+nombreAsesor;

    history.replaceState({}, null, "/Sistema-Inmobiliaria/html/menu_Propietario.html");
    
} else {
    alert("No se pudo recuperar la informacion de la base de datos");
}

function cerrarRegistro(){
    /* SE LIMPIAN TODOS LOS INPUT */
    document.getElementById("txtnombre").value = '';
    document.getElementById("txtapellidoP").value = '';
    document.getElementById("txtapellidoM").value = '';
    document.getElementById("txtcelular").value = '';
    document.getElementById("txtdireccion").value = '';
    document.getElementById("txtcorreo").value = '';

    window.open(outerHTML,"_parent");
}

// FUNCION QUE VERIFICA QUE EL CLIENTE NO ESTE DUPLICADO Y EN CASO DE NO ESTAR DUPLICADO LLAMA A LA FUNCION GUARDAR PROPIETARIO
function buscarDuplicado() {
    /* RECUPERAR DATOS DE LOS INPUT */
    var nombre = document.getElementById("txtnombre").value;
    nombre = primeraMayscula(nombre.toLowerCase());
    var apellidoP = document.getElementById("txtapellidoP").value;
    apellidoP = primeraMayscula(apellidoP.toLowerCase());
    var apellidoM = document.getElementById("txtapellidoM").value;
    apellidoM = primeraMayscula(apellidoM.toLowerCase());
    var celular = document.getElementById("txtcelular").value;
    var direccion = document.getElementById("txtdireccion").value;
    var correo = document.getElementById("txtcorreo").value;
    var idAsesor = "1";

    /* CREACION DEL QUERY */
    var query = "celular="+celular+"&"+"correo="+correo;
    /* VALIDACION DE CAMPOS VACIOS */
    if (nombre == null || nombre == "", apellidoP == null || apellidoP == "", apellidoM == null || apellidoM == "", celular == null || celular == "", direccion == null || direccion == "", correo == null || correo == "") {
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
                if (titulo == "Propietario duplicado"){
                    var contenido = x[0].getElementsByTagName("contenido")[0].textContent;
                    alert(contenido);
                } else if (titulo == "Propietario no duplicado"){
                    q = "nombre="+nombre+"&"+"apellidoP="+apellidoP+"&"+"apellidoM="+apellidoM+"&"+"celular="+celular+"&"+"direccion="+direccion+"&"+"correo="+correo+"&"+"idAsesor="+idAsesor;
    
                    guardarPropietario();
                }
            }
        }

        xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/verificarNuevoPropietario.pl", true);
        xhr.setRequestHeader(
        'Content-type', 
        'application/x-www-form-urlencoded'
        ); 
        xhr.responseType = "document";
        xhr.send(query);
    }  
}

// FUNCION PARA GUARDAR AL PROPIETARIO
function guardarPropietario(){
    console.log("Agregar Propietario");
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

            if (titulo == "Nuevo propietario"){
                alert(contenido);
                window.open(outerHTML,"_parent");
            } else if (titulo == "Error de conexion"){
                alert(contenido);
            }
        }
    }

    xhr.open("POST", "http://localhost:8888/cgi-bin/Sistema-Inmobiliaria/agregarPropietario.pl", true);
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