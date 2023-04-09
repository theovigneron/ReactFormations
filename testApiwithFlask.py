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
from google.oauth2 import service_account


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
    creds = service_account.Credentials.from_service_account_file(
        'client_secret.json',
        scopes=['https://www.googleapis.com/auth/spreadsheets']
    )
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
    creds = service_account.Credentials.from_service_account_file(
        'client_secret.json',
        scopes=['https://www.googleapis.com/auth/spreadsheets.readonly']
    )
    try:
        service = build('sheets', 'v4', credentials=creds)
        sheet = service.spreadsheets()
        sheetValues = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,range=rangeRow).execute()
        columnName = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,range=rangeCollumn).execute().get('values', [])[0]
        values = sheetValues.get('values', [])
        result = []
        if not values:
            print('No data found.')
            return
        for row in values:
            dict = {}
            for (index, elem) in enumerate(row):
                dict[columnName[index]] = elem
            result.append(dict)
        for rowresult in result:
            SAMPLE_RANGE_NAME = 'Programme'+rowresult['ID']+'!A2:E50'
            SAMPLE_RANGE_COLLUMN = 'Programme'+rowresult['ID']+'!A1:E'
            sheetValues = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,range=SAMPLE_RANGE_NAME).execute()
            modulesColumnName = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,range=SAMPLE_RANGE_COLLUMN).execute().get('values', [])[0]
            modulesValues = sheetValues.get('values', [])
            rowresult['module'] = []
            module = {}
            for row in modulesValues:
                for (index, elem) in enumerate(row):
                    module[modulesColumnName[index]] = elem
                SAMPLE_RANGE_NAME = 'P'+rowresult['ID']+'M'+module['ID']+'!A2:E50'
                SAMPLE_RANGE_COLLUMN = 'P'+rowresult['ID']+'M'+module['ID']+'!A1:E'
              
                exercicesValues = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,range=SAMPLE_RANGE_NAME).execute().get('values', [])
                exercicesColumnName = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,range=SAMPLE_RANGE_COLLUMN).execute().get('values', [])[0]  
                module['exercices'] = []

                for rowExercice in exercicesValues:
                    exercice = {}
                    for (indexExercice, elemExercice) in enumerate(rowExercice):
                        exercice[exercicesColumnName[indexExercice]] = elemExercice
                    module['exercices'].append(exercice)
                rowresult['module'].append(module)
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