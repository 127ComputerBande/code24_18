<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class RedirectingController
 *
 * @package App\Controller
 */
class RedirectingController extends Controller
{
    /**
     * This controller removes trailing slashes from all urls.
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     *
     * @Route("/{url}", name="remove_trailing_slash",
     *     requirements={"url" = "^(?!admin).*\/$"})
     */
    public function removeTrailingSlash(Request $request)
    {
        $pathInfo   = $request->getPathInfo();
        $requestUri = $request->getRequestUri();
        $url        = str_replace($pathInfo, rtrim($pathInfo, ' /'), $requestUri);

        return $this->redirect($url, Response::HTTP_PERMANENTLY_REDIRECT);
    }
}