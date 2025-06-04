from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import json

from dotenv import load_dotenv
load_dotenv()

from app.llm.scorer import score_resume

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/rank")
async def rank(
    job_description: str = Form(...),
    weights: str = Form(...),
    weight_vs_jd: str = Form(...),
    files: List[UploadFile] = File(...)
):
    weights_dict = json.loads(weights)
    weight_vs_jd_val = float(weight_vs_jd)

    dummy_resume_texts = [
        "Co-founder of a SaaS startup. Built go-to-market and raised $500k in seed funding. Prior BD experience at Stripe.",
        "Worked in academia for 10 years. Strong ML research background. Published 15 papers, no business experience.",
        "Led engineering at Series B fintech. Built infra team, managed 15 people. MBA from Wharton."
    ]

    results = []
    for idx, resume_text in enumerate(dummy_resume_texts):
        score_output = score_resume(resume_text, job_description, weights_dict, weight_vs_jd_val)
        results.append({
            "candidate_id": f"Candidate {idx+1}",
            "resume_text": resume_text,
            "llm_score": score_output
        })

    return {"results": results}
