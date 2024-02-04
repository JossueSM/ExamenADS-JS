import psycopg2
from psycopg2 import Binary
from tkinter import Tk, filedialog

# Función para cargar la imagen
def cargar_imagen():
    # Crear una ventana de Tkinter

    root = Tk()
    root.withdraw()  # Ocultar la ventana principal

    # Abrir el cuadro de diálogo del explorador de archivos para seleccionar la imagen
    file_path = filedialog.askopenfilename()

    if file_path:
        # Conectarse a la base de datos
        conn = psycopg2.connect(
            dbname="tienda",
            user="postgres",
            password="1234",
            host="localhost"
        )
        cursor = conn.cursor()

        # Leer la imagen desde el archivo
        with open(file_path, 'rb') as file:
            image_binary = file.read()
        id = input("codigoproducto:")
        nombre = input("nombreproducto:")
        descripcion = input("descripcionproducto:")
        precio = float(input("precioproducto:"))
        print("Elija el tipo de productor:\n"
              "1.- Minorista\n"
              "2.- Mayorista\n")

        while True:
            opcion = int(input("Opción: "))
            if opcion ==1:
                productor="minorista"
                break
            elif opcion==2:
                productor = "mayorista"
                break
        print("Elija el tipo de origen:\n"
              "1.- Local\n"
              "2.- Importado\n")
        while True:
            opcion = int(input("Opción: "))
            if opcion == 1:
                origen = "local"
                break
            elif opcion == 2:
                origen = "importado"
                break

        # Insertar la imagen en la tabla

        cursor.execute("INSERT INTO producto (id, nombre_producto, descripcion, precio, productor, origen, imagen ) VALUES (%s, %s,%s,%s,%s,%s,%s);", (id,nombre,descripcion,precio,productor,origen, Binary(image_binary)))
        conn.commit()

        # Cerrar la conexión
        cursor.close()
        conn.close()

# Llamar a la función para cargar la imagen
cargar_imagen()
