<?php

namespace App\Extension;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\User;
use App\Helper\DateTimeProvider;
use Doctrine\ORM\QueryBuilder;

/**
 * Class UserExtension
 *
 * @package App\Extension
 */
class UserExtension extends TokenBaseExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    /**
     * @param QueryBuilder $queryBuilder
     * @param QueryNameGeneratorInterface $queryNameGenerator
     * @param string $resourceClass
     * @param string|null $operationName
     */
    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
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
    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, string $operationName = null, array $context = [])
    {
        $this->callAddWhereWithRootAlias($queryBuilder, $resourceClass);
    }

    /**
     * @param QueryBuilder $queryBuilder
     * @param string $resourceClass
     * @param string $rootAlias
     */
    protected function addWhereWithRootAlias(QueryBuilder $queryBuilder, string $resourceClass, string $rootAlias)
    {
        if (User::class === $resourceClass) {
            $user         = $this->getUserFromToken();
            $fourWeeksAgo = DateTimeProvider::getStartOfNWeeksAgo(4);

            $queryBuilder
                ->andWhere(sprintf('%s = :user', $rootAlias, $rootAlias))
                ->andWhere(sprintf('%s.lastAction > :userTimeout', $rootAlias))
                ->setParameter('user', $user)
                ->setParameter('userTimeout', $fourWeeksAgo)
            ;
        }
    }
}