<?php

namespace App\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

/**
 * Class RunTestsCommand
 *
 * @author Felix Bäder <felix@lulububu.de>
 * @author Thomas Kekeisen <thomas@lulububu.de>
 * @package App\Command
 */
class RunTestsCommand extends ContainerAwareCommand
{
    /**
     *
     */
    protected function configure()
    {
        $this
            ->setName('app:tests:run')
            ->setDescription('Executes all tests')
            ->addOption(
                'suite',
                's',
                InputOption::VALUE_OPTIONAL,
                'If set, only the give test suite is started',
                null
            )
        ;
    }

    /**
     * @param Application $application
     * @param OutputInterface $output
     * @param $suite
     */
    protected function runTests(Application $application, OutputInterface $output, $suite)
    {
        $output->writeln('Running Tests' . ($suite ? ' for suite: ' . $suite : ''));

        $command = ($suite ?
            sprintf('./vendor/bin/simple-phpunit --testsuite %s', $suite) :
            './vendor/bin/simple-phpunit'
        );

        $output->writeln('Running tests. If you want a faster output, please start the tests directly: <fg=green>' . $command . '</>');

        $process = new Process($command, null, null, null, null);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        echo $process->getOutput();
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return int|null|void
     * @throws \Exception
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        ini_set('memory_limit', '-1');
        set_time_limit(0);

        $container   = $this->getContainer();
        $kernel      = $container->get('kernel');
        $application = new Application($kernel);
        $suite       = $input->getOption('suite');

        $application->setAutoExit(false);

        $this->runTests($application, $output, $suite);

        $output->writeln('done.');
    }
}