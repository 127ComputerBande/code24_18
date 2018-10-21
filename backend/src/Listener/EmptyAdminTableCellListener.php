<?php

namespace App\Listener;

use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\Translation\TranslatorInterface;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;

/**
 * Class EmptyAdminTableCellListener
 *
 * @package App\Listener
 */
class EmptyAdminTableCellListener
{
    /**
     * @var TranslatorInterface
     */
    protected $translator;

    /**
     * EmptyAdminTabelCellsListener constructor.
     * @param TranslatorInterface $translator
     */
    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    /**
     * @param FilterResponseEvent $event
     */
    public function onKernelResponse(FilterResponseEvent $event)
    {
        $request = $event->getRequest();
        $path    = $request->getPathInfo();

        if (strpos($path, '/admin/') !== false) {
            $emptyText = $this->translator->trans('Not set', [], 'admin');
            $response  = $event->getResponse();

            if (!($response instanceof BinaryFileResponse) && !($response instanceof StreamedResponse)) {
                $content = $response->getContent();

                $content = preg_replace(
                    ';(<td[^>]*?>)(?:[\s]+?|)(?:&nbsp\;|)(?:[\s]+?|)(</td>);is',
                    sprintf('$1%s$2', $emptyText),
                    $content
                );

                $response->setContent($content);
            }
        }
    }
}