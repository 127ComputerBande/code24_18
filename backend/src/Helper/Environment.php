<?php

namespace App\Helper;

/**
 * Class EnvironmentHelper
 *
 * @package App\Helper
 * @author Joshua Schumacher <joshua.schumacher@socialbit.de>
 * @author Thomas Kekeisen <thomas@kekeisen.it>
 */
class Environment
{
    const ENVIRONMENT_DEV  = 'dev';
    const ENVIRONMENT_PROD = 'prod';
    const ENVIRONMENT_TEST = 'test';

    /**
     * @var string $environment
     */
    protected $environment;

    /**
     * Environment constructor.
     * @param $environment
     * @throws \Exception
     */
    public function __construct($environment)
    {
        if (!self::isEnvironmentValid($environment)) {
            throw new \Exception('Invalid environment injected; possible environments are: ' . self::getEnvironments(true));
        }

        $this->environment = $environment;
    }

    /**
     * @return bool
     */
    public function environmentIsDevelopment()
    {
        return self::passedEnvironmentIsDevelopment($this->environment);
    }

    /**
     * @param bool $asString
     * @return array|string
     */
    public static function getEnvironments($asString = false)
    {
        $allowedEnvironments = [
            self::ENVIRONMENT_DEV,
            self::ENVIRONMENT_PROD,
            self::ENVIRONMENT_TEST,
        ];

        if ($asString) {
            return implode($allowedEnvironments, ', ');
        }

        return $allowedEnvironments;
    }

    /**
     * @param $environment
     * @return bool
     */
    public static function isEnvironmentValid($environment)
    {
        return in_array($environment, self::getEnvironments());
    }

    /**
     * @param $environment
     * @return bool
     */
    public static function passedEnvironmentIsDevelopment($environment)
    {
        return $environment == self::ENVIRONMENT_DEV;
    }
}