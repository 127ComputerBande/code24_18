<?php

namespace App\Controller;

use App\Service\VideoService;
use Symfony\Component\Serializer\Annotation\Groups;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class VideoApiController
 *
 * @package App\Controller
 */
class VideoApiController extends Controller
{
    /**
     * @param $seconds
     * @return JsonResponse
     *
     * @Route("/api/get-videos/{seconds}", name="get-videos-by-seconds", methods={"GET"})
     */
    public function videoBySecondsAction($seconds)
    {
        /** @var VideoService $videoService */
        $videoService = $this->container->get('App\Service\VideoService');

        $videos = $videoService->getVideosByDurationResponseData($seconds);

        return new JsonResponse($videos, Response::HTTP_OK);
    }

    /**
     * @param $line
     * @param $start
     * @param $stop
     * @return JsonResponse
     *
     * @Route("/api/get-videos/{line}/{start}/{stop}", name="get-videos-by-start-stop", methods={"GET"})
     */
    public function videoByStartStopAction($line, $start, $stop)
    {
        /** @var VideoService $videoService */
        $videoService = $this->container->get('App\Service\VideoService');

        $seconds = $videoService->getDurationByStartStop($line, $start, $stop);
        $videos  = $videoService->getVideosByDurationResponseData($seconds);

        return new JsonResponse($videos, Response::HTTP_OK);
    }
}