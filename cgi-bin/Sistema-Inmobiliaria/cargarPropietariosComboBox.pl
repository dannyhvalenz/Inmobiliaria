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
my $idAsesor = $query->param("idAsesor");

# la sección de acceso a Mysql
# Documentación en:
# https://metacpan.org/pod/DBD::mysql
my $dbh = conectar();
# Realizar el query sql
my $sth = $dbh->prepare("SELECT nombre,apellidoP,apellidoM,idPropietario FROM Propietario WHERE idAsesor=?");
$sth->execute($idAsesor) or die $DBI::errstr;

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
    while (my $row = $sth->fetchrow_hashref){
        my $nombre = $row->{nombre};
        my $apellidoP = $row->{apellidoP};
        my $apellidoM = $row->{apellidoM};
        my $nombreCompleto = "$nombre $apellidoP $apellidoM";
        $writer->dataElement('option', $nombreCompleto, value => "$row->{idPropietario}");
    }
}

$writer->endTag('resultado');
$writer->end();

$sth->finish();
$dbh->disconnect;
#print $query->header('text/xml'), $fetch;
print $fetch;
