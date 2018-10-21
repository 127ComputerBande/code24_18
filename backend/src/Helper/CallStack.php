<?php

namespace App\Helper;

/**
 * Class CallStackHelper
 *
 * @package App\Helper
 * @author Joshua Schumacher <joshua.schumacher@socialbit.de>
 * @author Thomas Kekeisen <thomas@kekeisen.it>
 */
class CallStack
{
    /**
     * @param array $methodNames
     * @return bool|string
     */
    public static function methodIsInCallStack(array $methodNames = [])
    {
        $exception = new \Exception;
        $trace     = $exception->getTraceAsString();

        foreach ($methodNames as $methodName) {
            if (strpos($trace, $methodName) !== false) {
                return $methodName;
            }
        }

        return false;
    }
}