from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
import json
from typing import Union

from fastapi import FastAPI
app = FastAPI()
@app.get("/get_instagram_tags/{description}")
def get_instagram_tags(description):
    # Initializing the ChatGroq instance
    chat = ChatGroq(temperature=0, model_name="mixtral-8x7b-32768")

    # Defining the system and human prompts
    system = """
    You are a model that is meant to obtain a potential tag for a given description.
    The Instagram tag could be food, travel, photography, dance moves, or poses.
    Please output the data in the format:
    List of Tags in the format: 
    ```
    ["tag1", "tag2", "tag3"]
    ["tag1", "tag2", "tag3"]
    ["tag1", "tag2", "tag3"]
    ```
    """
    human = "{text}"

    # Creating the prompt template
    prompt = ChatPromptTemplate.from_messages([("system", system), ("human", human)])

    # Creating the chain
    chain = prompt | chat

    # Invoking the chain
    result = chain.invoke({"text": description}).content
    return result

@app.get("/get_hashtags")
def extract_locations(description):
    # Initializing the ChatGroq instance
    chat = ChatGroq(temperature=0, model_name="mixtral-8x7b-32768")

    # Defining the system and human prompts
    system = """
    You are a model designed to extract all locations mentioned in a given description. The locations could include city names, countries, landmarks, or any geographic references.
    ```
    [Shibuya Crossing, Meiji Shrine, Eiffel Tower, Leaning Tower of Pisa]
    [Taj Mahal, Statue of Liberty, Sydney Opera House]
    [Mount Everest, Grand Canyon, Niagara Falls]
    ```
    Please output the data as a JSON list in the format shown above, with no additional words, symbols, or unnecessary characters. The list should contain only the location names separated by commas, and formatted as a JSON array.
    """
    human = "{text}"

    # Creating the prompt template
    prompt = ChatPromptTemplate.from_messages([("system", system), ("human", human)])

    # Creating the chain
    chain = prompt | chat

    # Invoking the chain
    result = chain.invoke({"text": description}).content
    return result


@app.get("/get_addresses")
def extract_addresses(description):
    # Initializing the ChatGroq instance
    chat = ChatGroq(temperature=0, model_name="mixtral-8x7b-32768")

    # Defining the system and human prompts
    system = """
    You are a model designed to extract complete addresses mentioned in a given description. These addresses can include street numbers, street names, cities, provinces/states, countries, and postal codes.

    Return Format:
    Only return addresses in the format: street number, street name, city, province/state, country, postal code. If any component is missing, ignore it entirely, as the output is used for geo-tagging purposes.

    Example outputs:
    ```
    University of Ottawa, Ottawa, ON, Canada
    809 Dundas St W, Toronto, ON, Canada
    ```
    Keep it concise and return only valid, complete addresses. No backspaces or extra characters are allowed.
    """
    human = "{text}"

    # Creating the prompt template
    prompt = ChatPromptTemplate.from_messages([("system", system), ("human", human)])

    # Creating the chain
    chain = prompt | chat

    # Invoking the chain
    result = chain.invoke({"text": description}).content
    return result