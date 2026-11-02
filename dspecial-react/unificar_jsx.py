import os

def consolidar_archivos_jsx(directorio_raiz=".", archivo_salida="codigo_completo.txt"):
    # Carpetas que se deben ignorar para no saturar el archivo
    carpetas_ignoradas = {'node_modules', '.git', 'dist', 'build', '.vscode'}
    
    archivos_procesados = 0

    with open(archivo_salida, 'w', encoding='utf-8') as outfile:
        outfile.write("==================================================================\n")
        outfile.write(" COMPILACIÓN DE CÓDIGO REACT (.JSX)\n")
        outfile.write("==================================================================\n\n")

        # Recorrer todo el árbol de carpetas
        for root, dirs, files in os.walk(directorio_raiz):
            # Excluir carpetas no deseadas
            dirs[:] = [d for d in dirs if d not in carpetas_ignoradas]
            
            # Ordenar para mantener un orden limpio por carpetas
            files.sort()
            
            for file in files:
                if file.endswith('.jsx'):
                    ruta_completa = os.path.join(root, file)
                    ruta_relativa = os.path.relpath(ruta_completa, directorio_raiz)

                    # Encabezado visual para cada archivo
                    outfile.write("=" * 80 + "\n")
                    outfile.write(f"ARCHIVO: {ruta_relativa}\n")
                    outfile.write("=" * 80 + "\n\n")

                    try:
                        with open(ruta_completa, 'r', encoding='utf-8') as infile:
                            outfile.write(infile.read())
                            outfile.write("\n\n" + "-" * 80 + "\n\n")
                            archivos_procesados += 1
                    except Exception as e:
                        outfile.write(f"[ERROR AL LEER EL ARCHIVO: {e}]\n\n")

    print(f"¡Proceso finalizado! Se unificaron {archivos_procesados} archivos .jsx en '{archivo_salida}'.")

if __name__ == '__main__':
    consolidar_archivos_jsx()