<?php

/**
 * Created by PhpStorm.
 * User: Thomas Kekeisen <thomas@kekeisen.it>
 * Date: 27.09.17
 * Time: 09:10
 */

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Knp\DoctrineBehaviors\Model as ORMBehaviors;

/**
 * Class Image
 *
 * @author Thomas Kekeisen <thomas@kekeisen.it>
 * @package App\Entity
 *
 * @ORM\Entity(
 *     repositoryClass="App\Repository\ImageRepository"
 * )
 *
 * @ORM\Table(name="image")
 *
 * @Vich\Uploadable
 */
class Image
{
    use ORMBehaviors\Blameable\Blameable,
        ORMBehaviors\Timestampable\Timestampable;

    /**
     * @var string The id of this image.
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    protected $id;

    /**
     * NOTE: This is not a mapped field of entity metadata, just a simple property.
     *
     * @Vich\UploadableField(mapping="uploaded_image", fileNameProperty="imageName")
     *
     * @var File
     */
    protected $imageFile;

    /**
     * The internal image name.
     *
     * @ORM\Column(type="string", length=255, nullable=true)
     *
     * @var string
     * @Groups({
     *     "poi_read",
     * })
     */
    protected $imageName;

    /**
     * The absolute image path on the server (e.g. "/uploads/foo.jpg" or "https://s3.eu-central-1.amazonaws.com/foo/foo.jpg")
     *
     * @ORM\Column(type="string", length=255, nullable=true)
     *
     * @var string
     * @Groups({
     *     "poi_read",
     * })
     */
    protected $imagePath;

    /**
     * @return string
     */
    public function __toString()
    {
        $imageName = $this->getImageName();

        if ($imageName) {
            return $imageName;
        }

        return '';
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     * @return Image
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * If manually uploading a file (i.e. not using Symfony Form) ensure an instance
     * of 'UploadedFile' is injected into this setter to trigger the  update. If this
     * bundle's configuration parameter 'inject_on_load' is set to 'true' this setter
     * must be able to accept an instance of 'File' as the bundle will inject one here
     * during Doctrine hydration.
     *
     * @param File|\Symfony\Component\HttpFoundation\File\UploadedFile $image
     *
     * @return Image
     */
    public function setImageFile(File $image = null)
    {
        $this->imageFile = $image;

        if ($image) {
            // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
            $this->setUpdatedAt(new \DateTime());
        }

        return $this;
    }

    /**
     * @return File|null
     */
    public function getImageFile()
    {
        return $this->imageFile;
    }

    /**
     * @param string $imageName
     *
     * @return Image
     */
    public function setImageName($imageName)
    {
        $this->imageName = $imageName;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getImageName()
    {
        return $this->imageName;
    }

    /**
     * @param bool $addIfPathNotAbsolute
     * @return string
     */
    public function getImagePath($addIfPathNotAbsolute = false)
    {
        $imagePath = $this->imagePath;

        if ($addIfPathNotAbsolute && strpos($imagePath, 'http') === false) {
            $imagePath = $addIfPathNotAbsolute . $imagePath;
        }

        return $imagePath;
    }

    /**
     * @param string $imagePath
     * @return Image
     */
    public function setImagePath($imagePath)
    {
        $this->imagePath = $imagePath;

        return $this;
    }
}