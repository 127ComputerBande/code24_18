<?php

namespace App\Serializer;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class UserSerializer
 *
 * @package App\Serializer
 */
class UserSerializer extends SessionAndEntityContextBase
{
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
        if ($subject instanceof User && $user === $subject) {
            if ($normalization) {
                $context['groups'][] = 'user_self_read';
            } else {
                $context['groups'][] = 'user_self_write';
            }
        }

        return $context;
    }
}