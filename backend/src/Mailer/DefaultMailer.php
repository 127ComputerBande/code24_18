<?php

namespace App\Mailer;

use RobertoTru\ToInlineStyleEmailBundle\Converter\ToInlineStyleEmailConverter;

/**
 * Class DefaultMailer
 *
 * @author Thomas Kekeisen <thomas@lulububu.de>
 * @package App\Mailer
 */
class DefaultMailer
{
    /**
     * @var $cssToInlineEmailConverter ToInlineStyleEmailConverter
     */
    protected $cssToInlineEmailConverter;

    /**
     * @var $swiftMailer \Swift_Mailer
     */
    protected $swiftMailer;

    /**
     * @var $swiftMailerTransport \Swift_Transport
     */
    protected $swiftMailerTransport;

    /**
     * @var $twig \Twig_Environment
     */
    protected $twig;

    /**
     * @var string
     */
    protected $defaultSenderMail;

    /**
     * @var string
     */
    protected $mailAssetUrl;

    /**
     * AppContextMailer constructor.
     * @param \Swift_Mailer $swiftMailer
     * @param \Twig_Environment $twig
     * @param ToInlineStyleEmailConverter $cssToInlineEmailConverter
     * @param \Swift_Transport $swiftMailerTransport
     * @param string $defaultSenderMail
     */
    public function __construct(
        \Swift_Mailer $swiftMailer,
        \Twig_Environment $twig,
        ToInlineStyleEmailConverter $cssToInlineEmailConverter,
        \Swift_Transport $swiftMailerTransport,
        $defaultSenderMail,
        $mailAssetUrl
    )
    {
        $this->defaultSenderMail         = $defaultSenderMail;
        $this->swiftMailer               = $swiftMailer;
        $this->twig                      = $twig;
        $this->cssToInlineEmailConverter = $cssToInlineEmailConverter;
        $this->swiftMailerTransport      = $swiftMailerTransport;
        $this->mailAssetUrl              = $mailAssetUrl;
    }

    /**
     * @param $toEmail
     * @param $template
     * @param array $context
     * @param bool $forceFlush
     * @return int
     * @throws \RobertoTru\ToInlineStyleEmailBundle\Converter\MissingParamException
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function sendMail($toEmail, $template, $context = [], $forceFlush = false)
    {
        $context['assetUrl'] = $this->mailAssetUrl;

        /**
         * @var \Twig_Template $template
         */
        $template = $this->twig->load($template);
        $subject  = $template->renderBlock('subject', $context);
        $bodyCss  = $template->renderBlock('bodyCss', $context);
        $bodyHtml = $template->renderBlock('bodyHtml', $context);
        $bodyText = $template->renderBlock('bodyText', $context);
        $charset  = 'UTF-8';

        $this->cssToInlineEmailConverter->setCSS($bodyCss);
        $this->cssToInlineEmailConverter->setHTML($bodyHtml);

        $convertedBodyHtml = $this->cssToInlineEmailConverter->generateStyledHTML();

        $message = new \Swift_Message();
        $message->setSubject($subject);
        $message->setFrom($this->defaultSenderMail);
        $message->setTo($toEmail);
        $message->setBody($convertedBodyHtml, 'text/html', $charset);
        $message->addPart($bodyText, 'text/plain', $charset);

        $successfulRecipients = $this->swiftMailer->send($message);

        if ($forceFlush) {
            $spool = $this->swiftMailer->getTransport()->getSpool();

            $spool->flushQueue($this->swiftMailerTransport);
        }

        return $successfulRecipients;
    }
}