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
my $sth = $dbh->prepare("SELECT * FROM Departamento WHERE idInmueble=?");
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
                    $writer->dataElement('label', 'Metros de construccion: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{metrosConstruccion}, id => 'lblmetrosConstruccion', style => 'font-size:14px; font-weight: 300' );
                $writer->endTag('p');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Esta en el piso: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{numPiso}, id => 'lblnumPiso', style => 'font-size:14px; font-weight: 300' );
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
                    $writer->dataElement('label', 'Espacio habitable: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{espacioHabitable}, id => 'lblespacioHabitable', style => 'font-size:14px; font-weight: 300');
                $writer->endTag('p');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Tipo de departamento: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{tipoDepartamento}, id => 'lbltipoDepartamento', style => 'font-size:14px; font-weight: 300');
                $writer->endTag('p');
            $writer->endTag('div');
            $writer->startTag('div', class => 'w3-third w3-row-padding');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Tipo de Cocina: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{tipoCocina}, id => 'lbltipoCocina', style => 'font-size:14px; font-weight: 300');
                $writer->endTag('p');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Edad del departamento: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{edadDepartamento}, id => 'lbledadDepartamento', style => 'font-size:14px; font-weight: 300');
                $writer->endTag('p');
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Estacionamiento: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{estacionamiento}, id => 'lblestacionamiento', style => 'font-size:14px; font-weight: 300' );
                $writer->endTag('p');
                if ($row->{cochera} eq "Si") {
                    $writer->startTag('p', class => 'p_selector');
                        $writer->dataElement('label', 'Estacionamiento Techado: ', style => 'font-size:14px;');
                        $writer->dataElement('label', $row->{estacionamientoTechado}, id => 'lblestacionamientoTechado', style => 'font-size:14px; font-weight: 300' );
                    $writer->endTag('p');
                    $writer->startTag('p', class => 'p_selector');
                        $writer->dataElement('label', 'Numero de coches: ', style => 'font-size:14px;');
                        $writer->dataElement('label', $row->{numCoches}, id => 'lblnumCoches', style => 'font-size:14px; font-weight: 300' );
                    $writer->endTag('p');
                }
                $writer->startTag('p', class => 'p_selector');
                    $writer->dataElement('label', 'Cuenta con vigilancia: ', style => 'font-size:14px;');
                    $writer->dataElement('label', $row->{vigilancia}, id => 'lblvigilancia' , style => 'font-size:14px; font-weight: 300');
                $writer->endTag('p');
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