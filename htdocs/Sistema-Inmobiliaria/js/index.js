// RELLENA LOS COMBOBOX COLONIA Y CIUDADES CON LOS DATOS DE LA BD
function index() {
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

// FUNCION QUE REDIRECCIONA AL INVENTARIO CON LA BUSQUEDA REALIZADA EN LA PAGINA PRINCIPAL
function buscar() {
    var ciudad = document.getElementById("ciudades").value;
    var colonia = document.getElementById("colonias").value;
    var tipoInmueble = document.getElementById("tipoInmueble").value;
    var precioMin = document.getElementById("precioMin").value;
    var precioMax = document.getElementById("precioMax").value;

    var q = "ciudad="+ciudad+"&colonia="+colonia+"&tipoTransaccion="+tipoTransaccion+"&tipoInmueble="+tipoInmueble+"&precioMin="+precioMin+"&precioMax="+precioMax;
    
    var path = "http://localhost:8888/Sistema-Inmobiliaria/html/inventario.html?"+q;
    window.open(path,"_parent");
};

