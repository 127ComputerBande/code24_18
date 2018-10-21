<?php

namespace App\Subscriber;

use App\Entity\Image;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Vich\UploaderBundle\Templating\Helper\UploaderHelper;
use Vich\UploaderBundle\Storage\StorageInterface;

/**
 * Class ImageSubscriber
 *
 * @author Thomas Kekeisen <thomas@kekeisen.it>
 * @package AppBundle\Subscriber
 */
class ImageSubscriber implements EventSubscriber
{
    /**
     * @var string
     */
    protected $adapterId;

    /**
     * @var string
     */
    protected $bucketUrl;

    /**
     * @var StorageInterface
     */
    protected $storage;

    /**
     * @param $args
     */
    protected function fixImagePath($args)
    {
        $entity = $args->getEntity();

        if ($entity instanceof Image && !empty($entity->getImageName())) {
            $entityManager = $args->getEntityManager();
            // @formatter:off
            $path          = ($this->adapterId != 'local')
                ? $this->bucketUrl . $entity->getImageName()
                : '/uploads/images/' . $entity->getImageName()
            ;
            // @formatter:on

            $entity->setImagePath($path);

            $entityManager->persist($entity);
            $entityManager->flush($entity);
        }
    }

    /**
     * @return array
     */
    public function getSubscribedEvents()
    {
        return [
            'postPersist',
            'postUpdate',
        ];
    }

    /**
     * @param LifecycleEventArgs $args
     */
    public function postPersist(LifecycleEventArgs $args)
    {
        $this->fixImagePath($args);
    }

    /**
     * @param LifecycleEventArgs $args
     */
    public function postUpdate(LifecycleEventArgs $args)
    {
        $this->fixImagePath($args);
    }

    /**
     * @param StorageInterface $storage
     */
    public function setStorage(StorageInterface $storage)
    {
        $this->storage = $storage;
    }

    /**
     * @param string $adapterId
     */
    public function setAdapterId(string $adapterId)
    {
        $this->adapterId = $adapterId;
    }

    /**
     * @param string $bucketUrl
     */
    public function setBucketUrl(string $bucketUrl)
    {
        $this->bucketUrl = $bucketUrl;
    }
}