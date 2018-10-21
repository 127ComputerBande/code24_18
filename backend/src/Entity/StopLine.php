<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class StopLine
 *
 * @package App\Entity
 *
 * @ApiResource(
 *     attributes={
 *         "denormalization_context"={
 *             "groups"={
 *                 "stopline_write"
 *             }
 *         },
 *         "filters"={
 *
 *         },
 *         "normalization_context"={
 *             "groups"={
 *                 "stopline_read"
 *             }
 *         }
 *     },
 *     itemOperations={
 *         "get"={
 *             "method"="GET"
 *         },
 *         "put"={
 *             "method"="PUT"
 *         }
 *     }
 * )
 *
 * @ORM\Entity(
 *     repositoryClass="App\Repository\StopLineRepository"
 * )
 *
 * @ORM\Table(name="stopline")
 */
class StopLine
{
    /**
     * @var string The id of this stopline.
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     *
     * @Groups({
     *     "stopline_read"
     * })
     */
    protected $id;

    /**
     * @var Stop
     *
     * @ORM\ManyToOne(targetEntity="Stop", inversedBy="stopline")
     *
     * @Assert\NotNull()
     *
     * @Groups({
     *     "stopline_read",
     * })
     */
    protected $stop;

    /**
     * @var Line
     *
     * @ORM\ManyToOne(targetEntity="Line", inversedBy="stopline")
     *
     * @Assert\NotNull()
     *
     * @Groups({
     *     "stopline_read",
     * })
     */
    protected $line;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer", nullable=true)
     *
     * @Groups({
     *     "stopline_read",
     * })
     */
    protected $position;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer", nullable=true)
     *
     * @Groups({
     *     "stopline_read",
     * })
     */
    protected $durationToNext;

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return Stop
     */
    public function getStop(): ?Stop
    {
        return $this->stop;
    }

    /**
     * @param Stop $stop
     * @return StopLine
     */
    public function setStop(Stop $stop): StopLine
    {
        $this->stop = $stop;

        return $this;
    }

    /**
     * @return Line
     */
    public function getLine(): ?Line
    {
        return $this->line;
    }

    /**
     * @param Line $line
     * @return StopLine
     */
    public function setLine(Line $line): StopLine
    {
        $this->line = $line;

        return $this;
    }

    /**
     * @return int
     */
    public function getPosition(): ?int
    {
        return $this->position;
    }

    /**
     * @param int $position
     * @return StopLine
     */
    public function setPosition(int $position): StopLine
    {
        $this->position = $position;

        return $this;
    }

    /**
     * @return int
     */
    public function getDurationToNext(): ?int
    {
        return $this->durationToNext;
    }

    /**
     * @param int $durationToNext
     * @return StopLine
     */
    public function setDurationToNext(int $durationToNext): StopLine
    {
        $this->durationToNext = $durationToNext;

        return $this;
    }
}