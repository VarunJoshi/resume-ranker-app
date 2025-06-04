from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def score_resume(resume_text, job_description, weights, weight_vs_jd_val):
    prompt = f"""
    You're an AI assistant evaluating resumes.

    Job Description:
    {job_description}

    Resume:
    {resume_text}

    Custom Weighted Criteria (JSON format): 
    {weights}

    Weigh custom criteria vs job description as: {weight_vs_jd_val}%

    Return a JSON object like:
    {{
      "score": <number>,
      "feedback": "<short summary>"
    }}
    """

    response = client.chat.completions.create(
        model="gpt-4.1",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
    )

    return response.choices[0].message.content
