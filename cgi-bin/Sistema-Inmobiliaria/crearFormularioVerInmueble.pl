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

my $dbh = conectar();
# Realizar el query sql
my $sth = $dbh->prepare("SELECT * FROM Inmueble WHERE idInmueble=?");
$sth->execute($idInmueble) or die $DBI::errstr;

#my $sentence = 'SELECT * FROM Inmueble WHERE idInmueble=?'
#my $sthTipoInmueble = $dbh->prepare();

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
        $writer->startTag('form');
            $writer->dataElement('span', 'x', class => 'close', onclick => "cerrarPopup()");
            
            $writer->startTag('header', class => 'w3-bar w3-orange w3-center w3-text-white');
                $writer->dataElement('h1', 'VER INMUEBLE',class => 'w3-xlarge w3-center');
            $writer->endTag('header');
            $writer->startTag('div', class => ' w3-margin-bottom');

                # Div imagenes
                my $foto = $row->{tipoInmueble};
                $writer->startTag('div', class => 'w3-left w3-margin-top w3-center', style => 'width:300px; height:200px;');
                    $writer->emptyTag('img', src => "/Sistema-Inmobiliaria/img/$foto.jpg", class => 'w3-right w3-round w3-image');
                $writer->endTag('div');

                # Datos de la casa
                my $precio = "\$" . $row->{precio};
                $writer->startTag('div', class => 'w3-half w3-container');
                    $writer->startTag('div', class => 'w3-bar-item w3-container w3-padding-16');
                        $writer->dataElement('h2', $precio, id => 'lblPrecio' , style => 'font-weight:bold;');
                        $writer->startTag('p', class => 'p_selector');
                            $writer->dataElement('label', 'Ciudad: ', style => 'font-size:16px;');
                            $writer->dataElement('label', $row->{ciudad}, id => 'lblCiudad', style => 'font-size:16px; font-weight: 300' );
                        $writer->endTag('p');
                        $writer->startTag('p', class => 'p_selector');
                            $writer->dataElement('label', 'Colonia: ', style => 'font-size:16px;');
                            $writer->dataElement('label', $row->{colonia}, id => 'lblColonia' , style => 'font-size:16px; font-weight: 300');
                        $writer->endTag('p');
                        $writer->startTag('p', class => 'p_selector');
                            $writer->dataElement('label', 'Tipo de transaccion: ', style => 'font-size:16px;');
                            $writer->dataElement('label', $row->{tipoTransaccion}, id => 'lblTipoTransaccion', style => 'font-size:16px; font-weight: 300');
                        $writer->endTag('p');
                        $writer->startTag('p', class => 'p_selector');
                            $writer->dataElement('label', 'Tipo de propiedad: ', style => 'font-size:16px;');
                            $writer->dataElement('label', $row->{tipoInmueble}, id => 'lblTipoPropiedad', style => 'font-size:16px; font-weight: 300');
                        $writer->endTag('p');
                    $writer->endTag('div');
                $writer->endTag('div');
                $writer->startTag('div', id => 'divTipoPropiedad', class => 'w3-container w3-padding-16', style => 'width:700px; height:200px; clear:both;');
                $writer->endTag('div');

            $writer->endTag('div');
        $writer->endTag('form');
    }
} 
$writer->endTag('resultado');
$writer->end();

$sth->finish();
$dbh->disconnect;

print $fetch;

=pod
$writer->startTag('form');
        $writer->dataElement('span', 'x', class => 'close', onclick => "cerrarPopup()");
          
        $writer->startTag('header', class => 'w3-bar w3-orange w3-center w3-text-white');
            $writer->dataElement('h1', 'VER INMUEBLE',class => 'w3-xlarge w3-center');
        $writer->endTag('header');
        $writer->startTag('div', class => ' w3-margin-bottom');

            # Div imagenes
            $writer->startTag('div', class => 'w3-left w3-blue w3-margin-top', style => 'width:300px; height:200px;');
                $writer->emptyTag('img', src => "/Sistema-Inmobiliaria/img/Casa.jpg", class => 'w3-right w3-round w3-image');
            $writer->endTag('div');

            # Datos de la casa
            my $precio = "\$" . $row->{precio};
            $writer->startTag('div', class => 'w3-half w3-container');
                $writer->startTag('div', class => 'w3-bar-item w3-container w3-padding-16');
                    $writer->dataElement('h3', $precio, id => 'lblPrecio');
                    $writer->startTag('p', class => 'p_selector');
                        $writer->dataElement('label', 'Ciudad: ');
                        $writer->dataElement('label', $row->{ciudad}, id => 'lblCiudad');
                    $writer->endTag('p');
                    $writer->startTag('p', class => 'p_selector');
                        $writer->dataElement('label', 'Colonia: ');
                        $writer->dataElement('label', $row->{colonia}, id => 'lblColonia');
                    $writer->endTag('p');
                    $writer->startTag('p', class => 'p_selector');
                        $writer->dataElement('label', 'Tipo de transaccion: ');
                        $writer->dataElement('label', $row->{tipoTransaccion}, id => 'lblTipoTransaccion');
                    $writer->endTag('p');
                    $writer->startTag('p', class => 'p_selector');
                        $writer->dataElement('label', 'Tipo de propiedad: ');
                        $writer->dataElement('label', $row->{tipoInmueble}, id => 'lblTipoPropiedad');
                    $writer->endTag('p');
                $writer->endTag('div');
            $writer->endTag('div');
        $writer->endTag('div');
    $writer->endTag('form');

=cut