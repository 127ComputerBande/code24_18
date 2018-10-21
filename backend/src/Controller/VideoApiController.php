<?php

namespace App\Controller;

use App\Entity\Video;
use Symfony\Component\Serializer\Annotation\Groups;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

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
     * @Route("/api/get-videos/{seconds}", name="video", methods={"GET"})
     */
    public function indexAction($seconds)
    {
        $repository = $this->getDoctrine()->getRepository(Video::class);
        $videos     = $repository->findByDuration($seconds);

        $serializer = new Serializer([new ObjectNormalizer()], [new JsonEncoder()]);

        $serializesVideos = $serializer->normalize($videos);

        $data = [
            '@context'     => '/api/contexts/Video',
            '@id'          => '/api/get-videos',
            '@type'        => 'hydra:Collection',
            'hydra:member' => $serializesVideos,
        ];

        return new JsonResponse($data, Response::HTTP_OK);
    }
}