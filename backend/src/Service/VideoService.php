<?php

namespace App\Service;

use App\Entity\Line;
use App\Entity\Stop;
use App\Entity\StopLine;
use App\Entity\Video;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class VideoService
{
    /**
     * @var EntityManager $entityManager
     */
    protected $entityManager;

    /**
     * VideoService constructor.
     *
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getVideosByDurationResponseData($seconds)
    {
        $repository = $this->entityManager->getRepository(Video::class);
        $videos     = $repository->findByDuration($seconds);

        $serializer = new Serializer([new ObjectNormalizer()], [new JsonEncoder()]);

        $serializesVideos = $serializer->normalize($videos);

        return [
            '@context'     => '/api/contexts/Video',
            '@id'          => '/api/get-videos',
            '@type'        => 'hydra:Collection',
            'hydra:member' => $serializesVideos,
        ];
    }

    public function getDurationByStartStop($line, $start, $stop)
    {
        $lineRepository     = $this->entityManager->getRepository(Line::class);
        $stopLineRepository = $this->entityManager->getRepository(StopLine::class);

        $line = $lineRepository->find($line);

        $stopline = $stopLineRepository->findBy(['line' => $line], ['position' => 'ASC']);

        $count = false;
        $sum   = 0;

        foreach ($stopline as $iteration) {
            if ($iteration->getStop()->getId() == $stop) {
                $count = false;
            }

            if ($iteration->getStop()->getId() == $start) {
                $count = true;
            }

            if ($count) {
                $sum += $iteration->getDurationToNext();
            }
        }

        return $sum;
    }
}