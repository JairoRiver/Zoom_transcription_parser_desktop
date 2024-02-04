# Zoom Transcription Parser Desktop

El objetivo de este script es parsear la salida de las transcripciones de ZOOM a un formato más natural

El fichero de entrada está en formato "docx"

Estructura de la transcripción:

Cabecera (omitimos)

1 (Numeración del parafo, Omitir)

00:00:02.070 --> 00:00:25.769 (Marca de tiempo, duración del audio que se va a transcribir, Omitir)

Interlocutor_1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lectus nulla, tincidunt at mauris in, suscipit fringilla nisl. Morbi facilisis massa felis, id molestie velit pulvinar in. Nulla arcu arcu, luctus vitae elit a, fermentum convallis nisl. Integer dignissim elit metus, sit amet mattis purus iaculis a. Praesent rutrum euismod lectus, lobortis tincidunt magna rhoncus nec. (Transcripción, nos quedamos con esta parte)

Después de parsear el archivo nos quedaremos solo con el texto del interlocutor
