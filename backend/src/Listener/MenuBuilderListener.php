<?php

namespace App\Listener;

use Knp\Menu\ItemInterface;
use Sonata\AdminBundle\Event\ConfigureMenuEvent;
use Symfony\Component\Translation\TranslatorInterface;

/**
 * Class MenuBuilderListener
 *
 * @package App\Listener
 */
class MenuBuilderListener
{
    /**
     * @var string
     */
    protected $kernelEnvironment;

    /**
     * @var TranslatorInterface
     */
    protected $translator;

    /**
     * MenuBuilderListener constructor.
     *
     * @param string $kernelEnvironment
     * @param TranslatorInterface $translator
     */
    public function __construct($kernelEnvironment, TranslatorInterface $translator)
    {
        $this->kernelEnvironment = $kernelEnvironment;
        $this->translator        = $translator;
    }

    /**
     * @param ItemInterface $menu
     */
    protected function addLogoutButton(ItemInterface $menu)
    {
        $menu
            ->addChild('jumpLinks', [
                'label'           => $this->translator->trans('Logout', [], 'admin'),
                'uri'             => '/admin/logout',
                'label_catalogue' => 'admin',
            ])
            ->setAttribute('icon', '<i class="fa fa-sign-out"></i>')
            ->setExtras(['icon' => '<i class="fa fa-sign-out"></i>'])
        ;
        $menu
            ->addChild('apiLink', [
                'label'           => $this->translator->trans('API Documentation', [], 'admin'),
                'uri'             => '/api/doc',
                'label_catalogue' => 'api',
                'linkAttributes'  => ['target' => '_blank'],
            ])
            ->setAttribute('icon', '<i class="fa fa-book"></i>')
            ->setExtras(['icon' => '<i class="fa fa-book"></i>'])
        ;
    }

    /**
     * @param ConfigureMenuEvent $event
     */
    public function createMainMenu(ConfigureMenuEvent $event)
    {
        $menu = $event->getMenu();

        $this->addLogoutButton($menu);
    }
}