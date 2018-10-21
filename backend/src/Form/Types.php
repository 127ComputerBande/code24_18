<?php

namespace App\Form;

use App\Form\Type\ImageType;
use App\Form\Type\MapType;
use Sonata\AdminBundle\Form\Type\AdminType;
use Sonata\AdminBundle\Form\Type\ChoiceFieldMaskType;
use Sonata\AdminBundle\Form\Type\ModelType;
use Sonata\CoreBundle\Form\Type\DatePickerType;
use Sonata\CoreBundle\Form\Type\DateTimePickerType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\ColorType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TimeType;

/**
 * Class Types
 *
 * @author Thomas Kekeisen <thomas@kekeisen.it>
 * @package App\Form
 */
class Types
{
    use \App\Entity\Traits\Enum;

    const ADMIN           = AdminType::class;
    const AUTOCOMPLETE    = ChoiceFieldMaskType::class;
    const CHECKBOX        = CheckboxType::class;
    const CHOICE          = ChoiceType::class;
    const COLOR           = ColorType::class;
    const DATE            = DateType::class;
    const DATETIME        = DateTimeType::class;
    const DATE_PICKER     = DatePickerType::class;
    const DATETIME_PICKER = DateTimePickerType::class;
    const FILE            = FileType::class;
    const IMAGE           = ImageType::class;
    const MAP             = MapType::class;
    const MODEL           = ModelType::class;
    const PASSWORD        = PasswordType::class;
    const TEXTAREA        = TextareaType::class;
    const TEXT            = TextType::class;
    const TIME_PICKER     = TimeType::class;
    const NUMBER          = NumberType::class;
}