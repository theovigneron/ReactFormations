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
import json

# This OAuth 2.0 access scope allows for full read/write access to the
# authenticated user's account and requires requests to use an SSL connection.
SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly']
API_SERVICE_NAME = 'sheet'
API_VERSION = 'v2'
SAMPLE_SPREADSHEET_ID = '1Ow2K1pECySsY_8W7NDElGnGKsMfcwlXacCr5cIEwZjI'

app = Flask(__name__)
CORS(app)

app.secret_key = '777deede7f7e'

@app.route('/trainings', methods = ["GET"])
def getTrainings():
    SAMPLE_RANGE_NAME = 'Liste!A2:F50'
    SAMPLE_RANGE_COLLUMN = 'Liste!A1:F'
    trainings = getRowValue(SAMPLE_RANGE_NAME, SAMPLE_RANGE_COLLUMN,SAMPLE_SPREADSHEET_ID)    
    for training in trainings:
        modules = []
        SAMPLE_RANGE_VALUE = 'Module!A2:F50'
        SAMPLE_RANGE_COLLUMN = 'Module!A1:F'
        SAMPLE_RANGE_VALUE_EX = 'Exercices!A2:F50'
        SAMPLE_RANGE_COLLUMN_EX = 'Exercices!A1:F'
        SAMPLE_RANGE_VALUE_CONTACT = 'Contact!A2:F50'
        SAMPLE_RANGE_COLLUMN_CONTACT = 'Contact!A1:F'
        modules = getRowValue(SAMPLE_RANGE_VALUE, SAMPLE_RANGE_COLLUMN, training["SheetId"])  
        exercices = getRowValue(SAMPLE_RANGE_VALUE_EX, SAMPLE_RANGE_COLLUMN_EX, training["SheetId"]) 
        contact = getRowValue(SAMPLE_RANGE_VALUE_CONTACT, SAMPLE_RANGE_COLLUMN_CONTACT, training["SheetId"]) 
        for exercice in exercices:
            for module in modules:
                if(module["Code"] == exercice["Code"]):
                    moduleSelected = module
            if "exercices" not in moduleSelected:
                moduleSelected["exercices"] = []
            moduleSelected["exercices"].append(exercice)
        training["modules"] = modules
        training["contact"] = contact[0]
    return trainings

@app.route('/pricings', methods = ["GET"])
def getPricings():
    SAMPLE_RANGE_NAME = 'Offres!A2:E50'
    SAMPLE_RANGE_COLLUMN = 'Offres!A1:E'
    return getRowValue(SAMPLE_RANGE_NAME, SAMPLE_RANGE_COLLUMN,SAMPLE_SPREADSHEET_ID)

def getRowValue(rangeRow, rangeCollumn, spreadId):
    creds = service_account.Credentials.from_service_account_file(
        'client_secret.json',
        scopes=['https://www.googleapis.com/auth/spreadsheets.readonly']
    )
    try:
        service = build('sheets', 'v4', credentials=creds)
        sheet = service.spreadsheets()
        sheetValues = sheet.values().get(spreadsheetId=spreadId, range=rangeRow).execute()
        columnName = sheet.values().get(spreadsheetId=spreadId, range=rangeCollumn).execute().get('values', [])[0]
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
        return result
    except HttpError as err:
        print(err)
        return []

@app.route('/mytrainings', methods = ["GET"])
def getMyTrainings():
    email = request.args.get('email')
    with open('database.json') as mon_fichier:
        database = json.load(mon_fichier)
    if email in database:
        return database[email]
    return []

@app.route('/mytrainings', methods = ["POST"])
def addTrainings():
    email = request.args.get('email')
    title = request.args.get('title')
    with open('database.json','r+') as file:
          # First we load existing data into a dict.
        file_data = json.load(file)
        # Join new_data with file_data inside emp_details
        file_data[email].append(title)
        # Sets file's current position at offset.
        file.seek(0)
        # convert back to json.
        json.dump(file_data, file, indent = 4)

if __name__ == '__main__':
  # When running locally, disable OAuthlib's HTTPs verification.
  # ACTION ITEM for developers:
  #     When running in production *do not* leave this option enabled.
  os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

  # Specify a hostname and port that are set as a valid redirect URI
  # for your API project in the Google API Console.
  app.run('localhost', 8080, debug=True)

