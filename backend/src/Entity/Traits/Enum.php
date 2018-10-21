<?php

namespace App\Entity\Traits;

/**
 * Trait Enum
 * @package App\Entity\Traits
 */
trait Enum
{
    /**
     * @return array
     * @throws \ReflectionException
     */
    static public function getConstants()
    {
        $className = get_class();
        $class     = new \ReflectionClass($className);

        return $class->getConstants();
    }

    /**
     * @param null $excludedValues
     * @return array
     * @throws \ReflectionException
     */
    static public function getConstantValues($excludedValues = null)
    {
        $constants = self::getConstants();
        $values    = [];

        foreach ($constants as $name => $value) {
            if ($excludedValues == null || !in_array($value, $excludedValues)) {
                $values[] = $value;
            }
        }

        return $values;
    }
}