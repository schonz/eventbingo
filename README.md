# Event Bingo (Fun with Friends)

## Technology Used
- React
- Flask
- Ansible

## Deployment
First deploy the code with the ansible playbook; or just follow the steps in there.
After that run the following each in their own screen
- backend: `export APP_ENV=prod`
- backend: `python3 app.py`
- frontend: `serve -s build -l 3000`

## Ansible Collections
- community.aws
- community.general

### Notes
- If deploying on WSL you have to use an environment variable ```ANSIBLE_HOST_KEY_CHECKING=False``` instead of ansible.cfg. Has something to do with global write permissions.