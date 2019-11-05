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

            # Metros de construccion
            $writer->startTag('div', class => 'w3-half w3-container');
                $writer->startTag('div', class => 'w3-container w3-padding-16');
                    $writer->emptyTag('input', class => 'w3-input w3-animate-input' , type => 'number', placeholder => 'Metros de construcción',  id => 'txtMetrosConstruccion');
                $writer->endTag('div');
            $writer->endTag('div');

            # Pisos del edificio
            $writer->startTag('div', class => 'w3-half w3-container');
                $writer->startTag('div', class => 'w3-container w3-padding-16');
                    $writer->emptyTag('input', class => 'w3-input w3-animate-input' , type => 'number', placeholder => '¿Cuántos pisos tiene?',  id => 'txtNumPisos');
                $writer->endTag('div');
            $writer->endTag('div');

            # Número de baños
            $writer->startTag('div', class => 'w3-half w3-container');
                $writer->startTag('div', class => 'w3-container w3-padding-16');
                    $writer->emptyTag('input', class => 'w3-input w3-animate-input' , type => 'number', placeholder => '¿Cuántos baños tiene?', id => 'txtNumBanos');
                $writer->endTag('div');
            $writer->endTag('div');

            # Edad del edificio
            $writer->startTag('div', class => 'w3-half w3-container');
                $writer->startTag('div', class => 'w3-container w3-padding-16');
                    $writer->emptyTag('input', class => 'w3-input w3-animate-input' , type => 'number', placeholder => 'Edad del edificio', id => 'txtEdadEdificio');
                $writer->endTag('div');
            $writer->endTag('div');
        $writer->endTag('div');
    $writer->endTag('form');
$writer->endTag('resultado');
$writer->end();

print $fetch;
