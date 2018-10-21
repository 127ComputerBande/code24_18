<?php

namespace App\Form\Extension;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Form\AbstractTypeExtension;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Translation\TranslatorInterface;

/**
 * Class ChoiceTypeExtension
 *
 * @author Felix Bäder <felix@lulububu.de>
 * @package App\Form\Extension
 */
class ChoiceTypeExtension extends AbstractTypeExtension
{
    /**
     * @var ChoiceType
     */
    private $extendedType;

    /**
     * @var TranslatorInterface
     */
    private $translator;

    /**
     * @var $choiceTranslationDomain
     */
    private $choiceTranslationDomain;

    /**
     * ChoiceTypeExtension constructor.
     * @param ContainerInterface|null $container
     * @param string $extendedType
     */
    public function __construct(ContainerInterface $container = null, $extendedType = ChoiceType::class)
    {
        $this->translator   = $container->get('translator');
        $this->extendedType = $extendedType;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefined(['choice_translation_domain', 'sort_values']);
    }

    /**
     * @param FormView $view
     * @param FormInterface $form
     * @param array $options
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $this->choiceTranslationDomain = $options['choice_translation_domain'];

        if ($view->parent && null === $this->choiceTranslationDomain) {
            $this->choiceTranslationDomain = $view->vars['translation_domain'];
        }

        $sortValues = $options['sort_values'] ?? true;

        if ($sortValues) {
            // No check for empty needed for $view->vars['choices'] because form type for choices return at least an array
            uasort($view->vars['choices'], [$this, 'compareChoices']);
        }

        parent::buildView($view, $form, $options);
    }

    /**
     * @param $choiceLeft
     * @param $choiceRight
     * @return int
     */
    protected function compareChoices($choiceLeft, $choiceRight)
    {
        $choiceLeftLabel       = $choiceLeft->label;
        $choiceRightLabel      = $choiceRight->label;
        $choiceLeftTranslated  = strtolower($this->translator->trans($choiceLeftLabel, [], $this->choiceTranslationDomain));
        $choiceRightTranslated = strtolower($this->translator->trans($choiceRightLabel, [], $this->choiceTranslationDomain));

        return strnatcasecmp($choiceLeftTranslated, $choiceRightTranslated);
    }

    /**
     * {@inheritdoc}
     */
    public function getExtendedType()
    {
        return $this->extendedType;
    }
}