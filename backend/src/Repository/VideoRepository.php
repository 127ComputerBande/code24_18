<?php

namespace App\Repository;

use App\Entity\Video;
use Doctrine\ORM\EntityRepository;

/**
 * Class VideoRepository
 *
 * @package App\Repository
 */
class VideoRepository extends EntityRepository
{
    public function findOneByUrl($url)
    {
        return $this->findOneBy(['url' => $url]);
    }

    public function findByDuration($duration)
    {
        $videos = $this->findBy(['duration' => $duration], ['priority' => 'DESC']);

        if (!$videos) {
            $qb = $this->_em->createQueryBuilder();
            $qb->select('v')
                ->from(Video::class, 'v')
                ->where('v.duration <= :duration')
                ->orderBy('v.priority', 'ASC')
                ->orderBy('v.duration', 'DESC')
                ->setParameter('duration', $duration)
            ;

            $videos = $qb->getQuery()->getResult();
        }

        return $videos;
    }
}