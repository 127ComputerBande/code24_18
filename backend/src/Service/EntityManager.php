<?php

namespace App\Service;

use App\Helper\CallStack;
use App\Helper\Environment;
use Doctrine\Common\EventManager;
use Doctrine\ORM\Configuration;
use Doctrine\DBAL\Connection;
use Doctrine\ORM\EntityManager as BaseEntityManager;
use Doctrine\ORM\ORMException;

/**
 * Class EntityManager
 *
 * @package App\Service
 * @author Joshua Schumacher <joshua.schumacher@socialbit.de>
 * @author Thomas Kekeisen <thomas@kekeisen.it>
 */
class EntityManager extends BaseEntityManager
{
    /**
     * @var Environment $environmentHelper
     */
    protected $environmentHelper;

    /**
     * @param Environment $environmentHelper
     */
    public function setEnvironmentHelper(Environment $environmentHelper)
    {
        $this->environmentHelper = $environmentHelper;
    }

    /**
     * @return array
     */
    protected function getCriticalMethodNames()
    {
        return [
            'prePersist',
            'preUpdate',
            'preFlush',
            'onFlush',
        ];
    }

    /**
     * @param null $entity
     * @throws \Exception
     */
    public function flush($entity = null)
    {
        if (!$entity && $this->environmentHelper->environmentIsDevelopment()) {
            $criticalMethodNames = $this->getCriticalMethodNames();
            $methodInCallStack   = CallStack::methodIsInCallStack($criticalMethodNames);

            if ($methodInCallStack) {
                throw new \Exception('Flush is called from \'' . $methodInCallStack . '\' which is not allowed.');
            }
        }

        parent::flush($entity);
    }

    /**
     * @param mixed $conn
     * @param Configuration $config
     * @param EventManager|null $eventManager
     * @return EntityManager
     * @throws ORMException
     * @throws \Exception
     * @see http://stackoverflow.com/a/19649454/4457798
     */
    public static function create($conn, Configuration $config, EventManager $eventManager = null)
    {
        if (!$config->getMetadataDriverImpl()) {
            throw ORMException::missingMappingDriverImpl();
        }

        if (is_array($conn)) {
            $conn = \Doctrine\DBAL\DriverManager::getConnection($conn, $config, ($eventManager ?: new EventManager()));
        } else if ($conn instanceof Connection) {
            if ($eventManager !== null && $conn->getEventManager() !== $eventManager) {
                throw ORMException::mismatchedEventManager();
            }
        } else {
            throw new \InvalidArgumentException('Invalid argument: ' . $conn);
        }

        return new EntityManager($conn, $config, $conn->getEventManager());
    }
}