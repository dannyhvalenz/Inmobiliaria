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
my $sth = $dbh->prepare("SELECT * FROM Edificio WHERE idInmueble=?");
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
        $writer->startTag('div', class => '');
            $writer->startTag('div', class => 'w3-row-padding');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Metros de construccion: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{metrosConstruccion}, id => 'lblmetrosConstruccion', style => 'font-size:14px; font-weight: 300' );
                $writer->endTag('p');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Número de pisos: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{numPisos}, id => 'lblnumPisos', style => 'font-size:14px; font-weight: 300');
                $writer->endTag('p');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Numero de baños: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{numBanos}, id => 'lblnumBanos', style => 'font-size:14px; font-weight: 300');
                $writer->endTag('p');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Edad del edificio: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{edadEdificio}, id => 'lbledadEdificio', style => 'font-size:14px; font-weight: 300');
                $writer->endTag('p');
            $writer->endTag('div');
        $writer->endTag('div');
    }
} 

$writer->endTag('resultado');
$writer->end();

$sth->finish();
$dbh->disconnect;

print $fetch;