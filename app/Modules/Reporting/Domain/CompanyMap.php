<?php

namespace App\Modules\Reporting\Domain;

use Illuminate\Support\Str;

class CompanyMap
{
    public static function nameForEmail(string $email): string
    {
        $domain = strtolower(trim(Str::after($email, '@')));

        $byDomain = config('companies.by_domain', []);

        return $byDomain[$domain] ?? (string) config('companies.default_name', 'Otras empresas');
    }
}
