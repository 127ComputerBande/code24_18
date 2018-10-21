<?php

/**
 * Created by PhpStorm.
 * User: Thomas Kekeisen <thomas@kekeisen.it>
 * Date: 18.08.17
 * Time: 11:16
 */

namespace App\Fixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Nelmio\Alice\Fixtures;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\File\MimeType\MimeTypeGuesser;

/**
 * Class UploadFaker
 *
 * @author Thomas Kekeisen <thomas@kekeisen.it>
 * @package App\Fixtures\ORM
 */
class UploadFaker implements FixtureInterface
{
    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        Fixtures::load(
            [
                __DIR__ . '/fixtures.yml',
            ],
            $manager,
            [
                'providers' => [$this],
            ]
        );
    }

    /**
     * Generate a fake UploadedFile
     *
     * This method works for all upload based on Doctrine events
     */
    public function upload($filename)
    {
        if (is_array($filename)) {
            $filename = \Faker\Provider\Base::randomElement($filename);
        }

        $filename = str_replace('_IMAGE_', rand(1, 5), $filename);
        $path     = sprintf('%s/%s', sys_get_temp_dir(), uniqid());
        $copy     = copy($filename, $path);

        if (!$copy) {
            throw new \Exception('Copy failed');
        }

        $mimeType = MimeTypeGuesser::getInstance()->guess($path);
        $size     = filesize($path);
        $file     = new UploadedFile($path, $filename, $mimeType, $size, null, true);

        return $file;
    }
}