<?php

/**
 * Created by PhpStorm.
 * User: Thomas Kekeisen <thomas@kekeisen.it>
 * Date: 18.08.17
 * Time: 11:16
 */

namespace App\Fixtures\Processor;

use Fidry\AliceDataFixtures\ProcessorInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Class FileUploadProcessor
 *
 * @author Thomas Kekeisen <thomas@kekeisen.it>
 * @package App\Fixtures\Processor
 */
final class FileUploadProcessor implements ProcessorInterface
{
    /**
     * All uploaded files are stored here to workaround some weird things.
     *
     * @var array Uploaded files
     */
    protected $files = [];

    /**
     * @param string $id
     * @param object $object
     */
    public function preProcess(string $id, $object): void
    {
        echo 'Preprocessing id: ' . $id . ' (Files in cache: ' . count($this->files) . ')' . "\n";

        foreach ($this->files as $file) {
            if (!file_exists($file['path'])) {
                file_put_contents($file['path'], $file['data']);

                echo 'Wrote missing file: ' . $file['path'] . ' (size: ' . filesize($file['path']) . ')' . "\n";
            } else {
                touch($file['path']);
            }
        }

        if (strlen($id) >= 5 && substr($id, 0, 5) == 'image') {
            /**
             * @var $imageFile UploadedFile
             */
            $imageFile = $object->getImageFile();
            $path = $imageFile->getRealPath();

            $this->files[] = [
                'path' => $path,
                'data' => file_get_contents($path)
            ];
        }
    }

    /**
     * @param string $id
     * @param object $object
     */
    public function postProcess(string $id, $object): void
    {

    }
}