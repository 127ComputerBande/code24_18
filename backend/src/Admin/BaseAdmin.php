<?php

namespace App\Admin;

use App\Entity\User;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Mapper\BaseMapper;

/**
 * Class BaseAdmin
 *
 * @author Felix Bäder <felix@lulububu.de>
 * @package App\Admin
 */
class BaseAdmin extends AbstractAdmin
{
    /**
     * @var string
     */
    protected $translationDomain = 'admin';

    /**
     * @param $class
     * @return mixed
     */
    protected function getRepository($class)
    {
        $entityManager = $this->getEntityManager();

        return $entityManager->getRepository($class);
    }

    /**
     * @return mixed
     */
    protected function getEntityManager()
    {
        $container = $this->getConfigurationPool()->getContainer();

        return $container->get('doctrine.orm.entity_manager');
    }

    /**
     * Adds the creation user field to the given mapper.
     *
     * @param BaseMapper $mapper
     */
    protected function addCreationUserField(BaseMapper $mapper)
    {
        // @formatter:off
        $mapper
            ->add('creationUser')
        ;
        // @formatter:on
    }

    /**
     * Adds the default actions to the given list mapper (show, edit, delete)
     *
     * @param ListMapper $listMapper
     */
    protected function addDefaultActions(ListMapper $listMapper, $customActions = [], $options = [])
    {
        $defaultActions = [
            'show'   => [],
            'edit'   => [],
            'delete' => [],
        ];

        $finalActions = array_merge($defaultActions, $customActions);
        $finalOptions = array_merge($options, [
            'actions' => $finalActions,
        ]);

        // @formatter:off
        $listMapper
            ->add('_action', null, $finalOptions)
        ;
        // @formatter:on
    }

    /**
     * Adds the creation and updated date to the given mapper.
     *
     * @param BaseMapper $mapper
     */
    protected function addDateFields(BaseMapper $mapper)
    {
        // @formatter:off
        $mapper
            ->add('creationDate')
            ->add('updatedDate')
        ;
        // @formatter:on
    }

    /**
     * Adds the id field to the given mapper.
     *
     * @param BaseMapper $mapper
     */
    protected function addIdField(BaseMapper $mapper)
    {
        if (!$mapper instanceof FormMapper) {
            // @formatter:off
            $mapper
                ->add('id')
            ;
            // @formatter:on
        }
    }

    /**
     * @return null|User
     */
    protected function getCurrentUser()
    {
        $container = $this->getConfigurationPool()->getContainer();

        if ($container) {
            $tokenStorage = $container->get('security.token_storage');

            if ($tokenStorage) {
                $token = $tokenStorage->getToken();

                if ($token) {
                    $user = $token->getUser();

                    if ($user) {
                        return $user;
                    }
                }
            }
        }

        return null;
    }

    /**
     * Returns true when the controller is in "edit mode"
     *
     * @return bool
     */
    protected function isEditMode()
    {
        $subject = $this->getSubject();

        if ($subject) {
            $id = $this->id($subject);

            if ($id) {
                return true;
            }
        }

        return false;
    }

    /**
     * Returns 'true' when this admin view is embedded.
     *
     * @return bool
     */
    protected function isEmbedded()
    {
        return $this->hasParentFieldDescription();
    }
}