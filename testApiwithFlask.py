# -*- coding: utf-8 -*-

import os
import flask
import requests

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

app = flask.Flask(__name__)
# Note: A secret key is included in the sample so that it works.
# If you use this code in your application, replace this with a truly secret
# key. See https://flask.palletsprojects.com/quickstart/#sessions.
app.secret_key = '777deede7f7e'


@app.route('/')
def index():
  return print_index_table()

@app.route('/trainings', methods = ["POST"])
def post_training():
   data = requests.form
   return data


@app.route('/trainings', methods = ["GET"])
def test_api_request():
  # The ID and range of a sample spreadsheet.
  SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

  # The ID and range of a sample spreadsheet.
  SAMPLE_SPREADSHEET_ID = '16_zQ_XO0aWGfhpnMokNinto8eOizKvnqJ4V7rSWLE5o'
  SAMPLE_RANGE_NAME = 'Feuille 1!A2:E50'
  SAMPLE_RANGE_COLLUMN = 'Feuille 1!A1:E'
  creds = None
  # The file token.json stores the user's access and refresh tokens, and is
  # created automatically when the authorization flow completes for the first
  # time.
  if os.path.exists('token.json'):
      creds = Credentials.from_authorized_user_file('token.json', SCOPES)
  # If there are no (valid) credentials available, let the user log in.
  if not creds or not creds.valid:
      if creds and creds.expired and creds.refresh_token:
          creds.refresh(Request())
      else:
          flow = InstalledAppFlow.from_client_secrets_file(
              'creden.json', SCOPES)
          creds = flow.run_local_server(port=0)
      # Save the credentials for the next run
      with open('token.json', 'w') as token:
          token.write(creds.to_json())
  try:
      service = build('sheets', 'v4', credentials=creds)

      # Call the Sheets API
      sheet = service.spreadsheets()
      result = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,range=SAMPLE_RANGE_NAME).execute()
      columnName = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,range=SAMPLE_RANGE_COLLUMN).execute().get('values', [])[0]
      values = result.get('values', [])
      result = []
      if not values:
          print('No data found.')
          return

      print('Name, Major:')
      for row in values:
          dict = {}
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