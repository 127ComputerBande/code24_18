<?php

namespace App\Subscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Video;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class VideoApiSubscriber implements EventSubscriberInterface
{
    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * VideoApiSubscriber constructor.
     *
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => [['checkForDuplicate', EventPriorities::PRE_WRITE]],
        ];
    }

    /**
     * @param GetResponseForControllerResultEvent $event
     */
    public function checkForDuplicate(GetResponseForControllerResultEvent $event)
    {
        /** @var Video $video */
        $video  = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($method === 'POST' && $video instanceof Video) {
            $repository = $this->entityManager->getRepository(Video::class);
            /** @var Video $existingVideo */
            $existingVideo = $repository->findOneByUrl($video->getUrl());

            if ($existingVideo) {
                $existingVideo->setPriority($video->getPriority());
                $existingVideo->setDuration($video->getDuration());
                $existingVideo->setSource($video->getSource());
                $existingVideo->setCategories($video->getCategories());
                $existingVideo->setTitle($video->getTitle());
                $existingVideo->setDescription($video->getDescription());
                $existingVideo->setThumbnail($video->getThumbnail());

                $event->setControllerResult($existingVideo);
            }
        }
    }
}