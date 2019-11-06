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
        $writer->startTag('div', class => '');
            $writer->startTag('div', class => 'w3-third w3-row-padding');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Metros cuadrados: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{metrosCuadrados}, id => 'lblmetrosCuadrados', style => 'font-size:14px; font-weight: 300' );
                $writer->endTag('p');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Metros de construccion: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{metrosConstruccion}, id => 'lblmetrosConstruccion', style => 'font-size:14px; font-weight: 300' );
                $writer->endTag('p');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Numero de pisos: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{numPisos}, id => 'lblnumPisos', style => 'font-size:14px; font-weight: 300' );
                $writer->endTag('p');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Numero de recamaras: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{numRecamaras}, id => 'lblnumRecamaras' , style => 'font-size:14px; font-weight: 300');
                $writer->endTag('p');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Número de baños: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{numBanos}, id => 'lblNumBanos', style => 'font-size:14px; font-weight: 300');
                $writer->endTag('p');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Tipo de casa: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{tipoCasa}, id => 'lbltipoCasa', style => 'font-size:14px; font-weight: 300');
                $writer->endTag('p');
            $writer->endTag('div');
            $writer->startTag('div', class => 'w3-third w3-row-padding');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Tipo de Cocina: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{tipoCocina}, id => 'lbltipoCocina', style => 'font-size:14px; font-weight: 300');
                $writer->endTag('p');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Edad de la casa: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{edadCasa}, id => 'lbledadCasa', style => 'font-size:14px; font-weight: 300');
                $writer->endTag('p');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Cochera: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{cochera}, id => 'lblcochera', style => 'font-size:14px; font-weight: 300' );
                $writer->endTag('p');
                if ($row->{cochera} eq "Si") {
                    $writer->startTag('p', class => 'p_selector');
                        $writer->dataElement('label', 'Cochera Techada: ', style => 'font-size:14px;');
                        $writer->dataElement('label', $row->{cocheraTechada}, id => 'lblcocheraTechada', style => 'font-size:14px; font-weight: 300' );
                    $writer->endTag('p');
                    $writer->startTag('p', class => 'p_selector');
                        $writer->dataElement('label', 'Numero de coches: ', style => 'font-size:14px;');
                        $writer->dataElement('label', $row->{numCoches}, id => 'lblnumCoches', style => 'font-size:14px; font-weight: 300' );
                    $writer->endTag('p');
                }
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Esta dentro de un fraccionamiento: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{fraccionamiento}, id => 'lblfraccionamiento' , style => 'font-size:14px; font-weight: 300');
                $writer->endTag('p');
                if ($row->{fraccionamiento} eq "Si") {
                    $writer->startTag('p', class => 'p_selector');
                        $writer->dataElement('label', 'El fraccionamiento tiene vigilancia: ', style => 'font-size:14px;');
                        $writer->dataElement('label', $row->{fraccionamientoVigilancia}, id => 'lblfraccionamientoVigilancia' , style => 'font-size:14px; font-weight: 300');
                    $writer->endTag('p');
                    $writer->startTag('p', class => 'p_selector');
                        $writer->dataElement('label', 'El fraccionamiento tiene area verde: ', style => 'font-size:14px;');
                        $writer->dataElement('label', $row->{fraccionamientoAreaVerde}, id => 'lblfraccionamientoAreaVerde' , style => 'font-size:14px; font-weight: 300');
                    $writer->endTag('p');
                    $writer->startTag('p', class => 'p_selector');
                        $writer->dataElement('label', 'El fraccionamiento tiene casa club: ', style => 'font-size:14px;');
                        $writer->dataElement('label', $row->{fraccionamientoCasaClub}, id => 'lblfraccionamientoCasaClub' , style => 'font-size:14px; font-weight: 300');
                    $writer->endTag('p');
                }
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Cuarto de Servicio: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{cuartoServicio}, id => 'lblcuartoServicio', style => 'font-size:14px; font-weight: 300');
                $writer->endTag('p');
            $writer->endTag('div');

            $writer->startTag('div', class => 'w3-third w3-row-padding');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Sala: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{sala}, id => 'lblsala', style => 'font-size:14px; font-weight: 300');
                $writer->endTag('p');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Comedor: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{comedor}, id => 'lblcomedor', style => 'font-size:14px; font-weight: 300');
                $writer->endTag('p');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Jardin: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{jardin}, id => 'lbljardin', style => 'font-size:14px; font-weight: 300');
                $writer->endTag('p');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Area Lavado: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{areaLavado}, id => 'lblareaLavado', style => 'font-size:14px; font-weight: 300');
                $writer->endTag('p');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Bodega: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{bodega}, id => 'lblbodega', style => 'font-size:14px; font-weight: 300');
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