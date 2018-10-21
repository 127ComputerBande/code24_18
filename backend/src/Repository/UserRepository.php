<?php

namespace App\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * Class UserRepository
 *
 * @package App\Repository
 */
class UserRepository extends EntityRepository
{
    /**
     * @param $email
     * @return null|object
     */
    public function findByEMail($email)
    {
        return $this->findOneBy(['email' => $email]);
    }

    /**
     * @param $username
     * @return null|object
     */
    public function findByUsername($username)
    {
        return $this->findOneBy(['username' => $username]);
    }
}