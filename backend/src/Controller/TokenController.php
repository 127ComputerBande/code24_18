<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Swagger\Annotations as SWG;
use FOS\RestBundle\Controller\Annotations as Rest;

/**
 * Class TokenController
 *
 * @package App\Controller
 */
class TokenController
{
    /**
     * @SWG\Response(
     *     response=200,
     *     description="Uploads a new image and returns the object afterwards."
     * )
     * @SWG\Parameter(
     *     name="email",
     *     in="query",
     *     type="string",
     *     description="The email of the user. (If you can't get a token take a look at config/packages/security.yaml#24)"
     * )
     * @SWG\Parameter(
     *     name="password",
     *     in="query",
     *     type="string",
     *     description="The password of the user"
     * )
     * @SWG\Tag(name="Tokens")
     * @Route(path="/api/tokens", methods={"OPTIONS", "POST"})
     *
     * @return Response
     */
    public function postTokenAction()
    {
        // The security layer will intercept the request and return a JWT
        return new Response('', 401);
    }
}