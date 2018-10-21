<?php

namespace App\Subscriber;

use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LoadClassMetadataEventArgs;
use Doctrine\ORM\Mapping\ClassMetadataInfo;

/**
 * Class TablePrefixSubscriber
 * @package App\Subscriber
 */
class TablePrefixSubscriber implements EventSubscriber
{
    /**
     * @var String
     */
    protected $prefix;

    /**
     * TablePrefixSubscriber constructor.
     * @param String $prefix
     */
    public function __construct(String $prefix)
    {
        $this->prefix = $prefix;
    }

    /**
     * Returns an array of events this subscriber wants to listen to.
     *
     * @return string[]
     */
    public function getSubscribedEvents()
    {
        return ['loadClassMetadata'];
    }

    /**
     * @param LoadClassMetadataEventArgs $args
     */
    public function loadClassMetadata(LoadClassMetadataEventArgs $args)
    {
        $classMetadata = $args->getClassMetadata();

        if ($classMetadata->isInheritanceTypeSingleTable() && !$classMetadata->isRootEntity()) {
            return;
        }

        $classMetadata->setTableName($this->prefix . $classMetadata->getTableName());

        foreach ($classMetadata->getAssociationMappings() as $fieldName => $mapping) {
            if (
                $mapping['type'] == ClassMetadataInfo::MANY_TO_MANY &&
                array_key_exists('name', $classMetadata->associationMappings[$fieldName]['joinTable'])
            ) {
                $mappedTableName                                                     = $classMetadata->associationMappings[$fieldName]['joinTable']['name'];
                $classMetadata->associationMappings[$fieldName]['joinTable']['name'] = $this->prefix . $mappedTableName;
            }
        }
    }
}