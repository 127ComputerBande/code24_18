<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class Video
 *
 * @package App\Entity
 *
 * @ApiResource(
 *     attributes={
 *         "denormalization_context"={
 *             "groups"={
 *                 "video_write",
 *             }
 *         },
 *         "filters"={
 *
 *         },
 *         "normalization_context"={
 *             "groups"={
 *                 "video_read",
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
 *     repositoryClass="App\Repository\VideoRepository"
 * )
 *
 * @ORM\Table(name="video")
 */
class Video
{
    /**
     * @var string The id of this video.
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     *
     * @Groups({
     *     "video_read",
     *     "video_write",
     * })
     */
    protected $id;

    /**
     * @var String
     *
     * @ORM\Column(type="string", nullable=false, unique=true)
     *
     * @Groups({
     *     "video_read",
     *     "video_write",
     * })
     */
    protected $url;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer", nullable=true)
     *
     * @Groups({
     *     "video_read",
     *     "video_write",
     * })
     */
    protected $priority;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer", nullable=true)
     *
     * @Groups({
     *     "video_read",
     *     "video_write",
     * })
     */
    protected $duration;

    /**
     * @var String
     *
     * @ORM\Column(type="string", nullable=true)
     *
     * @Groups({
     *     "video_read",
     *     "video_write",
     * })
     */
    protected $source;

    /**
     * @var Collection|Category[]
     *
     * @ORM\ManyToMany(targetEntity="Category")
     *
     * @Groups({
     *     "video_read",
     *     "video_write",
     * })
     */
    protected $categories;

    /**
     * @var String
     *
     * @ORM\Column(type="string", nullable=true)
     *
     * @Groups({
     *     "video_read",
     *     "video_write",
     * })
     */
    protected $title;

    /**
     * @var String
     *
     * @ORM\Column(type="text", nullable=true)
     *
     * @Groups({
     *     "video_read",
     *     "video_write",
     * })
     */
    protected $description;

    /**
     * @var String
     *
     * @ORM\Column(type="string", nullable=true)
     *
     * @Groups({
     *     "video_read",
     *     "video_write",
     * })
     */
    protected $thumbnail;

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
    public function getUrl(): ?String
    {
        return $this->url;
    }

    /**
     * @param String $url
     * @return Video
     */
    public function setUrl(String $url): Video
    {
        $this->url = $url;

        return $this;
    }

    /**
     * @return int
     */
    public function getPriority(): ?int
    {
        return $this->priority;
    }

    /**
     * @param int $priority
     * @return Video
     */
    public function setPriority(int $priority): Video
    {
        $this->priority = $priority;

        return $this;
    }

    /**
     * @return int
     */
    public function getDuration(): ?int
    {
        return $this->duration;
    }

    /**
     * @param int $duration
     * @return Video
     */
    public function setDuration(int $duration): Video
    {
        $this->duration = $duration;

        return $this;
    }

    /**
     * @return String
     */
    public function getSource(): ?String
    {
        return $this->source;
    }

    /**
     * @param String $source
     * @return Video
     */
    public function setSource(String $source): Video
    {
        $this->source = $source;

        return $this;
    }

    /**
     * @return Category[]|Collection
     */
    public function getCategories()
    {
        return $this->categories;
    }

    /**
     * @param Category[]|Collection $categories
     * @return Video
     */
    public function setCategories($categories)
    {
        $this->categories = $categories;

        return $this;
    }

    /**
     * @return String
     */
    public function getTitle(): ?String
    {
        return $this->title;
    }

    /**
     * @param String $title
     * @return Video
     */
    public function setTitle(?String $title): Video
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return String
     */
    public function getDescription(): ?String
    {
        return $this->description;
    }

    /**
     * @param String $description
     * @return Video
     */
    public function setDescription(?String $description): Video
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return String
     */
    public function getThumbnail(): ?String
    {
        return $this->thumbnail;
    }

    /**
     * @param String $thumbnail
     * @return Video
     */
    public function setThumbnail(String $thumbnail): Video
    {
        $this->thumbnail = $thumbnail;

        return $this;
    }
}