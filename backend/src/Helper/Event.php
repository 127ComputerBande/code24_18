<?php

namespace App\Helper;

/**
 * Class Event
 *
 * @author Felix Bäder <felix@lulububu.de>
 * @package App\Helper
 */
class Event
{
    /**
     * @param $events
     * @return mixed
     */
    public static function orderEventsByStartDate($events)
    {
        uasort($events, function ($eventLeft, $eventRight) {
            $eventLeftStartDate  = $eventLeft->getStartDate();
            $eventRightStartDate = $eventRight->getStartDate();

            if ($eventLeftStartDate == $eventRightStartDate) {
                return 0;
            }

            return ($eventLeftStartDate < $eventRightStartDate) ? -1 : 1;
        });

        return $events;
    }
}