import os
import re

def empaquetar_proyecto(directorio_origen, archivo_salida):
    # Extensiones de texto permitidas. Ignora imágenes (.png, .jpg) para que el txt no sea gigante e ilegible
    extensiones_validas = ['.html', '.css', '.js', '.md', '.txt', '.json']
    
    with open(archivo_salida, 'w', encoding='utf-8') as salida:
        for raiz, directorios, archivos in os.walk(directorio_origen):
            # Evitar carpetas de sistema o control de versiones
            if '.git' in directorios:
                directorios.remove('.git')
            if '__pycache__' in directorios:
                directorios.remove('__pycache__')
            
            for archivo in archivos:
                if any(archivo.endswith(ext) for ext in extensiones_validas):
                    ruta_completa = os.path.join(raiz, archivo)
                    ruta_relativa = os.path.relpath(ruta_completa, directorio_origen)
                    
                    salida.write(f"=== INICIO ARCHIVO: {ruta_relativa} ===\n")
                    try:
                        with open(ruta_completa, 'r', encoding='utf-8') as f:
                            salida.write(f.read())
                    except Exception as e:
                        salida.write(f"// Error leyendo el archivo: {e}\n")
                    
                    # Añadir salto de línea al final para separar correctamente
                    salida.write(f"\n=== FIN ARCHIVO: {ruta_relativa} ===\n\n")
                    
    print(f"\n✅ Proyecto empaquetado con éxito en: {archivo_salida}")

def desempaquetar_proyecto(archivo_origen, directorio_destino):
    try:
        with open(archivo_origen, 'r', encoding='utf-8') as f:
            contenido = f.read()
    except FileNotFoundError:
        print(f"❌ No se encontró el archivo: {archivo_origen}")
        return
        
    # Expresión regular para encontrar los bloques de cada archivo
    patron = r"=== INICIO ARCHIVO: (.*?) ===\n(.*?)=== FIN ARCHIVO: \1 ==="
    coincidencias = re.finditer(patron, contenido, re.DOTALL)
    
    archivos_creados = 0
    for match in coincidencias:
        ruta_relativa = match.group(1).strip()
        contenido_archivo = match.group(2)
        
        # Eliminar el último salto de línea que se añade por formato
        if contenido_archivo.endswith('\n'):
            contenido_archivo = contenido_archivo[:-1]
            
        ruta_completa = os.path.join(directorio_destino, ruta_relativa)
        
        # Crear los directorios necesarios (css, jss, etc.)
        os.makedirs(os.path.dirname(ruta_completa), exist_ok=True)
        
        # Escribir el archivo
        with open(ruta_completa, 'w', encoding='utf-8') as f:
            f.write(contenido_archivo)
        
        archivos_creados += 1
        print(f"Creado: {ruta_relativa}")
        
    print(f"\n✅ Se desempaquetaron {archivos_creados} archivos en el directorio: '{directorio_destino}'")

if __name__ == '__main__':
    print("=========================================")
    print("📦 Empaquetador/Desempaquetador de Código")
    print("=========================================\n")
    print("1. Empaquetar proyecto (De múltiples archivos a un solo .txt)")
    print("2. Desempaquetar proyecto (De un .txt a múltiples archivos)\n")
    
    opcion = input("Elige una opción (1 o 2): ")
    
    if opcion == '1':
        origen = input("Ruta de la carpeta del proyecto (usa '.' para la carpeta actual): ")
        salida = input("Nombre del archivo de salida (ej: proyecto_empaquetado.txt): ")
        empaquetar_proyecto(origen, salida)
    elif opcion == '2':
        origen = input("Ruta del archivo .txt a leer: ")
        destino = input("Carpeta donde se extraerán los archivos (ej: ./proyecto_extraido): ")
        desempaquetar_proyecto(origen, destino)
    else:
        print("❌ Opción no válida.")