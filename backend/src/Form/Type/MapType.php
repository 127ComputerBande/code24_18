<?php

namespace App\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\FormView;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * Class MapType
 *
 * @author Thomas Kekeisen <thomas@kekeisen.it>
 * @package App\Form\Type
 */
class MapType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        // @formatter:off
        $builder
            ->setAttribute('api_key',   $options['api_key'])
            ->setAttribute('latitude',  $options['latitude'])
            ->setAttribute('longitude', $options['longitude'])
        ;
        // @formatter:on
    }

    /**
     * @param FormView $view
     * @param FormInterface $form
     * @param array $options
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $view->vars['api_key']   = $options['api_key'];
        $view->vars['latitude']  = $options['latitude'];
        $view->vars['longitude'] = $options['longitude'];
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'api_key'   => '',
            'latitude'  => '',
            'longitude' => '',
        ]);
    }

    /**
     * @return string
     */
    public function getName()
    {
        return MapType::class;
    }

    /**
     * @return string
     */
    public function getParent()
    {
        return TextType::class;
    }
}