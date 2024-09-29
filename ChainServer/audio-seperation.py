from moviepy.editor import VideoFileClip

# Load the video file
video = VideoFileClip("videos/WaterDropletCafe.mp4")

# Extract the audio
audio = video.audio

# Save the audio to a file
audio.write_audiofile("audio/WaterDropletCafe.mp3")