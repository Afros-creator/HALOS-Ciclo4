# -*- coding: utf-8 -*-
"""
Created on Sun Oct 23 18:15:02 2022

@author: Andres Robles
"""

from flask import Flask
import os
from twilio.rest import Client
from flask import request
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

app=Flask(__name__) #Iniciando la clase Flask

@app.route('/')

def uno ():
    variable = os.environ.get("Prueba")
    return variable

@app.route('/sms')

def dos():
    
    try:
        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)
        contenido = request.args.get("mensaje")
        destino = request.args.get("telefono")
        message = client.messages \
                        .create(
                             body=contenido,
                             from_='+13854062978',
                             to=destino
                         )
        
        print(message.sid)
        return "El mensaje ha sido enviado exitosamente!"
    except Exception as e:
        return "No se pudo enviar el mensaje!"
        
    



@app.route('/e-mail')

def mail():
    
    destino = request.args.get("correo_destino")
    asunto = request.args.get("asunto")
    mensaje = request.args.get("contenido")


    message = Mail(
        from_email='grupo5misiontic2@gmail.com',
        to_emails=destino,
        subject=asunto,
        html_content=mensaje)
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return "Correo enviado exitosamente!"
    except Exception as e:
        print(e.message)
        return "Error, el correo no fue enviado"
        
        
if __name__=='__main__':
    app.run()   