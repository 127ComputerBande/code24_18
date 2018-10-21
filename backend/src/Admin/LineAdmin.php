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
 * Class LineAdmin
 *
 * @package App\Admin
 */
class LineAdmin extends BaseAdmin
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
            ->add('name')
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
            ->add('name')
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
            ->add('name')
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
            ->add('name')
        ;
        // @formatter:on
    }
}