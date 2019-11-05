#!/usr/bin/env perl

use strict;

# Módulos para desplegar errores
use CGI;
use CGI::Carp qw(warningsToBrowser fatalsToBrowser);
use warnings;
use diagnostics;

# Indica donde cargar el modulo adhoc para el manejo de la BD
# MAC OS
use lib ('/Applications/MAMP/cgi-bin/Sistema-Inmobiliaria');
# Windows
# use lib ("c:\xampp\cgi-bin\Inmobiliaria");

# Se carga nuestro paquete
use Conexion;

my $cgi = CGI->new();
my $query = $cgi;

my $idInmueble = $query->param("idInmueble");

my $metrosCuadrados = $query->param("metrosCuadrados");
my $metrosConstruccion = $query->param("metrosConstruccion");
my $numPisos = $query->param("numPisos");
my $numRecamaras = $query->param("numRecamaras");
my $numBanos = $query->param("numBanos");
my $edadCasa = $query->param("edadCasa");
my $tipoCasa = $query->param("tipoCasa");
my $tipoCocina = $query->param("tipoCocina");

my $cochera = $query->param("cochera");
my $numCoches = $query->param("numCoches");
my $cocheraTechada = $query->param("cocheraTechada");

my $fraccionamiento = $query->param("fraccionamiento");
my $fraccionamientoVigilancia = $query->param("fraccionamientoVigilancia");
my $fraccionamientoAreaVerde = $query->param("fraccionamientoAreaVerde");
my $fraccionamientoCasaClub = $query->param("fraccionamientoCasaClub");

my $cuartoServicio = $query->param("cuartoServicio");
my $sala = $query->param("sala");
my $comedor = $query->param("comedor");
my $jardin = $query->param("jardin");
my $areaLavado = $query->param("areaLavado");
my $bodega = $query->param("bodega");
# la sección de acceso a Mysql
# Documentación en:
# https://metacpan.org/pod/DBD::mysql
my $dbh = conectar();
# Realizar el query sql
my $sth = $dbh->prepare("UPDATE Casa SET metrosCuadrados=?, metrosConstruccion=?, numPisos=?, numRecamaras=?, numBanos=?, edadCasa=?, tipoCasa=?, tipoCocina=?,
                            cochera=?, numCoches=?, cocheraTechada=?, fraccionamiento=?, fraccionamientoVigilancia=?, fraccionamientoAreaVerde=?, fraccionamientoCasaClub=?,
                            cuartoServicio=?, sala=?, comedor=?, jardin=?, areaLavado=?, bodega=? WHERE idInmueble=?");
$sth->execute($metrosCuadrados, $metrosConstruccion, $numPisos, $numRecamaras, $numBanos, $edadCasa, $tipoCasa, $tipoCocina,
                $cochera, $numCoches, $cocheraTechada, $fraccionamiento, $fraccionamientoVigilancia, $fraccionamientoAreaVerde, $fraccionamientoCasaClub,
                $cuartoServicio, $sala, $comedor, $jardin, $areaLavado, $bodega, $idInmueble) or die $DBI::errstr;

# colocar el charset para imprimir correctamente los caracteres -- en este caso vamos a cambiar por el XML --
# https://metacpan.org/pod/XML::Writer
use XML::Writer;
my $fetch = '';
my $writer = XML::Writer->new(
    OUTPUT      => \$fetch,
    DATA_MODE   => 1,
    DATA_INDENT => 1
);

$writer->xmlDecl('UTF-8');
$writer->startTag('resultado');

# Procesar el resultado
# documentación de métodos disponibles:
# https://www.oreilly.com/library/view/mysql-reference-manual/0596002653/ch08s02.html
# https://metacpan.org/pod/release/RUDY/DBD-mysql-2.9008/lib/DBD/mysql.pm#Class_Methods
if ($sth->rows gt 0){
    $writer->dataElement('titulo', 'Casa actualizada');
    $writer->dataElement('contenido', 'Se ha actualizado la casa');
} else {
    $writer->dataElement('titulo', 'Error de conexion');
    $writer->dataElement('contenido', 'No se ha podido registrar la casa');
}

print $query->header('text/xml'), $fetch;

$writer->endTag('resultado');
$writer->end();

$sth->finish();
$dbh->disconnect;