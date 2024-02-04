// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use docx_rust::document::Paragraph;
use docx_rust::Docx;
use docx_rust::DocxFile;
use regex::Regex;
use std::path::Path;

#[tauri::command(rename_all = "snake_case", async)]
fn parser_file(path_file: String) -> String {
    let (folder_path, document_name) = extract_folder_and_name(path_file.as_str());

    let docx = DocxFile::from_file(path_file).unwrap();
    let docx = docx.parse().unwrap();

    let binding = docx.document.body.text();
    let parts = binding.split("\n");

    let mut docx_new = Docx::default();
    for part in parts {
        if is_int(part.trim()) {
            continue;
        }
        if is_time_format(part.trim()) {
            continue;
        }
        if part.len() > 0 {
            let para = Paragraph::default().push_text(part);
            docx_new.document.push(para);
        }
    }

    let output_file_name = document_name + "_output.docx";
    let exit_path = Path::new(&folder_path.to_string()).join(output_file_name.clone());
    docx_new.write_file(exit_path).unwrap();

    output_file_name.into()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![parser_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn extract_folder_and_name(file_path: &str) -> (String, String) {
    // Convertir la ruta de cadena a un Path
    let path = Path::new(file_path);

    // Obtener el nombre del documento sin extensión
    let document_name = path
        .file_stem()
        .and_then(|os_str| os_str.to_str())
        .map(|s| s.to_string())
        .unwrap_or_else(|| String::new());

    // Obtener la carpeta del documento
    let folder_path = path
        .parent()
        .and_then(|p| p.to_str())
        .map(|s| s.to_string())
        .unwrap_or_else(|| String::new());

    (folder_path, document_name)
}

fn is_int(cadena: &str) -> bool {
    let regex = Regex::new(r"^[+-]?\d+$").unwrap();

    // Utiliza regex.is_match para verificar si la cadena coincide con el patrón
    regex.is_match(cadena)
}

fn is_time_format(cadena: &str) -> bool {
    // Define el patrón de expresión regular para el formato de tiempo
    let time_pattern = r"^\d{2}:\d{2}:\d{2}.\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}.\d{3}$";

    // Compila el patrón regex
    let regex = Regex::new(time_pattern).unwrap();

    // Utiliza regex.is_match para verificar si la cadena coincide con el patrón
    regex.is_match(cadena)
}
