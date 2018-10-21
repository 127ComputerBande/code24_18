<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class Category
 *
 * @package App\Entity
 *
 * @ApiResource(
 *     attributes={
 *         "denormalization_context"={
 *             "groups"={
 *                 "category_write"
 *             }
 *         },
 *         "filters"={
 *
 *         },
 *         "normalization_context"={
 *             "groups"={
 *                 "category_read"
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
 *     repositoryClass="App\Repository\CategoryRepository"
 * )
 *
 * @ORM\Table(name="category")
 */
class Category
{
    /**
     * @var string The id of this category.
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     *
     * @Groups({
     *     "category_read",
     *     "category_write",
     * })
     */
    protected $id;

    /**
     * @var String
     *
     * @ORM\Column(type="string", nullable=true)
     *
     * @Groups({
     *     "category_read",
     *     "category_write",
     * })
     */
    protected $name;

    /**
     * @return String
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
     * @return Category
     */
    public function setName(String $name): Category
    {
        $this->name = $name;

        return $this;
    }
}