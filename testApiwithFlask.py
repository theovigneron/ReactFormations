# -*- coding: utf-8 -*-

import os
from flask import Flask, request
import requests
from flask_cors import CORS
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# This variable specifies the name of a file that contains the OAuth 2.0
# information for this application, including its client_id and client_secret.
CLIENT_SECRETS_FILE = "creden.json"

# This OAuth 2.0 access scope allows for full read/write access to the
# authenticated user's account and requires requests to use an SSL connection.
SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly']
API_SERVICE_NAME = 'sheet'
API_VERSION = 'v2'
SAMPLE_SPREADSHEET_ID = '16_zQ_XO0aWGfhpnMokNinto8eOizKvnqJ4V7rSWLE5o'

app = Flask(__name__)
CORS(app)

app.secret_key = '777deede7f7e'


@app.route('/')
def index():
  return print_index_table()

@app.route('/trainings', methods = ["POST"])
def post_training():
    data = request.json
    SAMPLE_SPREADSHEET_ID = '16_zQ_XO0aWGfhpnMokNinto8eOizKvnqJ4V7rSWLE5o'
    SAMPLE_RANGE_NAME = 'Feuille 1!A3:E50'
    print(data)
    creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # pylint: disable=maybe-no-member
    try:
        service = build('sheets', 'v4', credentials=creds)

        values = [
            [
                
            ]
        ]
        values[0].append(getNewId())
        values[0].append(data["Nom"])
        values[0].append(data["Description"])
        values[0].append(data["Type"])
        body = {
            'values': values
        }
        result = service.spreadsheets().values().append(spreadsheetId=SAMPLE_SPREADSHEET_ID, range=SAMPLE_RANGE_NAME,valueInputOption="RAW", body=body).execute()
        print(f"{(result.get('updates').get('updatedCells'))} cells appended.")
        return data
    except HttpError as err:
        print(err)

@app.route('/trainings', methods = ["GET"])
def getTrainings():
    SAMPLE_RANGE_NAME = 'Feuille 1!A2:E50'
    SAMPLE_RANGE_COLLUMN = 'Feuille 1!A1:E'
    return getRowValue(SAMPLE_RANGE_NAME, SAMPLE_RANGE_COLLUMN)

@app.route('/maxId', methods = ["GET"])
def getNewId():
    SAMPLE_RANGE_NAME = 'Feuille 1!A1:A300'
    SAMPLE_RANGE_COLLUMN = 'Feuille 1!A1'
    res = getRowValue(SAMPLE_RANGE_NAME, SAMPLE_RANGE_COLLUMN)
    max = 0
    for val in res:
        if val["ID"].isdigit() and int(val["ID"])>max :  
            max = int(val["ID"])
    return str(max+1)


def getRowValue(rangeRow, rangeCollumn):
    print("coucou")
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    print(creds.valid)
    print(creds.expired)
    print(creds.refresh_token)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            print("if")
            creds.refresh(Request())
        else:
            print("else")
            flow = InstalledAppFlow.from_client_secrets_file(
                'creden.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    try:
        service = build('sheets', 'v4', credentials=creds)
        print(service)
        sheet = service.spreadsheets()
        result = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,range=rangeRow).execute()
        columnName = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,range=rangeCollumn).execute().get('values', [])[0]
        values = result.get('values', [])
        result = []
        if not values:
            print('No data found.')
            return
        for row in values:
            dict = {}
            print(row)
            for (index, elem) in enumerate(row):
                dict[columnName[index]] = elem
            result.append(dict)
        return result
    except HttpError as err:
        print(err)


if __name__ == '__main__':
  # When running locally, disable OAuthlib's HTTPs verification.
  # ACTION ITEM for developers:
  #     When running in production *do not* leave this option enabled.
  os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

  # Specify a hostname and port that are set as a valid redirect URI
  # for your API project in the Google API Console.
  app.run('localhost', 8080, debug=True)