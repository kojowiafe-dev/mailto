
from fastapi import APIRouter, HTTPException, status, Depends
from typing import Optional
import schemas, database, models
from sqlmodel import Session, select, desc

router = APIRouter(
    tags=["GetStarted"],
    prefix="/get-started"
)



@router.post("/", status_code=status.HTTP_201_CREATED)
async def submit_get_started(request: schemas.GetStartedForm, session: Session = Depends(database.get_session)):
    features_str = ",".join(request.features) if request.features else ""
    submission = models.GetStartedSubmission(
        companyName=request.companyName,
        fullName=request.fullName,
        email=request.email,
        phone=request.phone,
        industry=request.industry,
        companySize=request.companySize,
        projectType=request.projectType,
        budget=request.budget,
        timeline=request.timeline,
        description=request.description,
        features=features_str,
        agreeToTerms=request.agreeToTerms,
        # user_id=user_id
    )
    session.add(submission)
    session.commit()
    session.refresh(submission)
    return {"message": "Form received successfully", "submission_id": submission.id}



@router.get("/", response_model=schemas.GetStartedRequest, status_code=status.HTTP_200_OK)
async def retrieve_get_started(session: database.SessionLocal):
    forms = session.exec(select(models.GetStartedSubmission)).all()
    return forms


@router.post("/link-to-user", status_code=status.HTTP_200_OK)
async def link_submission_to_user(email: str, user_id: int, session: Session = Depends(database.get_session)):
    statement = select(models.GetStartedSubmission).where(
        models.GetStartedSubmission.email == email,
        models.GetStartedSubmission.user_id == None
    ).order_by(desc(models.GetStartedSubmission.created_at))
    submission = session.exec(statement).first()
    if not submission:
        raise HTTPException(status_code=404, detail="No submission found to link.")
    submission.user_id = user_id
    session.add(submission)
    session.commit()
    return {"message": "Submission linked to user", "submission_id": submission.id}
