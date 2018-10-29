<?php

namespace App\Controller;

use Doctrine\ORM\ORMException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class MonitoringApiController
 *
 * @package App\Controller
 */
class MonitoringApiController extends Controller
{
    /**
     * @param $value
     * @return string
     */
    protected function formatDiskSpace($value)
    {
        return $value ? $value : -1;
    }

    /**
     * @return array
     */
    protected function getDiskSpaceData()
    {
        $totalSpace = disk_total_space('/');
        $freeSpace  = disk_free_space('/');

        $data = [
            'totalInBytes' => $this->formatDiskSpace($totalSpace),
            'freeInBytes'  => $this->formatDiskSpace($freeSpace),
        ];

        return $data;
    }

    /**
     * You can extend this controller by adding more metrics that
     * may be relevant for our monitoring.
     *
     * @Route("/api/monitoring", name="monitoring")
     */
    public function indexAction()
    {
        $monitoringData = [
            'diskSpace' => $this->getDiskSpaceData(),
        ];

        return new JsonResponse($monitoringData);
    }
}