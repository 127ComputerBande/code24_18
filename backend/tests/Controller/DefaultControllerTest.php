<?php

namespace App\Tests\Controller\DefaultController;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/**
 * Class DefaultControllerTest
 *
 * @package App\Tests\Controller\DefaultController
 */
class DefaultControllerTest extends WebTestCase
{
    public function testFavicon()
    {
        $client       = static::createClient();
        $crawler      = $client->request('GET', '/');
        $matchedNodes = $crawler->filter('link[type="image/x-icon"]')->count();

        $this->assertGreaterThan(0, $matchedNodes);
    }
}