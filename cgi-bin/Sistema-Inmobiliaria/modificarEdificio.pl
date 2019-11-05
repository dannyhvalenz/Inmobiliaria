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

my $metrosConstruccion = $query->param("metrosConstruccion");
my $numPisos = $query->param("numPisos");
my $numBanos = $query->param("numBanos");
my $edadEdificio = $query->param("edadEdificio");
# la sección de acceso a Mysql
# Documentación en:
# https://metacpan.org/pod/DBD::mysql
my $dbh = conectar();
# Realizar el query sql
my $sth = $dbh->prepare("UPDATE Edificio SET metrosConstruccion=?, numPisos=?, numBanos=?, edadEdificio=? WHERE idInmueble=?");
$sth->execute($metrosConstruccion, $numPisos, $numBanos, $edadEdificio, $idInmueble) or die $DBI::errstr;

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
    $writer->dataElement('titulo', 'Edificio actualizado');
    $writer->dataElement('contenido', 'Se ha actualizado el edificio');
} else {
    $writer->dataElement('titulo', 'Error de conexion');
    $writer->dataElement('contenido', 'No se ha podido el edificio');
}

print $query->header('text/xml'), $fetch;

$writer->endTag('resultado');
$writer->end();

$sth->finish();
$dbh->disconnect;