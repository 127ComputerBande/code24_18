<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\EntityManager;
use Sonata\AdminBundle\Controller\CRUDController;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Class BaseCRUDController
 *
 * @package App\Controller
 */
class BaseCRUDController extends CRUDController
{
    /**
     * @return null|User
     */
    protected function getCurrentUser()
    {
        $user = $this->getUser();

        if ($user) {
            return $user;
        }

        return null;
    }

    /**
     * @param $entity
     * @param $translationKey
     * @return RedirectResponse
     * @throws \Exception
     */
    protected function persistEntityAndRedirect($entity, $translationKey)
    {
        $this->persistEntity($entity);

        return $this->redirectWithSuccess($translationKey);
    }

    /**
     * @param $entity
     * @throws \Exception
     */
    protected function persistEntity($entity)
    {
        /**
         * @var $entityManager EntityManager
         */
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($entity);
        $entityManager->flush($entity);
    }

    /**
     * @return EntityManager
     */
    protected function getEntityManager()
    {
        /**
         * @var $entityManager EntityManager
         */
        $entityManager = $this->get('doctrine.orm.entity_manager');

        return $entityManager;
    }

    /**
     * @param $translationKey
     * @param array $parameters
     * @return RedirectResponse
     */
    protected function redirectWithError($translationKey, $parameters = [])
    {
        return $this->redirectWithMessage($translationKey, 'sonata_flash_error', $parameters);
    }

    /**
     * @param $translationKey
     * @param array $parameters
     * @return RedirectResponse
     */
    protected function redirectWithSuccess($translationKey, $parameters = [])
    {
        return $this->redirectWithMessage($translationKey, 'sonata_flash_success', $parameters);
    }

    /**
     * @param $translationKey
     * @param string $type
     * @param $parameters
     * @return RedirectResponse
     */
    protected function redirectWithMessage($translationKey, $type = 'sonata_flash_success', $parameters = [])
    {
        // @formatter:off
        $message             = $this->admin->trans($translationKey, $parameters);
        $request             = $this->getRequest();
        $redirectToDashboard = $request->get('dashboard');
        $redirectionTarget   = (
            $redirectToDashboard ?
                $this->generateUrl('sonata_admin_dashboard') :
                $this->admin->generateUrl('list')
        );
        // @formatter:on

        $this->addFlash($type, $message);

        return new RedirectResponse($redirectionTarget);
    }
}