<?php

namespace App\Listener;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;

/**
 * Class AuthenticationSuccessListener
 *
 * @author Thomas Kekeisen <thomas@kekeisen.it>
 * @package AppBundle\Listener
 */
class AuthenticationSuccessListener
{
    /**
     * @param AuthenticationSuccessEvent $event
     */
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        /**
         * @var $user User
         */
        $user = $event->getUser();

        if ($user && $user instanceof User) {
            $data           = $event->getData();
            $data['userId'] = '/api/users/' . $user->getId();

            $event->setData($data);
        }
    }
}