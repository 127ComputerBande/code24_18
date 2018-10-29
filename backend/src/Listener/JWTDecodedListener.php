<?php

namespace App\Listener;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\EntityManager;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTDecodedEvent;

/**
 * Class JWTDecodedListener
 *
 * @package App\Listener
 */
class JWTDecodedListener
{
    /**
     * @var EntityManager
     */
    protected $entityManager;

    /**
     * @var boolean $logUserAction
     */
    protected $logUserAction;

    /**
     * JWTDecodedListener constructor.
     * @param EntityManager $entityManager
     * @param boolean $logLastUserAction
     */
    public function __construct(EntityManager $entityManager, $logLastUserAction)
    {
        $this->entityManager = $entityManager;
        $this->logUserAction = $logLastUserAction;
    }

    /**
     * @param JWTDecodedEvent $event
     * @throws \Doctrine\ORM\ORMException
     */
    public function onJWTDecoded(JWTDecodedEvent $event)
    {
        if ($this->logUserAction) {
            /**
             * @var $userRepository UserRepository
             */
            $userRepository = $this->entityManager->getRepository(User::class);
            $payload        = $event->getPayload();

            if (!empty($payload['username'])) {
                $username = $payload['username'];
                $user     = $userRepository->findbyUsername($username);

                /**
                 * @var $user User
                 */
                if ($user) {
                    $user->setLastAction(new \DateTime());

                    $this->entityManager->persist($user);
                }
            }
        }
    }
}