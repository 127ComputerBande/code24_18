<?php

namespace App\Command;

use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Filesystem\Filesystem;
use Stringy\Stringy as S;

/**
 * Class ReloadFixturesCommand
 *
 * @package App\Command
 */
class ReloadFixturesCommand extends ContainerAwareCommand
{
    const DATABASE_WHITELIST = [
        'localhost',
        '127.0.0.1',
        '192.168.*',
        '*.dev',
    ];

    /**
     *
     */
    protected function configure()
    {
        $this
            ->setName('app:fixtures:reload')
            ->setDescription('Drops and creates the database schema and then loads the fixtures.')
            ->addOption(
                'force',
                'f',
                InputOption::VALUE_OPTIONAL,
                'If set, the command is executed even in production mode',
                false
            )
            ->addOption(
                'i-am-not-milos-and-i-know-what-i-am-doing',
                null,
                InputOption::VALUE_OPTIONAL,
                'If set, the command is executed even on a production database',
                false
            )
        ;
    }

    /**
     * Loads the fixtures.
     *
     * @param Application $application
     * @param OutputInterface $output
     * @throws \Exception
     */
    protected function loadFixtures(Application $application, OutputInterface $output)
    {
        $output->writeln('Loading fixtures');

        $loadFixturesInput = new ArrayInput([
            'command'          => 'hautelook:fixtures:load',
            '--no-interaction' => 'true',
            '--verbose'        => '3',
        ]);

        $application->run($loadFixturesInput, $output);
    }

    /**
     * Recreates the database.
     *
     * @param Application $application
     * @param OutputInterface $output
     * @throws \Exception
     */
    protected function recreateDatabase(Application $application, OutputInterface $output)
    {
        $output->writeln('Recreating database');

        $recreateDatabaseInput = new ArrayInput([
            'command' => 'doctrine:schema:recreate',
        ]);

        $application->run($recreateDatabaseInput, $output);
    }

    /**
     * This function stops the script in production mode if no "--force" option is found
     *
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return bool
     */
    protected function isAllowedToRun(InputInterface $input, OutputInterface $output)
    {
        $container    = $this->getContainer();
        $environment  = $container->get('kernel')->getEnvironment();
        $databaseHost = S::create($container->getParameter('database_host'));
        $forced       = $input->getOption('force') !== false;

        if ($environment == 'prod' && !$forced) {
            $output->writeln('Warning: You are on the prod environment, use --force to load the fixtures.');

            return false;
        }

        $notMilos    = $input->getOption('i-am-not-milos-and-i-know-what-i-am-doing') !== false;
        $whitelisted = $this->checkIfDatabaseIsWhitelisted($databaseHost);

        if (!$notMilos && !$whitelisted) {
            $output->writeln('Warning: You are trying to rebuild a production database, use --i-am-not-milos-and-i-know-what-i-am-doing to do it anyway.');

            return false;
        }

        return true;
    }

    /**
     *
     * Just a debug command to recreate the database schema.
     *
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return int|null|void
     * @throws \Exception
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        ini_set('memory_limit', '-1');

        if ($this->isAllowedToRun($input, $output)) {
            $fs = new Filesystem();
            $fs->remove('web/uploads');

            $container     = $this->getContainer();
            $kernel        = $container->get('kernel');
            $entityManager = $container->get('doctrine.orm.default_entity_manager');

            // $metadata = $entityManager->getClassMetaData(App::class);
            // $metadata->setIdGeneratorType(\Doctrine\ORM\Mapping\ClassMetadata::GENERATOR_TYPE_NONE);
            // $metadata->setIdGenerator(new \Doctrine\ORM\Id\AssignedGenerator());

            $application = new Application($kernel);
            $application->setAutoExit(false);

            $this->recreateDatabase($application, $output);
            $this->loadFixtures($application, $output);

            $output->writeln('done.');
        }
    }

    /**
     * @param string $databaseName
     * @return bool
     */
    private function checkIfDatabaseIsWhitelisted($databaseName)
    {
        foreach (self::DATABASE_WHITELIST as $whitelistItem) {
            $formattedWhitelistItem = str_replace('*', '', $whitelistItem);
            $stringyWhitelistItem   = S::create($whitelistItem);

            if (
                (
                    $stringyWhitelistItem->endsWith('*') &&
                    $databaseName->startsWith($formattedWhitelistItem)
                ) ||
                (
                    $stringyWhitelistItem->startsWith('*') &&
                    $databaseName->endsWith($formattedWhitelistItem)
                ) ||
                (
                    $databaseName == $formattedWhitelistItem
                )
            ) {
                return true;
            }
        }

        return false;
    }
}