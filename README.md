# Event Bingo (Fun with Friends)

## Technology Used
- React
- Flask
- Ansible

## Deployment
First deploy the code with the ansible playbook; or just follow the steps in there.
For the script to run through successfully you will need to set the ansible variable `ANSIBLE_HOST_KEY_CHECKING=False` (This is a security risk).

After that run the following each in their own screen session.
- backend: `export APP_ENV=prod && python3 app.py`
- frontend: `serve -s build -l 3000`

## Ansible Collections
- community.aws
- community.general

### Notes
- If deploying on WSL you have to use an environment variable ```ANSIBLE_HOST_KEY_CHECKING=False``` instead of ansible.cfg. Has something to do with global write permissions.