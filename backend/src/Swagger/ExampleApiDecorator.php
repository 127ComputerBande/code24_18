<?php

namespace App\Swagger;

use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

/**
 * Class ExampleApiDecorator
 *
 * @todo Skelton
 *
 * @author Thomas Kekeisen <thomas@kekeisen.it>
 * @package App\Swagger
 */
final class ExampleApiDecorator extends BaseApiDecorator implements NormalizerInterface
{
    /**
     * @param object $object
     * @param null $format
     * @param array $context
     * @return array|bool|float|int|string
     */
    public function normalize($object, $format = null, array $context = [])
    {
        $docs = $this->decorated->normalize($object, $format, $context);

        $docs['paths']['/api/examples']['post']['parameters'][] = [
            'name'        => 'name',
            'description' => 'The Name of the Entity',
            'in'          => 'query',
            'required'    => true,
        ];

        return $docs;
    }
}