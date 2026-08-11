<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Empresas por dominio de email
    |--------------------------------------------------------------------------
    | Mapea el dominio del email del usuario a una empresa para los reportes.
    | Formato en .env (COMPANY_DOMAIN_MAP): dominio:Nombre,dominio:Nombre
    |
    */

    'by_domain' => array_reduce(
        array_filter(array_map(
            'trim',
            explode(',', (string) env(
                'COMPANY_DOMAIN_MAP',
                'garatehermanos.cl:Garate Hermanos,agricolagreenex.cl:Agrícola Greenex'
            ))
        )),
        static function (array $carry, string $entry): array {
            $parts = array_map('trim', explode(':', $entry, 2));
            if (count($parts) === 2) {
                $carry[strtolower($parts[0])] = $parts[1];
            }

            return $carry;
        },
        []
    ),

    /*
    | Nombre con el que se agrupan los emails de dominios desconocidos.
    | Parámetrizable via COMPANY_DEFAULT_NAME en .env
    */
    'default_name' => (string) env('COMPANY_DEFAULT_NAME', 'Otras empresas'),
];
