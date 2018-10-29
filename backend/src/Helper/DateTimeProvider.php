<?php

namespace App\Helper;

/**
 * Class DateTimeProvider
 *
 * @see http://php.net/manual/de/datetime.formats.relative.php
 * @package App\Helper
 * @author Thomas Kekeisen <thomas@lulububu.de>
 * @author Joshua Schumacher <joshua@lulububu.de>
 */
class DateTimeProvider
{
    /**
     * @return \DateTime
     */
    public static function getEndOfCurrentDay()
    {
        $date = new \DateTime('today');

        $date->setTime(23, 59, 59);

        return $date;
    }

    /**
     * @return \DateTime
     */
    public static function getEndOfCurrentCalendarWeek()
    {
        $date = new \DateTime('sunday this week');

        $date->setTime(23, 59, 59);

        return $date;
    }

    /**
     * @param int $weeksAgo
     * @return \DateTime
     *
     * Need to add/sub 1 week there, because "monday -1 week" gives back the current monday
     */
    public static function getStartOfNWeeksAgo(int $weeksAgo = 0)
    {
        $date = new \DateTime('monday ' . (abs($weeksAgo + 1) * -1) . ' week');

        $date->setTime(0, 0, 0);

        return $date;
    }

    /**
     * @return \DateTime
     */
    public static function getStartOfCurrentDay()
    {
        $date = new \DateTime('today');

        $date->setTime(0, 0, 0);

        return $date;
    }
}