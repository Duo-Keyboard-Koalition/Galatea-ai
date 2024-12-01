from fastapi import FastAPI
import os
import random
import replicate
from groq import Groq
import uvicorn
from dotenv import load_dotenv

load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Initialize client
replicate.client.Client(api_token=os.environ.get("REPLICATE_API_TOKEN"))
groq_api_key = os.environ.get("GROQ_API_KEY")
groq_client = Groq(api_key=groq_api_key)

# Traits for image generation
traits = {
    "nationality": ["Indian", "Caucasian", "Asian", "African", "Latino", "Middle Eastern"],
    "clothing": ["casual", "sporty", "formal", "traditional", "summer wear", "winter coat"],
    "activity": ["standing", "walking", "jogging", "dancing", "posing"],
    "setting": [
        "on a sandy beach", 
        "next to the shoreline of a modern city", 
        "in a dense forest", 
        "on a mountain trail", 
        "in a futuristic cityscape"
    ],
    "weather": ["on a sunny day", "during sunset", "on a cloudy afternoon", "on a snowy evening"],
    "accessory": ["holding a cup of coffee", "carrying a backpack", "with sunglasses on", "wearing a hat", ""]
}

# Function to generate a random prompt
def generate_random_prompt(traits):
    prompt = []
    for category, options in traits.items():
        prompt.append(random.choice(options))
    return f"{prompt[0]} female in {prompt[1]} clothing {prompt[2]} {prompt[3]} {prompt[4]}, {prompt[5]} for a tinder profile."

# Function to generate a name and Tinder-like profile using Groq
def generate_name_and_profile_with_groq(prompt):
    profile_prompt = (
        f"""To create a Tinder-style profile for a female character based on the description {prompt}. 
        Include a name and 3-5 hobbies or interests as 1-2 sentences for the bio. No other text or reply needs to be generated nothing else is needed. Just have Name: [Name] and Bio: [Bio]"""
    )
    try:
        # Groq API request
        response = groq_client.chat.completions.create(
            messages=[
                {"role": "user", "content": profile_prompt}
            ],
            model="llama3-8b-8192",  # Example Groq model, adjust as needed
        )
        # Extract generated content
        content = response.choices[0].message.content.strip()
        return content
    except Exception as e:
        return {"error": f"Failed to generate profile: {str(e)}"}

# FastAPI endpoint to generate image and profile
@app.post("/generate-profile-image")
async def generate_profile_image():
    # Generate random prompt
    prompt = generate_random_prompt(traits)

    # Generate image using Replicate
    try:
        deployment = replicate.deployments.get("codejedi-ai/mekkana-curly-hair-suductive")
        prediction = deployment.predictions.create(input={"prompt": prompt})
        prediction.wait()
        image_url = prediction.output
        # image_url = "https://something.com/image.jpg"
    except Exception as e:
        return {"error": f"Failed to generate image: {str(e)}"}

    # Generate profile using Groq
    profile = generate_name_and_profile_with_groq(prompt)

    return {
        "prompt": prompt,
        "image_url": image_url,
        "profile": profile
    }

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the Profile Image Generator API powered by Replicate and Groq!"}


if __name__ == "__main__":
    uvicorn.run(app, port=6000)