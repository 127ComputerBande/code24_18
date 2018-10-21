<?php

namespace App\Admin;

use App\Entity\Image;
use App\Form\Type\ImageType;
use App\Form\Types;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\AdminBundle\Show\ShowMapper;
use Sonata\CoreBundle\Validator\ErrorElement;

/**
 * Class ImageAdmin
 *
 * @author Thomas Kekeisen <thomas@kekeisen.it>
 * @package AppBundle\Admin
 */
class ImageAdmin extends BaseAdmin
{
    /**
     * @param RouteCollection $collection
     */
    protected function configureRoutes(RouteCollection $collection)
    {
        // Remove all routes
        $collection->clearExcept([]);
    }

    /**
     * @param FormMapper $formMapper
     */
    protected function configureFormFields(FormMapper $formMapper)
    {
        /**
         * @var $image Image
         */
        $image = $this->getSubject();

        $imageData = [
            'image_web_path' => ($image ? $image->getImagePath() : ''),
            'required'       => !$this->isEditMode(),
        ];

        // @formatter:off
        $formMapper
            ->add('imageFile', ImageType::class, $imageData)
        ;
        // @formatter:off

        if ($this->isEditMode()) {
            // @formatter:off
            $formMapper
                ->add('imageName', null, ['disabled' => true])
                ->add('imagePath', null, ['disabled' => true])
            ;
            // @formatter:on
        }
    }
}