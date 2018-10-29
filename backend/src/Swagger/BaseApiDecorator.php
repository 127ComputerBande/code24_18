<?php

namespace App\Swagger;

use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

/**
 * Class BaseApiDecorator
 *
 * @author Thomas Kekeisen <thomas@kekeisen.it>
 * @package App\Swagger
 */
abstract class BaseApiDecorator implements NormalizerInterface
{
    /**
     * @var NormalizerInterface
     */
    protected $decorated;

    /**
     * CheckInDecorator constructor.
     * @param NormalizerInterface $decorated
     */
    public function __construct(NormalizerInterface $decorated)
    {
        $this->decorated = $decorated;
    }

    /**
     * @param mixed $data
     * @param null $format
     * @return bool
     */
    public function supportsNormalization($data, $format = null)
    {
        return $this->decorated->supportsNormalization($data, $format);
    }
}