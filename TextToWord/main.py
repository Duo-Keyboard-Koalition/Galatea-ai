from google.cloud import speech_v1p1beta1 as speech
import os

# Set the path to the service account key file
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "hth-2024-reel-it-back-0b3bd0b18d72.json"

def transcribe_audio(audio_file_path):
    client = speech.SpeechClient()

    with open(audio_file_path, "rb") as audio_file:
        content = audio_file.read()

    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.MP3,
        sample_rate_hertz=16000,
        language_code="en-US",
    )

    response = client.recognize(config=config, audio=audio)

    for result in response.results:
        print("Transcript: {}".format(result.alternatives[0].transcript))

# Example usage
transcribe_audio("audio/WaterDropletCafe.mp3")
