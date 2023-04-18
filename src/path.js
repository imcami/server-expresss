import {fileURLToPath} from 'url'
import { dirname } from 'path'

export const __filename = fileURLToPath(import.meta.url) //detecta el nombre del archivo ej "index.js"
export const __dirname = dirname(__filename) //en base a ese nombre devuelve el nombre de la carpeta