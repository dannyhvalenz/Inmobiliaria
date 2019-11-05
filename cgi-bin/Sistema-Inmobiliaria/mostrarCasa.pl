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
my $sth = $dbh->prepare("SELECT * FROM Casa WHERE idInmueble=?");
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
        $writer->dataElement('idCasa', $row->{idCasa});
        $writer->dataElement('metrosCuadrados', $row->{metrosCuadrados});
        $writer->dataElement('metrosConstruccion', $row->{metrosConstruccion});
        $writer->dataElement('numPisos', $row->{numPisos});
        $writer->dataElement('numRecamaras', $row->{numRecamaras});
        $writer->dataElement('numBanos', $row->{numBanos});
        $writer->dataElement('tipoCasa', $row->{tipoCasa});
        $writer->dataElement('tipoCocina', $row->{tipoCocina});
        $writer->dataElement('edadCasa', $row->{edadCasa});

        $writer->dataElement('cochera', $row->{cochera});
        $writer->dataElement('cocheraTechada', $row->{cocheraTechada});
        $writer->dataElement('numCoches', $row->{numCoches});
        $writer->dataElement('fraccionamiento', $row->{fraccionamiento});
        $writer->dataElement('fraccionamientoVigilancia', $row->{fraccionamientoVigilancia});
        $writer->dataElement('fraccionamientoAreaVerde', $row->{fraccionamientoAreaVerde});
        $writer->dataElement('fraccionamientoCasaClub', $row->{fraccionamientoCasaClub});
        $writer->dataElement('cuartoServicio', $row->{cuartoServicio});
        $writer->dataElement('sala', $row->{sala});
        $writer->dataElement('comedor', $row->{comedor});
        $writer->dataElement('jardin', $row->{jardin});
        $writer->dataElement('areaLavado', $row->{areaLavado});
        $writer->dataElement('bodega', $row->{bodega});
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