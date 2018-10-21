<?php

namespace App\Admin;

/**
 * Class AdminLayout
 *
 * @author Felix Bäder <felix@lulububu.de>
 * @package App\Admin
 */
class AdminLayout
{
    use \App\Entity\Traits\Enum;

    const FULL    = 'col-md-12 col-lg-12';
    const HALF    = 'col-md-6 col-lg-6';
    const QUARTER = 'col-md-3 col-lg-3';
    const THIRD   = 'col-md-4 col-lg-4';
}