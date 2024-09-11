 _____             _   _____                             _   _
/  ___|           | | /  __ \                           | | (_)
\ `--.  ___  _   _| | | /  \/ ___  _ __  _ __   ___  ___| |_ _  ___  _ __
 `--. \/ _ \| | | | | | |    / _ \| '_ \| '_ \ / _ \/ __| __| |/ _ \| '_ \
/\__/ / (_) | |_| | | | \__/\ (_) | | | | | | |  __/ (__| |_| | (_) | | | |
\____/ \___/ \__,_|_|  \____/\___/|_| |_|_| |_|\___|\___|\__|_|\___/|_| |_|


0x01
    To get the IP of a container, run :
    docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' CONTAINER_ID/NAME
    Replace CONTAINER_ID/NAME by the name / id of your container (you can get it with "docker ps -a")
    Note: use sudo if you're user ain't part of the docker group

0x02
    For now, in the "backend" directory, I'me making a "RemoteAPI" directory containing NodeJS / JS files building Objects, requests and stuff
    in order to retreive the remote db and store it in a "more convinient way".
    - Tech0ne 2/09/24 14:33

0x03
    Sequelize documentation: https://sequelize.org/docs/v6/getting-started/

0x04: Environement

0x05: How to use
    The aim is to make the deployment as easy as possible.
    This is achieved using bash and docker.
    Make sure you have docker installed, as well as the compose plugin.
    To start the main compose (DB, backend and frontend), simply run `./run`
    This might ask you for your sudo password (if you are not part of the docker group),
    but will mostly ask you for a "Password: ".
    This is used to build environement variables (see 0x04).
    This password can be found on the discord server. (You can also set it as an environement variable :
        export ENV_PASSWORD=[PASSWORD]
    to add it automaticly.)
    It will then run everything.
    To fetch remote DB, run `./fetch`.
    To add a password to a user, run `./add_user [email] [password]`.