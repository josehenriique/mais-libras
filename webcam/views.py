from django.http import StreamingHttpResponse
from django.shortcuts import render
import mediapipe as mp
import cv2, base64, json

# Inicializar a câmera
camera = cv2.VideoCapture(0)

# Recognizer Function
model_path = 'webcam/tcc_info_2025.task'

# Configurações do modelo de reconhecimento
BaseOptions = mp.tasks.BaseOptions
GestureRecognizer = mp.tasks.vision.GestureRecognizer
GestureRecognizerOptions = mp.tasks.vision.GestureRecognizerOptions
VisionRunningMode = mp.tasks.vision.RunningMode
  
options = GestureRecognizerOptions(
    base_options=BaseOptions(model_asset_path=model_path),
    running_mode=VisionRunningMode.VIDEO)


def recognizer_frames():

  timestamp  = 0
  with GestureRecognizer.create_from_options(options) as recognizer:
    while True:
      # Read the latest frame from the camera
      ret, frame = camera.read()
      frame = cv2.flip(frame, 1)

      letter = ""
      letterIdendify = False

      # Check if the frame was successfully read
      if not ret:
        print("Error: Could not read frame.")
        break
      
      mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame)
      try:
        data_ = recognizer.recognize_for_video(mp_image, timestamp)        

        # print(data_)
        # print(data_.gestures)

        for gesture in data_.gestures:

          # Entendendo a organização do Gesture
          # print("Gesture : "+str(gesture))
          # print("Category : "+str(gesture[0]))
          # print("Sinal em lista: "+str([category.category_name for category in gesture]))
          # print("Sinal: "+str([category.category_name for category in gesture][0]))

          response = str([category.category_name for category in gesture][0])
          if response.lower() != 'none':
            cv2.putText(frame, response, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255),thickness=3)
            letterIdendify = True
          else:
            response = "Não consegui compreender o sinal."
            letterIdendify = False

        response = str(data_.gestures)
        
        if not data_.gestures == []:
          letter = data_.gestures[0][0].category_name

      except Exception as e: 
        response = e
        print('Tipo : {}/ Valor : {}'.format(type(response),response) )
        response = "Não consegui compreender o sinal."
      
      success, buffer = cv2.imencode('.jpg', frame)
      frame = buffer.tobytes()
      frame64 = base64.b64encode(frame).decode('utf-8')

      data = json.dumps({
        'letter': letter,
        'image': frame64,
        'letterIdentify': letterIdendify
      })

      yield data + "\n"

      timestamp += 1

def home(request):
  return render(request, 'home.html')

def word(request):
  return render(request, 'word.html')

def video_feed(request):
  return StreamingHttpResponse(recognizer_frames(), content_type="application/json; boundary=frame")