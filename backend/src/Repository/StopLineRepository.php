<?php

namespace App\Repository;

use App\Entity\StopLine;
use Doctrine\ORM\EntityRepository;

/**
 * Class StopLineRepository
 *
 * @package App\Repository
 */
class StopLineRepository extends EntityRepository
{
    public function findByStops($start, $stop)
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('s')
            ->from(StopLine::class, 's')
        ;

        $test = $qb->getQuery()->getResult();

        dump($test);
        die();
    }
}