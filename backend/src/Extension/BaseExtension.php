<?php

namespace App\Extension;

use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;

/**
 * Class BaseExtension
 *
 * @package App\Extension
 */
abstract class BaseExtension
{
    /**
     * @param QueryBuilder $queryBuilder
     * @param string $resourceClass
     * @param string $rootAlias
     */
    protected function addWhereWithRootAlias(QueryBuilder $queryBuilder, string $resourceClass, string $rootAlias)
    {
    }

    /**
     * @param QueryBuilder $queryBuilder
     * @param string $resourceClass
     * @param array $context
     */
    protected function callAddWhereWithRootAlias(QueryBuilder $queryBuilder, string $resourceClass, array $context = [])
    {
        $rootAlias = $queryBuilder->getRootAliases()[0];

        $this->addWhereWithRootAlias($queryBuilder, $resourceClass, $rootAlias, $context);
    }

    /**
     * @param QueryBuilder $queryBuilder
     * @param QueryNameGeneratorInterface $queryNameGenerator
     * @param string $resourceClass
     * @param string|null $operationName
     */
    public function applyToCollection(
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        string $operationName = null
    )
    {
        $this->callAddWhereWithRootAlias($queryBuilder, $resourceClass);
    }

    /**
     * @param QueryBuilder $queryBuilder
     * @param QueryNameGeneratorInterface $queryNameGenerator
     * @param string $resourceClass
     * @param array $identifiers
     * @param string|null $operationName
     * @param array $context
     */
    public function applyToItem(
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        array $identifiers,
        string $operationName = null,
        array $context = []
    )
    {
        $this->callAddWhereWithRootAlias($queryBuilder, $resourceClass);
    }
}