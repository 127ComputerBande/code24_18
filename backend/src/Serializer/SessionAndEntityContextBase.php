<?php

namespace App\Serializer;

use ApiPlatform\Core\Serializer\SerializerContextBuilderInterface;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class SessionAndEntityContextBase
 *
 * @package App\Serializer
 */
class SessionAndEntityContextBase implements SerializerContextBuilderInterface
{
    /**
     * @var $decorated SerializerContextBuilderInterface
     */
    protected $decorated;

    /**
     * @var $tokenStorage TokenStorage
     */
    protected $tokenStorage;

    /**
     * UserContextBuilder constructor.
     *
     * @param SerializerContextBuilderInterface $decorated
     * @param TokenStorage $tokenStorage
     */
    public function __construct(SerializerContextBuilderInterface $decorated, TokenStorage $tokenStorage)
    {
        $this->decorated    = $decorated;
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * @param Request $request
     * @param bool $normalization
     * @param array|null $extractedAttributes
     * @return array
     */
    public function createFromRequest(Request $request, bool $normalization, array $extractedAttributes = null): array
    {
        $context         = $this->decorated->createFromRequest($request, $normalization, $extractedAttributes);
        $subject         = $request->attributes->get('data');
        $token           = $this->tokenStorage->getToken();
        $ownClassName    = get_class($this);
        $entityClassName = str_replace(
            [
                '\\Serializer\\',
                'Serializer',
            ],
            [
                '\\Entity\\',
                '',
            ],
            $ownClassName
        );

        if (
            $token && (
                $subject instanceof $entityClassName ||
                $context['resource_class'] == $entityClassName
            )
        ) {
            /**
             * @var $user User
             */
            $user = $token->getUser();

            if ($user instanceof User) {
                $context = $this->createFromRequestWithSessionAndEntity(
                    $context,
                    $token,
                    $subject,
                    $user,
                    $request,
                    $normalization,
                    $extractedAttributes
                );
            }
        }

        return $context;
    }

    /**
     * @param array $context
     * @param $token
     * @param $subject
     * @param Request $request
     * @param User $user
     * @param bool $normalization
     * @param array|null $extractedAttributes
     * @return array
     */
    public function createFromRequestWithSessionAndEntity(
        array $context,
        $token,
        $subject,
        User $user,
        Request $request,
        bool $normalization,
        array $extractedAttributes = null
    ): array
    {
        return $context;
    }
}