<?php

namespace App\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\FormView;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * Class ImageType
 *
 * @author Thomas Kekeisen <thomas@kekeisen.it>
 * @package App\Form\Type
 */
class ImageType extends AbstractType
{
    /**
     * @return string
     */
    public function getParent()
    {
        return FileType::class;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'image_web_path' => '',
        ]);
    }

    /**
     * @param FormView $view
     * @param FormInterface $form
     * @param array $options
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $view->vars['image_web_path'] = $options['image_web_path'];
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        // @formatter:off
        $builder
            ->setAttribute('image_web_path', $options['image_web_path'])
        ;
        // @formatter:on
    }
}