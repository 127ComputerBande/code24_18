# symfony-skeleton

* Install all dependencies with Composer(https://getcomposer.org/) ```composer install```
* Edit the parameters for database connection in the parameters.yml located in ```/config/packages/parameters.yml```
* Edit name in `bower.json` and `package.json`
* Edit Sonata Admin Title in `/config/packages/sonata_admin.yaml`
* Edit the title for api doc in ````/config/packages/nelmio_api_doc.yaml````
* Create the database ```sf doctrine:database:create && sf doctrine:schema:create```
* Load the fixtures ```sf hautelook:fixtures:load```
* Default-Login:  
Username: lulububu  
Password: lulububu
* Add your ```aws_access_key_id``` and ```aws_secret_access_key``` the aws config (.aws/config)
* Edit the elasticbeanstalk config (.elasticbeanstalk/config)
* Make sure you executed ```gulp build``` and committed your css files cause gulp is currently not running on pipelines (https://lulububu.atlassian.net/browse/SKELETONSYMFONY-23)

## git
### commit
If you commit using command line, do not use ````git````s ```-m``` option. It it not supported by the ```prepare-commit-message``` script.