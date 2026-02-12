# config.py

import mysql.connector
from mysql.connector import Error

def get_connection():
    try:
        connection = mysql.connector.connect(
            host='127.127.126.26',  # без порта
            user='root',
            password='',
            database='chirpdb'
        )
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Ошибка подключения: {e}")
        return None