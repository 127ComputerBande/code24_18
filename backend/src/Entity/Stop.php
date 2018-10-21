<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class Stop
 *
 * @package App\Entity
 *
 * @ApiResource(
 *     attributes={
 *         "denormalization_context"={
 *             "groups"={
 *                 "stop_write"
 *             }
 *         },
 *         "filters"={
 *
 *         },
 *         "normalization_context"={
 *             "groups"={
 *                 "stop_read"
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
 *     repositoryClass="App\Repository\StopRepository"
 * )
 *
 * @ORM\Table(name="stop")
 */
class Stop
{
    /**
     * @var string The id of this stop.
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     *
     * @Groups({
     *     "stop_read",
     *     "stop_write",
     * })
     */
    protected $id;

    /**
     * @var String
     *
     * @ORM\Column(type="string", nullable=true)
     *
     * @Groups({
     *     "stop_read",
     *     "stop_write",
     * })
     */
    protected $name;

    /**
     * @var GeoLocation
     *
     * @ORM\OneToOne(targetEntity="GeoLocation")
     *
     * @Groups({
     *     "stop_read",
     *     "stop_write",
     * })
     */
    protected $location;

    /**
     * @var Collection
     *
     * @ORM\OneToMany(targetEntity="StopLine", mappedBy="stop")
     *
     * @Groups({
     *     "stop_read",
     *     "stop_write",
     * })
     */
    protected $stopline;

    /**
     * @return null|string
     */
    public function __toString()
    {
        $name = $this->getName();

        if ($name) {
            return $name;
        }

        return '';
    }

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return String
     */
    public function getName(): ?String
    {
        return $this->name;
    }

    /**
     * @param String $name
     * @return Stop
     */
    public function setName(String $name): Stop
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return GeoLocation
     */
    public function getLocation(): ?GeoLocation
    {
        return $this->location;
    }

    /**
     * @param GeoLocation $location
     * @return Stop
     */
    public function setLocation(GeoLocation $location): Stop
    {
        $this->location = $location;

        return $this;
    }

    /**
     * @return Collection
     */
    public function getStopline(): ?Collection
    {
        return $this->stopline;
    }

    /**
     * @param Collection $stopline
     * @return Stop
     */
    public function setStopline(Collection $stopline): Stop
    {
        $this->stopline = $stopline;

        return $this;
    }
}