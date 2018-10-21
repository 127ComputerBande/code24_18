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
 * Class UserAdmin
 *
 * @author Felix Bäder <felix@lulububu.de>
 * @package App\Admin
 */
class UserAdmin extends BaseAdmin
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
        $datagridMapper
            ->add('username')
            ->add('email')
            ->add('name')
            ->add('enabled')
            ->add(
                'creationDate',
                'doctrine_orm_datetime_range',
                [],
                null,
                [
                    'required' => false,
                    'attr'     => ['class' => 'datetimepicker'],
                ]
            )
            ->add(
                'lastAction',
                'doctrine_orm_datetime_range',
                [],
                null,
                [
                    'required' => false,
                    'attr'     => ['class' => 'datetimepicker'],
                ]
            )
            ->add(
                'updatedDate',
                'doctrine_orm_datetime_range',
                [],
                null,
                [
                    'required' => false,
                    'attr'     => ['class' => 'datetimepicker'],
                ]
            )
        ;
    }

    /**
     * @param ListMapper $listMapper
     */
    protected function configureListFields(ListMapper $listMapper)
    {
        // @formatter:off
        $listMapper
            ->add('username', null, ['editable' => true])
            ->add('email',    null, ['editable' => true])
            ->add('name',     null, ['editable' => true])
            ->add('enabled',  null, ['editable' => true])
        ;
        // @formatter:on

        $this->addDefaultActions($listMapper);
    }

    /**
     * @param FormMapper $formMapper
     */
    protected function configureFormFields(FormMapper $formMapper)
    {
        $passwordRequired = !$this->isEditMode();
        $roles            = $this->getAvailableRoles();

        // @formatter:off
        $formMapper
            ->with('User', ['class' => AdminLayout::HALF])
                ->add(
                    'name',
                    Types::TEXT,
                    [
                        'required' => false
                    ]
                )
                ->add('username')
                ->add('email')
                ->add('enabled')
                ->add(
                    'lastAction',
                    Types::DATETIME_PICKER,
                    [
                        'view_timezone' => 'Europe/Berlin',
                        'required'      => false,
                    ]
                )
            ->end()
            ->with('Categories', ['class' => AdminLayout::HALF])
                ->add(
                    'categories',
                    ModelType::class,
                    [
                        'required' => false,
                        'multiple' => true
                    ]
                )
            ->end()
            ->with('Password', ['class' => AdminLayout::HALF])
                ->add(
                    'plainPassword',
                    Types::PASSWORD,
                    [
                        'help' => 'passwordTip',
                        'required' => $passwordRequired
                    ]
                )
                ->add('roles', Types::CHOICE,
                    [
                        'choices' => $roles,
                        'multiple'=> true,
                        'translation_domain' => 'admin',
                    ]
                )
            ->end()
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
            ->with('Internal')
                ->add('id')
            ->end()
            ->with('User', ['class' => AdminLayout::HALF])
                ->add('name')
                ->add('username')
                ->add(
                    'email',
                    null,
                    [
                        'template' => 'Admin/emailShowItem.html.twig'
                    ]
                )
                ->add('enabled')
                ->add(
                    'roles',
                    null,
                    [
                        'template' => 'Admin/arrayShowItem.html.twig'
                    ])
            ->end()
            ->with('Categories', ['class' => AdminLayout::HALF])
                ->add(
                    'categories',
                    ModelType::class,
                    [
                        'required' => false,
                        'multiple' => true
                    ]
                )
            ->end()
            ->with('History', ['class' => AdminLayout::HALF])
                ->add(
                    'lastAction',
                    null,
                    [
                        'template' => 'Admin/datetimeShowItem.html.twig'
                    ]
                )
                ->add(
                    'creationDate',
                    null,
                    [
                        'help'     => 'netProfitInEuroHelp',
                        'template' => 'Admin/datetimeShowItem.html.twig'
                    ]
                )
                ->add('creationUser')
                ->add(
                    'updatedDate',
                    null,
                    [
                        'help'     => 'netProfitInEuroHelp',
                        'template' => 'Admin/datetimeShowItem.html.twig'
                    ]
                )
                ->add('updatedUser')
            ->end()
        ;
        // @formatter:on
    }

    /**
     * @param $user
     */
    public function prePersist($user)
    {
        parent::prePersist($user);
        $this->updateUser($user);
    }

    /**
     * @param $user
     */
    public function preUpdate($user)
    {
        parent::preUpdate($user);
        $this->updateUser($user);
    }

    /**
     * @param User $user
     */
    public function updateUser(User $user)
    {
        $userManager = $this->getConfigurationPool()->getContainer()->get('fos_user.user_manager');
        $userManager->updateUser($user, false);
    }

    /**
     * @param $roles
     * @return array
     */
    protected function flattenRoles($roles)
    {
        $flattenRoles = [];
        foreach ($roles as $key => $role) {
            $flattenRoles[$key] = $key;
        }

        return $flattenRoles;
    }

    /**
     * @return array
     */
    protected function getAvailableRoles()
    {
        $container = $this->getConfigurationPool()->getContainer();
        $roles     = $container->getParameter('security.role_hierarchy.roles');

        return $this->flattenRoles($roles);
    }
}