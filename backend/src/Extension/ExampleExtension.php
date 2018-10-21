<?php

namespace App\Extension;

use App\Entity\Example;
use Doctrine\ORM\QueryBuilder;

/**
 * Class ExampleExtension
 *
 * @package App\Extension
 */
class ExampleExtension extends BaseExtension
{
    /**
     * @param QueryBuilder $queryBuilder
     * @param string $resourceClass
     * @param string $rootAlias
     * @param array $context
     */
    protected function addWhereWithRootAlias(QueryBuilder $queryBuilder, string $resourceClass, string $rootAlias, array $context = [])
    {
        if (Example::class === $resourceClass) {
            $queryBuilder
                ->andWhere(sprintf('%s.enabled = :enabled', $rootAlias))
                ->setParameter('enabled', true)
            ;
        }
    }
}