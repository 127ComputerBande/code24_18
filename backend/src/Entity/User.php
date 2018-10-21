<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class User
 *
 * @author Felix Bäder <felix@lulububu.de>
 * @package App\Entity
 *
 * @ApiResource(
 *     attributes={
 *         "denormalization_context"={
 *             "groups"={
 *                 "user_write"
 *             }
 *         },
 *         "filters"={
 *
 *         },
 *         "normalization_context"={
 *             "groups"={
 *                 "user_read"
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
 *     repositoryClass="App\Repository\UserRepository"
 * )
 *
 * @ORM\Table(name="user")
 */
class User extends BaseUser
{
    /**
     * @var string
     * @Assert\Email
     * @Groups({
     *     "user_read",
     *     "user_write",
     *     "user_self_read",
     *     "user_self_write"
     * })
     */
    protected $email;

    /**
     * @var string
     * @Groups({
     *     "user_write",
     * })
     */
    protected $plainPassword;

    /**
     * @var string
     * @Assert\NotBlank
     * @Groups({
     *     "user_read",
     *     "user_write",
     *     "user_self_read",
     *     "user_self_write"
     * })
     */
    protected $username;

    /**
     * @var string
     *
     * @Groups({
     *     "user_self_read"
     * })
     */
    protected $emailCanonical;

    /**
     * @var string The id of this user.
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     *
     * @Groups({
     *     "user_read"
     * })
     */
    protected $id;

    /**
     * @var string The name of this user.
     *
     * @ORM\Column(type="string", nullable=true)
     *
     * @Groups({
     *     "user_self_read",
     *     "user_self_write"
     * })
     */
    protected $name;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @Assert\DateTime()
     *
     * @Groups({
     *     "user_read",
     * })
     */
    protected $lastAction;

    /**
     * @var Collection
     *
     * @ORM\ManyToMany(targetEntity="Category")
     * )
     *
     * @Groups({
     *     "category_read",
     *     "category_write",
     *     "user_read",
     *     "user_write",
     * })
     */
    protected $categories;

    /**
     * User constructor.
     */
    public function __construct()
    {
        parent::__construct();

        $this->enabled    = true;
        $this->lastAction = new \DateTime();
    }

    /**
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param string $email
     * @return User
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @return string
     */
    public function getEmailCanonical()
    {
        return $this->emailCanonical;
    }

    /**
     * @param string $emailCanonical
     * @return User
     */
    public function setEmailCanonical($emailCanonical)
    {
        $this->emailCanonical = $emailCanonical;

        return $this;
    }

    /**
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param string $id
     * @return User
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return User
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return string
     */
    public function getPlainPassword()
    {
        return $this->plainPassword;
    }

    /**
     * @param string $plainPassword
     * @return User
     */
    public function setPlainPassword($plainPassword)
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    /**
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @param string $username
     * @return User
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getLastAction()
    {
        return $this->lastAction;
    }

    /**
     * @param \DateTime $lastAction
     * @return User
     */
    public function setLastAction(\DateTime $lastAction)
    {
        $this->lastAction = $lastAction;

        return $this;
    }

    /**
     * @return Collection
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    /**
     * @param Collection $categories
     * @return User
     */
    public function setCategories(Collection $categories): User
    {
        $this->categories = $categories;

        return $this;
    }
}