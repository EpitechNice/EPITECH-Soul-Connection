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
    Prisma documentation: https://www.prisma.io/docs/getting-started
