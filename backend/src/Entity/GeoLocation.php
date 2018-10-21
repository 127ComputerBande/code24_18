<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class GeoLocation
 *
 * @package App\Entity
 *
 * @ApiResource(
 *     attributes={
 *         "denormalization_context"={
 *             "groups"={
 *                 "geolocations_write"
 *             }
 *         },
 *         "filters"={
 *
 *         },
 *         "normalization_context"={
 *             "groups"={
 *                 "geolocations_read"
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
 *     repositoryClass="App\Repository\GeoLocationRepository"
 * )
 *
 * @ORM\Table(name="geolocations")
 */
class GeoLocation
{
    /**
     * @var string The id of this geolocation.
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     *
     * @Groups({
     *     "geolocation_read"
     * })
     */
    protected $id;

    /**
     * @var float
     *
     * @ORM\Column(type="float", nullable=true)
     *
     * @Groups({
     *     "geolocation_read",
     * })
     */
    protected $latitude;

    /**
     * @var float
     *
     * @ORM\Column(type="float", nullable=true)
     *
     * @Groups({
     *     "geolocation_read",
     * })
     */
    protected $longitude;

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->getId();
    }

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return float
     */
    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    /**
     * @param float $latitude
     * @return GeoLocation
     */
    public function setLatitude(float $latitude): GeoLocation
    {
        $this->latitude = $latitude;

        return $this;
    }

    /**
     * @return float
     */
    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    /**
     * @param float $longitude
     * @return GeoLocation
     */
    public function setLongitude(float $longitude): GeoLocation
    {
        $this->longitude = $longitude;

        return $this;
    }
}