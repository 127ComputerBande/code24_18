<?php

namespace App\Admin;

use App\Entity\User;
use App\Form\Types;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\CollectionType;
use Sonata\AdminBundle\Form\Type\ModelType;
use Sonata\AdminBundle\Show\ShowMapper;

/**
 * Class VideoAdmin
 *
 * @package App\Admin
 */
class VideoAdmin extends BaseAdmin
{
    /**
     * @var array
     */
    protected $datagridValues = [
        '_page'       => 1,
        '_sort_order' => 'ASC',
        '_sort_by'    => 'name',
    ];

    /**
     * @param DatagridMapper $datagridMapper
     */
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        // @formatter:off
        $datagridMapper
            ->add('title')
            ->add('description')
            ->add('url')
            ->add('priority')
            ->add('duration')
            ->add('source')
            ->add('categories')
        ;
        // @formatter:on
    }

    /**
     * @param ListMapper $listMapper
     */
    protected function configureListFields(ListMapper $listMapper)
    {
        // @formatter:off
        $listMapper
            ->add('title')
            ->add('url')
            ->add('priority')
            ->add('duration')
            ->add('source')
            ->add('categories')
        ;
        // @formatter:on

        $this->addDefaultActions($listMapper);
    }

    /**
     * @param FormMapper $formMapper
     */
    protected function configureFormFields(FormMapper $formMapper)
    {
        // @formatter:off
        $formMapper
            ->add('title')
            ->add('description')
            ->add('thumbnail')
            ->add('url')
            ->add('priority')
            ->add('duration')
            ->add('source')
            ->add('categories')
        ;
        // @formatter:on
    }

    /**
     * @param ShowMapper $showMapper
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        // @formatter:off
        $showMapper
            ->add('title')
            ->add('description')
            ->add('thumbnail')
            ->add('url')
            ->add('priority')
            ->add('duration')
            ->add('source')
            ->add('categories')
        ;
        // @formatter:on
    }
}