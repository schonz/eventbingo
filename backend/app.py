from flask import Flask, request
from flask_cors import CORS
import json
import os


RULES = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G',
    7: 'H',
    8: 'I',
    9: 'J'
}
RULE_ID = len(RULES)

app = Flask(__name__)
cors = CORS(app) #, resources={r"/api/*": {"origins": "*"}})


def addRule(text):
    global RULE_ID, RULES

    ruleID = RULE_ID
    RULES[ruleID] = text
    RULE_ID += 1

    return ruleID


def removeRule(id):
    global RULES
    del RULES[id]


@app.route('/')
def test_server():
    return "Hello World"


@app.route('/api/all_rules')
def api_allRules():
    global RULES
    ruleList = []

    for id in RULES:
        ruleList.append(json.loads('{{"id":"{0}", "text":"{1}"}}'.format(id, RULES[id].replace('"', '\\"'))))
    #j = json.load()
    jarules = json.dumps(ruleList)
    return jarules


@app.route('/api/add_rule', methods=['POST'])
def api_addRule():
    text = request.json['text']
    ruleID = addRule(text)
    return str(ruleID)


@app.route('/api/remove_rule', methods=['DELETE'])
def api_removeRule():
    global RULES
    id = request.json['id']
    del RULES[id]


if __name__ == '__main__':
    ENV = os.environ.get('APP_ENV').lower()

    # Check which Env we're running in
    if ENV == 'prod':
        app.run(host='0.0.0.0', debug=False)
    else:
        app.run(debug=True)
