 _____             _   _____                             _   _
/  ___|           | | /  __ \                           | | (_)
\ `--.  ___  _   _| | | /  \/ ___  _ __  _ __   ___  ___| |_ _  ___  _ __
 `--. \/ _ \| | | | | | |    / _ \| '_ \| '_ \ / _ \/ __| __| |/ _ \| '_ \
/\__/ / (_) | |_| | | | \__/\ (_) | | | | | | |  __/ (__| |_| | (_) | | | |
\____/ \___/ \__,_|_|  \____/\___/|_| |_|_| |_|\___|\___|\__|_|\___/|_| |_|


0x01
    To get the IP of a container, run :
    docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' CONTAINER_ID/NAME
    Replace CONTAINER_ID/NAME by the name / id of your container (you can get
    it with "docker ps -a")
    Note: use sudo if you're user ain't part of the docker group

0x02
    For now, in the "backend" directory, I'me making a "RemoteAPI" directory
    containing NodeJS / JS files building Objects, requests and stuff in order
    to retreive the remote db and store it in a "more convinient way".
    - Tech0ne 2/09/24 14:33

0x03
    Sequelize documentation: https://sequelize.org/docs/v6/getting-started/

0x04
    Due to a previous mistake shown to us by GitHub, we decided to move our
    environement variables from an uncrypted build_env bash script, to a fully
    encrypted Python software, using AES to read and edit the environement
    variables.
    In the same time, it let's us automaticly replace content of a variable
    with previous defined variables.
    These are located under the name `./script/edit_env.py` and
    `./script/read_env.py`.
    Please run `./script/read_env.py` in order to read the environement.