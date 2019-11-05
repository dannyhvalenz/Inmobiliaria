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
                    $writer->emptyTag('input', class => 'w3-input w3-animate-input' , type => 'number', placeholder => 'Metros de construccion',  id => 'txtMetrosConstruccion');
                $writer->endTag('div');
            $writer->endTag('div');

            # Num de banos
            $writer->startTag('div', class => 'w3-half w3-container');
                $writer->startTag('div', class => 'w3-container w3-padding-16');
                    $writer->emptyTag('input', class => 'w3-input w3-animate-input' , type => 'number', placeholder => 'Num. de baños',  id => 'txtNumBanos');
                $writer->endTag('div');
            $writer->endTag('div');

            # Num de recamaras
            $writer->startTag('div', class => 'w3-half w3-container');
                $writer->startTag('div', class => 'w3-container w3-padding-16');
                    $writer->emptyTag('input', class => 'w3-input w3-animate-input' , type => 'number', placeholder => 'Num. de recámaras',  id => 'txtNumRecamaras');
                $writer->endTag('div');
            $writer->endTag('div');

            # ¿En que piso esta el departamento?
            $writer->startTag('div', class => 'w3-half w3-container');
                $writer->startTag('div', class => 'w3-container w3-padding-16');
                    $writer->emptyTag('input', class => 'w3-input w3-animate-input' , type => 'number', placeholder => '¿En qué piso esta el departamento?',  id => 'txtPiso');
                $writer->endTag('div');
            $writer->endTag('div');

            # Edad Departamento
            $writer->startTag('div', class => 'w3-half w3-container');
                $writer->startTag('div', class => 'w3-container w3-padding-16');
                    $writer->emptyTag('input', class => 'w3-input w3-animate-input' , type => 'number', placeholder => 'Edad del departamento',  id => 'txtEdad');
                $writer->endTag('div');
            $writer->endTag('div');

            # Espacio habitable
            $writer->startTag('div', class => 'w3-half w3-container');
                $writer->startTag('div', class => 'w3-container w3-padding-16');
                    $writer->emptyTag('input', class => 'w3-input w3-animate-input' , type => 'number', placeholder => 'Espacio habitable',  id => 'txtEspacioHabitable');
                $writer->endTag('div');
            $writer->endTag('div');

            # Tipo de departamento
            $writer->startTag('div', class => 'w3-half w3-container');
                $writer->startTag('div', class => 'w3-bar-item w3-container w3-padding-16');
                    $writer->startTag('p', class => 'p_selector');
                        $writer->startTag('select', name => 'Tipo_departamento', class => 'selector', id => 'tipoDepartamento');
                            $writer->dataElement('option', 'Inteses Social' ,value => 'InteresSocial');
                            $writer->dataElement('option', 'Inteses Medio' ,value => 'InteresMedio');
                            $writer->dataElement('option', 'Inteses Alto' ,value => 'InteresAlto');
                            $writer->dataElement('option', 'De Lujo' ,value => 'DeLujo');
                        $writer->endTag('select');
                    $writer->endTag('p');
                $writer->endTag('div');
            $writer->endTag('div');

            # Tipo de cocina
            $writer->startTag('div', class => 'w3-half w3-container');
                $writer->startTag('div', class => 'w3-bar-item w3-container w3-padding-16');
                    $writer->startTag('p', class => 'p_selector');
                        $writer->startTag('select', name => 'Tipo_cocina', class => 'selector', id => 'tipoCocina');
                            $writer->dataElement('option', 'Cocina Integral' ,value => 'CocinaIntegral');
                            $writer->dataElement('option', 'Sin Cocina' ,value => 'SinCocina');
                        $writer->endTag('select');
                    $writer->endTag('p');
                $writer->endTag('div');
            $writer->endTag('div');
        $writer->endTag('div');

    # Form checklist
        $writer->startTag('form', id => 'todo-list', class => 'w3-padding-16 w3-text-black');
            $writer->dataElement('h4', '¿Con que cosas cuenta el departamento?');

            # Checkbox estacionamiento
            $writer->startTag('p');
                $writer->emptyTag('input', type => 'checkbox', id => 'Estacionamiento');
                $writer->dataElement('label', 'Estacionamiento', for => 'Estacionamiento', class => 'todo w3-half w3-text-black');
                $writer->emptyTag('input', class =>'w3-input', type => 'text', id => 'inputNumCoches', placeholder => 'Num. Coches', style => 'height: 37px;');
            $writer->endTag('p');

            # Checkbox Estacionamiento techado
            $writer->startTag('p');
                $writer->emptyTag('input', type => 'checkbox', id => 'Estacionamiento_Techado');
                $writer->dataElement('label', 'Estacionamiento techado', for => 'Estacionamiento_Techado', class => 'todo w3-half w3-text-black');
            $writer->endTag('p');
            $writer->emptyTag('hr');

            # Checkbox cuenta con vigilancia
            $writer->startTag('p');
                $writer->emptyTag('input', type => 'checkbox', id => 'Vigilancia');
                $writer->dataElement('label', 'Cuenta con vigilancia', for => 'Vigilancia', class => 'todo w3-half w3-text-black');
            $writer->endTag('p');
            $writer->emptyTag('hr');

            # Checkbox cuarto de servicio
            $writer->startTag('p');
                $writer->emptyTag('input', type => 'checkbox', id => 'CuartoServicio');
                $writer->dataElement('label', 'Cuarto de servicio', for => 'CuartoServicio', class => 'todo w3-half w3-text-black');
            $writer->endTag('p');
            $writer->emptyTag('hr');

            # Checkbox sala
            $writer->startTag('p');
                $writer->emptyTag('input', type => 'checkbox', id => 'Sala');
                $writer->dataElement('label', 'Sala', for => 'Sala', class => 'todo w3-half w3-text-black');
            $writer->endTag('p');
            $writer->emptyTag('hr');

            # Checkbox comedor
            $writer->startTag('p');
                $writer->emptyTag('input', type => 'checkbox', id => 'Comedor');
                $writer->dataElement('label', 'Comedor', for => 'Comedor', class => 'todo w3-half w3-text-black');
            $writer->endTag('p');
            $writer->emptyTag('hr');

            # Checkbox jardin
            $writer->startTag('p');
                $writer->emptyTag('input', type => 'checkbox', id => 'Jardin');
                $writer->dataElement('label', 'Jardin', for => 'Jardin', class => 'todo w3-half w3-text-black');
            $writer->endTag('p');
            $writer->emptyTag('hr');

            # Checkbox area de lavado
            $writer->startTag('p');
                $writer->emptyTag('input', type => 'checkbox', id => 'AreaLavado');
                $writer->dataElement('label', 'Area de lavado', for => 'AreaLavado', class => 'todo w3-half w3-text-black');
            $writer->endTag('p');
            $writer->emptyTag('hr');

            # Checkbox bodega
            $writer->startTag('p');
                $writer->emptyTag('input', type => 'checkbox', id => 'Bodega');
                $writer->dataElement('label', 'Bodega', for => 'Bodega', class => 'todo w3-half w3-text-black');
            $writer->endTag('p');

        $writer->endTag('form');
    $writer->endTag('form');
$writer->endTag('resultado');
$writer->end();

print $fetch;
