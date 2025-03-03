import os
from google import genai

def process_data_with_gemini(wordList):
    API_KEY = os.getenv("Gemini_API_KEY")
    client = genai.Client(api_key=API_KEY)

    prompt = f"""You are provided with a list of names in Hindi. Your task is to convert the list of names into English while maintaining the correct order. The format of the list should remain the same, with the names transliterated into English.
        Example:
        Input: ['अमिताभ बच्चन', 'शाहरुख़ ख़ान']
        Output: ['Amitabh Bachhan', 'Shahrukh Khan']
        Now, please transliterate the following list:
        {wordList}
        Return only the transliterated list in the same python list format, do not include any other text."""

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )

    response_text = response.text
    
    return response_text


