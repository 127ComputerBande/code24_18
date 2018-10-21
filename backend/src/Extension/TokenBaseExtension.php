<?php

namespace App\Extension;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

/**
 * Class TokenBaseExtension
 *
 * @package App\Extension
 */
class TokenBaseExtension extends BaseExtension
{
    /**
     * @var TokenStorageInterface
     */
    private $tokenStorage;

    /**
     * OwnStoresExtension constructor.
     * @param TokenStorageInterface $tokenStorage
     */
    public function __construct(TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * @return null|object|string
     */
    protected function getUserFromToken()
    {
        $token = $this->tokenStorage->getToken();

        if ($token) {
            $user = $token->getUser();

            if ($user) {
                return $user;
            }
        }

        return null;
    }
}