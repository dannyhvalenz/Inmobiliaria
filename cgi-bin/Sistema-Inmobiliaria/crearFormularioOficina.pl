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

use XML::Writer;
my $fetch = '';
my $writer = XML::Writer->new(
    OUTPUT      => \$fetch,
    DATA_MODE   => 1,
    DATA_INDENT => 1
);


$writer->xmlDecl('UTF-8');
$writer->startTag('resultado');
    $writer->startTag('form');
        $writer->startTag('div', class => 'w3-row-padding w3-margin-bottom');

            # Metros de cuadrados
            $writer->startTag('div', class => 'w3-half w3-container');
                $writer->startTag('div', class => 'w3-container w3-padding-16');
                    $writer->emptyTag('input', class => 'w3-input w3-animate-input' , type => 'number', placeholder => 'Metros cuadrados',  id => 'txtMetrosCuadrados');
                $writer->endTag('div');
            $writer->endTag('div');

            # Número de baños
            $writer->startTag('div', class => 'w3-half w3-container');
                $writer->startTag('div', class => 'w3-container w3-padding-16');
                    $writer->emptyTag('input', class => 'w3-input w3-animate-input' , type => 'number', placeholder => 'Número de baños', id => 'txtNumBanos');
                $writer->endTag('div');
            $writer->endTag('div');

            # Edad de la oficina
            $writer->startTag('div', class => 'w3-half w3-container');
                $writer->startTag('div', class => 'w3-container w3-padding-16');
                    $writer->emptyTag('input', class => 'w3-input w3-animate-input' , type => 'number', placeholder => 'Edad de la oficina', id => 'txtEdadOficina');
                $writer->endTag('div');
            $writer->endTag('div');
        $writer->endTag('div');

    # Form checklist
        $writer->startTag('form', id => 'todo-list', class => 'w3-padding-16 w3-text-black');
            $writer->dataElement('h4', '¿Con que cosas cuenta la oficina?');

            # Checkbox privados
            $writer->startTag('p');
                $writer->emptyTag('input', type => 'checkbox', id => 'AreaAbierta');
                $writer->dataElement('label', 'Area Abierta', for => 'AreaAbierta', class => 'todo w3-half w3-text-black');
                $writer->emptyTag('input', class =>'w3-input', type => 'text', id => 'inputMetrosAreaAbierta', placeholder => 'Metros. Area Abierta', style => 'height: 37px;');
            $writer->endTag('p');

            # Checkbox privados
            $writer->startTag('p');
                $writer->emptyTag('input', type => 'checkbox', id => 'Privados');
                $writer->dataElement('label', 'Tiene Privados', for => 'Privados', class => 'todo w3-half w3-text-black');
                $writer->emptyTag('input', class =>'w3-input', type => 'text', id => 'inputNumPrivados', placeholder => 'Num. Privados', style => 'height: 37px;');
            $writer->endTag('p');

            # Checkbox Estacionamiento
            $writer->startTag('p');
                $writer->emptyTag('input', type => 'checkbox', id => 'Estacionamiento');
                $writer->dataElement('label', 'Estacionamiento', for => 'Estacionamiento', class => 'todo w3-half w3-text-black');
                $writer->emptyTag('input', class =>'w3-input', type => 'text', id => 'inputNumCoches', placeholder => 'Num. Coches', style => 'height: 37px;');
            $writer->endTag('p');

            # Checkbox recepcion
            $writer->startTag('p');
                $writer->emptyTag('input', type => 'checkbox', id => 'Recepcion');
                $writer->dataElement('label', 'Recepcion', for => 'Recepcion', class => 'todo w3-half w3-text-black');
            $writer->endTag('p');
            $writer->emptyTag('hr');

        $writer->endTag('form');
    $writer->endTag('form');
$writer->endTag('resultado');
$writer->end();

print $fetch;
