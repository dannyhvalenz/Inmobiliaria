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

# la sección de acceso a Mysql
# Documentación en:
# https://metacpan.org/pod/DBD::mysql
my $dbh = conectar();
# Realizar el query sql
my $sth = $dbh->prepare("SELECT * FROM Terreno WHERE idInmueble=?");
$sth->execute($idInmueble) or die $DBI::errstr;

use XML::Writer;
my $fetch = '';
my $writer = XML::Writer->new(
    OUTPUT      => \$fetch,
    DATA_MODE   => 1,
    DATA_INDENT => 1
);

$writer->xmlDecl('UTF-8');
$writer->startTag('resultado');

if ($sth->rows gt 0){
    while (my $row = $sth->fetchrow_hashref){
        $writer->dataElement('titulo', "Carga exitosa");
        $writer->dataElement('idTerreno', $row->{idTerreno});
        $writer->dataElement('metrosCuadrados', $row->{metrosCuadrados});
        $writer->dataElement('usoSuelo', $row->{usoSuelo});
        $writer->dataElement('poligonal', $row->{poligonal});
        $writer->dataElement('pendiente', $row->{pendiente});
        $writer->dataElement('esquina', $row->{esquina});
    }
} else {
        $writer->dataElement('titulo', "Error de conexion");
        $writer->dataElement('contenido', "Error de conexion con la base de datos");
}

$writer->endTag('resultado');
$writer->end();

$sth->finish();
$dbh->disconnect;

print $fetch;