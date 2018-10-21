<?php

namespace App\Command;

use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\ArrayInput;

/**
 * Class RecreateSchemaCommand
 *
 * @author Felix Bäder <felix@lulububu.de>
 * @package App\Command
 */
class RecreateSchemaCommand extends ContainerAwareCommand
{
    /**
     *
     */
    protected function configure()
    {
        $this
            ->setName('doctrine:schema:recreate')
            ->setDescription('Drops and creates the database schema in one task.')
            ->addOption(
                'force',
                'f',
                InputOption::VALUE_OPTIONAL,
                'If set, the command is executed even in production mode',
                false
            )
        ;
    }

    /**
     * Creates a new and clean database.
     *
     * @param Application $application
     * @param OutputInterface $output
     * @throws \Exception
     */
    protected function createDatabase(Application $application, OutputInterface $output)
    {
        $output->writeln('Creating database');

        $createDatabaseInput = new ArrayInput([
            'command' => 'doctrine:schema:create',
        ]);

        $application->run($createDatabaseInput, $output);
    }

    /**
     * Drops the database.
     *
     * @param Application $application
     * @param OutputInterface $output
     * @throws \Exception
     */
    protected function dropDatabase(Application $application, OutputInterface $output)
    {
        $output->writeln('Dropping database');

        $dropDatabaseInput = new ArrayInput([
            'command' => 'doctrine:schema:drop',
            '--force' => true,
        ]);

        $application->run($dropDatabaseInput, $output);
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
        $environment = $this->getContainer()->get('kernel')->getEnvironment();
        $forced      = $input->getOption('force') !== false;

        if ($environment == 'prod' && !$forced) {
            $output->writeln('Warning: You are on the prod environment, use --force to recreate the database.');

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
        if ($this->isAllowedToRun($input, $output)) {
            $container   = $this->getContainer();
            $kernel      = $container->get('kernel');
            $application = new Application($kernel);

            $application->setAutoExit(false);
            $this->dropDatabase($application, $output);
            $this->createDatabase($application, $output);

            $output->writeln('done.');
        }
    }
}