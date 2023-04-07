import requests

def get_tokens(client_id, client_secret, redirect_uri, authorization_code):
    token_url = "https://oauth2.googleapis.com/token"
    payload = {
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": redirect_uri,
        "code": authorization_code,
        "grant_type": "authorization_code"
    }

    response = requests.post(token_url, data=payload)

    if response.status_code == 200:
        tokens = response.json()
        access_token = tokens['access_token']
        refresh_token = tokens['refresh_token']
        return access_token, refresh_token
    else:
        print("Erreur lors de la récupération des tokens :", response.status_code)
        print(response.text)
        return None, None

# Remplacez les valeurs ci-dessous par vos propres informations
client_id = "790241858145-eoqa2f9jgu1bs68t4tfiaikvso28q2ot.apps.googleusercontent.com"
client_secret = "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"
redirect_uri = "http://localhost:8080"
authorization_code = "4/0AVHEtk6EL5mgf1oFrBtt3JlSHRvD9S_ssz65sDDH_qF7BcbqqVmxLaSxS2M4RZfSBwuklA"

access_token, refresh_token = get_tokens(client_id, client_secret, redirect_uri, authorization_code)

if access_token and refresh_token:
    print("Access token:", access_token)
    print("Refresh token:", refresh_token)