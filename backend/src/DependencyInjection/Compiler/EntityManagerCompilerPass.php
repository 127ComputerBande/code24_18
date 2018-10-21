<?php

namespace App\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Reference;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;

/**
 * Class EntityManagerCompilerPass
 *
 * @package App\DependencyInjection\Compiler
 */
class EntityManagerCompilerPass implements CompilerPassInterface
{
    /**
     * @param ContainerBuilder $container
     */
    public function process(ContainerBuilder $container)
    {
        $this->injectEnvironmentToEntityManager($container);
    }

    /**
     * @param ContainerBuilder $container
     */
    public function injectEnvironmentToEntityManager(ContainerBuilder $container)
    {
        $serviceId = 'doctrine.orm.default_entity_manager';

        if ($container->hasDefinition($serviceId)) {
            $definition = $container->getDefinition($serviceId);
            $parameters = [new Reference('App\Helper\Environment')];

            $definition->addMethodCall('setEnvironmentHelper', $parameters);
        }
    }
}