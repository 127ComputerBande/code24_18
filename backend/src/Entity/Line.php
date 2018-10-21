<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class Line
 *
 * @package App\Entity
 *
 * @ApiResource(
 *     attributes={
 *         "denormalization_context"={
 *             "groups"={
 *                 "line_write"
 *             }
 *         },
 *         "filters"={
 *
 *         },
 *         "normalization_context"={
 *             "groups"={
 *                 "line_read"
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
 *     repositoryClass="App\Repository\LineRepository"
 * )
 *
 * @ORM\Table(name="line")
 */
class Line
{
    /**
     * @var string The id of this line.
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     *
     * @Groups({
     *     "line_read"
     * })
     */
    protected $id;

    /**
     * @var String
     *
     * @ORM\Column(type="string", nullable=true)
     *
     * @Groups({
     *     "line_read",
     * })
     */
    protected $name;

    /**
     * @var StopLine
     *
     * @ORM\OneToMany(targetEntity="StopLine", mappedBy="line")
     *
     * @Groups({
     *     "stopline_read",
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
     * @return Line
     */
    public function setName(String $name): Line
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return StopLine
     */
    public function getStopline(): ?StopLine
    {
        return $this->stopline;
    }

    /**
     * @param StopLine $stopline
     * @return Line
     */
    public function setStopline(StopLine $stopline): Line
    {
        $this->stopline = $stopline;

        return $this;
    }
}