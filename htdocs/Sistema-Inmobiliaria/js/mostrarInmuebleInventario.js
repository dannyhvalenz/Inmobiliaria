var idInmueble;

variable = (new URL(document.location)).searchParams;
if (variable.get("idInmueble") != null){
    idInmueble = variable.get("idInmueble");
    cargarInmueble(variable.get("idInmueble"));
}
