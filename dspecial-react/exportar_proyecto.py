import os

def exportar_archivos():
    directorio_raiz = "."
    carpetas_ignoradas = {'node_modules', '.git', 'dist', 'build', '.vscode', 'coverage'}
    extensiones_texto = {'.jsx', '.js', '.css', '.html', '.json', '.md'}

    # Archivos de salida
    f_completo = open("proyecto_completo.txt", "w", encoding="utf-8")
    f_jsx = open("archivos_jsx.txt", "w", encoding="utf-8")
    f_css = open("archivos_css.txt", "w", encoding="utf-8")

    # Encabezados
    f_completo.write("=" * 80 + "\n COMPILACIÓN: TODO EL PROYECTO\n" + "=" * 80 + "\n\n")
    f_jsx.write("=" * 80 + "\n COMPILACIÓN: ARCHIVOS JSX / JS\n" + "=" * 80 + "\n\n")
    f_css.write("=" * 80 + "\n COMPILACIÓN: ARCHIVOS CSS\n" + "=" * 80 + "\n\n")

    cont_completo = cont_jsx = cont_css = 0

    for root, dirs, files in os.walk(directorio_raiz):
        # Excluir carpetas pesadas
        dirs[:] = [d for d in dirs if d not in carpetas_ignoradas]
        files.sort()

        for file in files:
            extension = os.path.splitext(file)[1].lower()
            
            # Ignorar binarios, imágenes, scripts python y archivos txt de salida
            if extension not in extensiones_texto or file.endswith('.py') or file.endswith('.txt'):
                continue

            ruta_completa = os.path.join(root, file)
            ruta_relativa = os.path.relpath(ruta_completa, directorio_raiz)

            try:
                with open(ruta_completa, 'r', encoding='utf-8') as infile:
                    contenido = infile.read()

                bloque = f"{'=' * 80}\nARCHIVO: {ruta_relativa}\n{'=' * 80}\n\n{contenido}\n\n{'-' * 80}\n\n"

                # 1. Guardar en el reporte completo
                f_completo.write(bloque)
                cont_completo += 1

                # 2. Guardar en el reporte JSX
                if extension in ['.jsx', '.js']:
                    f_jsx.write(bloque)
                    cont_jsx += 1

                # 3. Guardar en el reporte CSS
                elif extension == '.css':
                    f_css.write(bloque)
                    cont_css += 1

            except Exception as e:
                print(f"Saltando {ruta_relativa} por error de lectura: {e}")

    f_completo.close()
    f_jsx.close()
    f_css.close()

    print("✅ ¡Exportación completada!")
    print(f" 📄 'proyecto_completo.txt' -> {cont_completo} archivos (JSX, CSS, HTML, JSON, etc.)")
    print(f" ⚛️  'archivos_jsx.txt'       -> {cont_jsx} archivos JSX/JS")
    print(f" 🎨 'archivos_css.txt'       -> {cont_css} archivos CSS")

if __name__ == "__main__":
    exportar_archivos()