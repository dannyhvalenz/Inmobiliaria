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

            # Uso de suelo
            $writer->startTag('div', class => 'w3-half w3-container');
                $writer->startTag('div', class => 'w3-bar-item w3-container w3-padding-16');
                    $writer->startTag('p', class => 'p_selector');
                        $writer->dataElement('label', 'Uso de suelo');
                        $writer->startTag('select', name => 'uso_Suelo', class => 'selector', id => 'usoSuelo');
                            $writer->dataElement('option', 'Residencial' ,value => 'Residencial');
                            $writer->dataElement('option', 'Comercial' ,value => 'Comercial');
                            $writer->dataElement('option', 'Industrial' ,value => 'Industrial');
                            $writer->dataElement('option', 'Servicios' ,value => 'Servicios');
                        $writer->endTag('select');
                    $writer->endTag('p');
                $writer->endTag('div');
            $writer->endTag('div');

            # Poligonal
            $writer->startTag('div', class => 'w3-half w3-container');
                $writer->startTag('div', class => 'w3-bar-item w3-container w3-padding-16');
                    $writer->startTag('p', class => 'p_selector');
                        $writer->dataElement('label', 'Poligonal');
                        $writer->startTag('select', name => 'Poligonal', class => 'selector', id => 'poligonal');
                            $writer->dataElement('option', 'Regular' ,value => 'Regular');
                            $writer->dataElement('option', 'Irregular' ,value => 'Irregular');
                        $writer->endTag('select');
                    $writer->endTag('p');
                $writer->endTag('div');
            $writer->endTag('div');

            # Es esquina
            $writer->startTag('div', class => 'w3-half w3-container');
                $writer->startTag('div', class => 'w3-bar-item w3-container w3-padding-16');
                    $writer->startTag('p', class => 'p_selector');
                        $writer->dataElement('label', 'Esquina');
                        $writer->startTag('select', name => 'Esquina', class => 'selector', id => 'esquina');
                            $writer->dataElement('option', 'Si' ,value => 'Si');
                            $writer->dataElement('option', 'No' ,value => 'No');
                        $writer->endTag('select');
                    $writer->endTag('p');
                $writer->endTag('div');
            $writer->endTag('div');

            # Pendiente
            $writer->startTag('div', class => 'w3-half w3-container');
                $writer->startTag('div', class => 'w3-bar-item w3-container w3-padding-16');
                    $writer->startTag('p', class => 'p_selector');
                        $writer->dataElement('label', 'Pendiente');
                        $writer->startTag('select', name => 'Pendiente', class => 'selector', id => 'pendiente');
                            $writer->dataElement('option', 'Regular' ,value => 'Plano');
                            $writer->dataElement('option', 'Irregular' ,value => 'Colina');
                            $writer->dataElement('option', 'Pendiente' ,value => 'Pendiente');
                        $writer->endTag('select');
                    $writer->endTag('p');
                $writer->endTag('div');
            $writer->endTag('div');
        $writer->endTag('div');
    $writer->endTag('form');
$writer->endTag('resultado');
$writer->end();

print $fetch;
